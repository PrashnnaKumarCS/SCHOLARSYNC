import React, { useState } from 'react';
import { useScholar } from '../context/ScholarContext';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  FolderLock, 
  FileText, 
  Upload, 
  ShieldCheck, 
  Bot, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function ApplicationReadinessPage() {
  const { 
    scholarships, 
    selectedScholarshipId, 
    setSelectedScholarshipId, 
    selectedScholarship, 
    documents, 
    uploadDocument,
    navigateToPage, 
    profile, 
    showToast 
  } = useScholar();

  const [activeUploadDocId, setActiveUploadDocId] = useState(null);

  // Compute readiness metrics for selected scholarship
  const requiredDocs = selectedScholarship.requiredDocuments || ["Marksheet", "ID Proof", "Income Certificate", "College Certificate"];
  
  const checklistItems = [
    {
      id: "chk-profile",
      title: "Student Profile Credentials",
      subtitle: `${profile.personal.fullName} • ${profile.academic.currentCourse} (${profile.academic.yearOfStudy})`,
      isReady: true,
      category: "Profile",
    },
    {
      id: "chk-score",
      title: `Academic Score Benchmark (Min ${selectedScholarship.minScore || 60}%)`,
      subtitle: `Your verified score: ${profile.academic.academicScore}% (${profile.academic.scoreType})`,
      isReady: profile.academic.academicScore >= (selectedScholarship.minScore || 60),
      category: "Academic",
    },
    {
      id: "chk-income",
      title: `Family Annual Income Verification`,
      subtitle: `Your reported income: ₹${(profile.preferences.familyAnnualIncome / 100000).toFixed(1)}L (Ceiling: ₹${(selectedScholarship.incomeLimit / 100000).toFixed(1)}L)`,
      isReady: profile.preferences.familyAnnualIncome <= selectedScholarship.incomeLimit,
      category: "Financial",
    },
    ...requiredDocs.map((docName) => {
      const vaultDoc = documents.find((d) => d.name.toLowerCase() === docName.toLowerCase());
      const isAdded = vaultDoc && vaultDoc.status === "Added";
      return {
        id: `chk-doc-${docName.toLowerCase().replace(/\s+/g, '-')}`,
        title: `${docName} from Document Vault`,
        subtitle: isAdded 
          ? `Attached: ${vaultDoc.fileName} (${vaultDoc.verificationAgency || 'DigiLocker Verified'})`
          : `Missing in Vault: Required for final submission`,
        isReady: isAdded,
        category: "Vault Document",
        docId: vaultDoc?.id,
        docName,
      };
    })
  ];

  const readyCount = checklistItems.filter((item) => item.isReady).length;
  const totalCount = checklistItems.length;
  const readinessPercent = Math.round((readyCount / totalCount) * 100);

  // Find the most urgent missing item for "Next Best Action"
  const missingItems = checklistItems.filter((item) => !item.isReady);
  const nextBestActionItem = missingItems[0] || null;

  const handleInstantUpload = (docId) => {
    uploadDocument(docId, { name: "Community_Caste_Certificate_Verified.pdf", size: 1024 * 1024 * 1.1 });
    showToast("Document attached! Application readiness updated to 100%.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
              Feature 6 • Pre-Submission Audit
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Zero Incomplete Submissions
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">
            Application Readiness
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Audit your readiness score before submitting. We cross-verify all required documents, academic records, and eligibility parameters to ensure your application is 100% complete.
          </p>
        </div>

        {/* Scholarship Switcher Dropdown */}
        <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-2xs self-start md:self-auto">
          <span className="text-xs text-slate-500 font-medium">Auditing:</span>
          <select
            value={selectedScholarshipId}
            onChange={(e) => setSelectedScholarshipId(e.target.value)}
            className="text-xs font-bold text-[#1E293B] bg-transparent outline-none cursor-pointer max-w-[220px] truncate"
          >
            {scholarships.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Top Readiness Score Card */}
      <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-black text-2xl border border-[#BFDBFE]">
                {readinessPercent}%
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1E293B] flex items-center gap-2">
                  <span>Application Readiness: {readyCount} of {totalCount} Requirements Met</span>
                  {readinessPercent === 100 ? (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200">
                      100% Ready to Submit
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-[#D97706] border border-amber-200">
                      {missingItems.length} Action Item Pending
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500">
                  Target Scholarship: <strong className="text-slate-800">{selectedScholarship.name}</strong> ({selectedScholarship.organization})
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Deadline</span>
              <span className="text-xs font-bold text-[#1E293B]">{selectedScholarship.deadlineFormatted}</span>
              <span className="text-[10px] font-bold text-[#2563EB] block">{selectedScholarship.deadlineDays} days left</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Grant Value</span>
              <span className="text-xs font-bold text-[#1E293B]">{selectedScholarship.amountRange}</span>
              <span className="text-[10px] text-slate-500 block">Direct DBT</span>
            </div>
          </div>

        </div>

        {/* Progress Bar */}
        <div className="mt-6 w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
          <div 
            className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-[#2563EB] to-[#16A34A]"
            style={{ width: `${readinessPercent}%` }}
          />
        </div>
      </div>

      {/* "Next Best Action" Highlight Card */}
      {nextBestActionItem ? (
        <div className="mb-8 p-6 rounded-3xl bg-amber-50/60 border border-amber-200/80 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706] bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                    ★ Next Best Action Recommended
                  </span>
                  <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedScholarship.deadlineDays} Days Left Until Deadline</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1E293B]">
                  Upload your {nextBestActionItem.docName || nextBestActionItem.title} to reach 100% Readiness
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {nextBestActionItem.subtitle}. Uploading this document now guarantees your application will pass the automated gatekeeper without manual rejection.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {nextBestActionItem.docId && (
                <button
                  onClick={() => handleInstantUpload(nextBestActionItem.docId)}
                  className="px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Simulate Instant Upload</span>
                </button>
              )}

              <button
                onClick={() => navigateToPage('assistant')}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Bot className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Ask AI: How to Get This Document</span>
              </button>
            </div>

          </div>
        </div>
      ) : (
        <div className="mb-8 p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E293B]">
                All Application Prerequisites Complete!
              </h3>
              <p className="text-xs text-slate-600">
                You have fulfilled 100% of the checklist items. Proceed to 1-Click Vault Pre-fill to review and submit.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateToPage('apply')}
            className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs shadow-xs flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <span>Launch Smart Pre-fill Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Complete Checklist: Ready vs Missing Items */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-[#1E293B]">
              Application Requirements Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Verified across your ScholarSync Profile and Document Vault
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-[#16A34A] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{readyCount} Ready</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-[#EF4444] font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>{missingItems.length} Missing</span>
            </span>
          </div>
        </div>

        {/* List of items */}
        <div className="divide-y divide-slate-100">
          {checklistItems.map((item) => (
            <div
              key={item.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  item.isReady 
                    ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]' 
                    : 'bg-[#FEE2E2] text-[#EF4444] border border-[#FCA5A5]'
                }`}>
                  {item.isReady ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#1E293B]">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-50 text-slate-500 border border-slate-200">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center pl-10 sm:pl-0">
                {item.isReady ? (
                  <span className="text-xs font-bold text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    ✓ Verified Ready
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      if (item.docId) {
                        handleInstantUpload(item.docId);
                      } else {
                        navigateToPage('profile');
                      }
                    }}
                    className="text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 px-3 py-1 rounded-full shadow-2xs transition-colors cursor-pointer"
                  >
                    Fix Gap Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to Apply */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
            <span>Vault encryption keeps your credentials tamper-proof for institutional submission.</span>
          </div>

          <button
            onClick={() => navigateToPage('apply')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Proceed to 1-Click Vault Pre-fill</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
