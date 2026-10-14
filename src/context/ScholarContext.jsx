import React, { createContext, useContext, useState, useMemo } from 'react';
import { initialStudentProfile, initialDocuments, mockScholarships } from '../data/mockData';

const ScholarContext = createContext();

export function ScholarProvider({ children }) {
  const [profile, setProfile] = useState(initialStudentProfile);
  const [documents, setDocuments] = useState(initialDocuments);
  const [activePage, setActivePage] = useState('home'); // 'home' | 'profile' | 'documents' | 'scholarships' | 'match-analysis' | 'assistant'
  const [selectedScholarshipId, setSelectedScholarshipId] = useState('sch-reliance-ug');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('All');
  const [selectedStateFilter, setSelectedStateFilter] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState(['sch-reliance-ug', 'sch-tata-trusts']);
  const [toastMessage, setToastMessage] = useState(null);

  const [isPageLoading, setIsPageLoading] = useState(false);

  // Helper to show transient notification toast
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  // Smooth page transition navigation
  const navigateToPage = (newPage) => {
    if (newPage === activePage) return;
    setIsPageLoading(true);
    setTimeout(() => {
      setActivePage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setIsPageLoading(false);
      }, 150);
    }, 200);
  };

  // Update Profile
  const updateProfile = (section, field, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    showToast(`Updated ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} in your profile.`);
  };

  // Document Vault actions
  const uploadDocument = (docId, fileData) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            status: 'Added',
            fileName: fileData.name || `${doc.name.replace(/\s+/g, '_')}_Uploaded.pdf`,
            fileSize: fileData.size ? `${(fileData.size / (1024 * 1024)).toFixed(1)} MB` : '1.2 MB',
            uploadedDate: 'Just now',
            verified: true,
            verificationAgency: 'DigiLocker / Instant AI Verification',
          };
        }
        return doc;
      })
    );
    showToast(`Uploaded ${documents.find((d) => d.id === docId)?.name} to your Vault!`);
  };

  const removeDocument = (docId) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            status: 'Missing',
            fileName: null,
            fileSize: null,
            uploadedDate: null,
            verified: false,
            verificationAgency: null,
          };
        }
        return doc;
      })
    );
    showToast(`Removed document from Vault.`);
  };

  // Profile Completeness calculation
  const profileCompleteness = useMemo(() => {
    let score = 0;
    const totalWeights = 100;

    // Personal (30%)
    if (profile.personal.fullName) score += 5;
    if (profile.personal.email) score += 5;
    if (profile.personal.phone) score += 5;
    if (profile.personal.category) score += 5;
    if (profile.personal.state) score += 5;
    if (profile.personal.gender) score += 5;

    // Academic (35%)
    if (profile.academic.currentCourse) score += 10;
    if (profile.academic.yearOfStudy) score += 5;
    if (profile.academic.institution) score += 5;
    if (profile.academic.academicScore) score += 10;
    if (profile.academic.class12Score) score += 5;

    // Vault Documents (35%)
    const addedDocs = documents.filter((d) => d.status === 'Added').length;
    const docPercent = (addedDocs / documents.length) * 35;
    score += Math.round(docPercent);

    return Math.min(score, 100);
  }, [profile, documents]);

  // Recalculate match criteria dynamically based on profile and documents
  const scholarships = useMemo(() => {
    return mockScholarships.map((sch) => {
      // Dynamic criteria evaluation
      const updatedBreakdown = sch.criteriaBreakdown.map((item) => {
        let isMet = item.isMet;
        let reason = item.reason;
        let userVal = item.userValue;

        // Dynamic checks
        if (item.criterion.includes('Score') || item.criterion.includes('Merit')) {
          const userScore = Number(profile.academic.academicScore) || 87;
          userVal = `${userScore}%`;
          if (sch.minScore && userScore < sch.minScore) {
            isMet = false;
            reason = `Your academic score is ${userScore}%, which is below the minimum required ${sch.minScore}%.`;
          } else {
            isMet = true;
            reason = `Your score of ${userScore}% satisfies the required minimum of ${sch.minScore || 60}%.`;
          }
        }

        if (item.criterion.includes('Income')) {
          const userIncome = Number(profile.preferences.familyAnnualIncome) || 240000;
          userVal = `₹${(userIncome / 100000).toFixed(1)} Lakhs / year`;
          if (sch.incomeLimit && userIncome > sch.incomeLimit) {
            isMet = false;
            reason = `Your family income is ₹${(userIncome / 100000).toFixed(1)}L, exceeding the threshold of ₹${(sch.incomeLimit / 100000).toFixed(1)}L.`;
          } else {
            isMet = true;
            reason = `Your family income is within the required ceiling of ₹${(sch.incomeLimit / 100000).toFixed(1)}L.`;
          }
        }

        if (item.criterion.includes('State') || item.criterion.includes('Domicile')) {
          userVal = profile.personal.state;
          const isNational = sch.applicableStates.some((s) => s.includes('All States'));
          const stateMatches = isNational || sch.applicableStates.includes(profile.personal.state);
          if (!stateMatches) {
            isMet = false;
            reason = `Your state is ${profile.personal.state}. This scholarship requires domicile in: ${sch.applicableStates.join(', ')}.`;
          } else {
            isMet = true;
            reason = `Your state of residence (${profile.personal.state}) is eligible.`;
          }
        }

        if (item.criterion.includes('Gender')) {
          userVal = profile.personal.gender;
          if (sch.eligibleGender !== 'All' && sch.eligibleGender !== profile.personal.gender) {
            isMet = false;
            reason = `This scholarship is designated for ${sch.eligibleGender} applicants; your profile is ${profile.personal.gender}.`;
          } else {
            isMet = true;
            reason = `Gender requirement (${sch.eligibleGender}) met.`;
          }
        }

        if (item.criterion.includes('Document') || item.criterion.includes('Vault')) {
          const missingRequired = sch.requiredDocuments.filter((reqDocName) => {
            const found = documents.find((d) => d.name.toLowerCase() === reqDocName.toLowerCase());
            return !found || found.status !== 'Added';
          });

          if (missingRequired.length > 0) {
            isMet = false;
            userVal = `${missingRequired.length} document(s) missing`;
            reason = `Missing in Vault: ${missingRequired.join(', ')}. Upload to make application ready.`;
          } else {
            isMet = true;
            userVal = `All ${sch.requiredDocuments.length} required documents in Vault`;
            reason = `All ${sch.requiredDocuments.length} required documents are verified in your Vault.`;
          }
        }

        return {
          ...item,
          userValue: userVal,
          isMet,
          reason,
        };
      });

      const metCount = updatedBreakdown.filter((c) => c.isMet).length;
      const totalCount = updatedBreakdown.length;
      const dynamicMatchScore = Math.round((metCount / totalCount) * 100);

      return {
        ...sch,
        criteriaBreakdown: updatedBreakdown,
        matchScore: dynamicMatchScore,
        metCount,
        totalCount,
      };
    });
  }, [profile, documents]);

  // Selected scholarship object
  const selectedScholarship = useMemo(() => {
    return (
      scholarships.find((s) => s.id === selectedScholarshipId) ||
      scholarships[0]
    );
  }, [scholarships, selectedScholarshipId]);

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const value = {
    profile,
    updateProfile,
    documents,
    uploadDocument,
    removeDocument,
    scholarships,
    activePage,
    setActivePage,
    selectedScholarshipId,
    setSelectedScholarshipId,
    selectedScholarship,
    profileCompleteness,
    searchQuery,
    setSearchQuery,
    selectedTypeFilter,
    setSelectedTypeFilter,
    selectedStateFilter,
    setSelectedStateFilter,
    bookmarkedIds,
    toggleBookmark,
    toastMessage,
    showToast,
    isPageLoading,
    navigateToPage,
  };

  return <ScholarContext.Provider value={value}>{children}</ScholarContext.Provider>;
}

export function useScholar() {
  const context = useContext(ScholarContext);
  if (!context) {
    throw new Error('useScholar must be used within a ScholarProvider');
  }
  return context;
}
