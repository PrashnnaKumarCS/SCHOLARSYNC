import React, { useState } from 'react';
import { useScholar } from '../context/ScholarContext';
import { 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  FolderLock, 
  ShieldCheck, 
  Download, 
  Building2, 
  Calendar, 
  IndianRupee, 
  ArrowRight,
  ExternalLink,
  Printer,
  Check,
  Clock,
  UserCheck
} from 'lucide-react';

export default function SmartApplyPage() {
  const { 
    selectedScholarship, 
    profile, 
    documents, 
    navigateToPage, 
    showToast 
  } = useScholar();

  const [declarationAgreed, setDeclarationAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState(null);

  const vaultDocs = documents.filter((d) => d.status === 'Added');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!declarationAgreed) {
      showToast("Please agree to the applicant declaration before submitting.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const appRef = `SCH-${selectedScholarship.type.slice(0, 3).toUpperCase()}-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedApplication({
        referenceId: appRef,
        scholarshipName: selectedScholarship.name,
        organization: selectedScholarship.organization,
        amount: selectedScholarship.amountRange,
        submittedAt: "14 Oct 2026, 09:30 AM",
        applicantName: profile.personal.fullName,
        applicantEmail: profile.personal.email,
        documentsAttached: vaultDocs.length,
      });
      setIsSubmitting(false);
      showToast("Application submitted successfully with 1-Click Vault Pre-fill!");
    }, 1200);
  };

  if (submittedApplication) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in zoom-in-95 duration-200">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-md text-center space-y-6">
          
          <div className="w-16 h-16 mx-auto rounded-3xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center border border-[#86EFAC]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Application Successfully Submitted
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
              Congratulations, {profile.personal.fullName.split(' ')[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Your application for <strong>{submittedApplication.scholarshipName}</strong> has been transmitted via ScholarSync Auto Pre-fill.
            </p>
          </div>

          {/* Reference Receipt Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Application Reference Number:</span>
              <span className="text-sm font-black text-[#2563EB] tracking-wide font-mono">
                {submittedApplication.referenceId}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block">Organization:</span>
                <span className="font-semibold text-slate-700">{submittedApplication.organization}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Grant Amount:</span>
                <span className="font-bold text-[#1E293B]">{submittedApplication.amount}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Submitted Timestamp:</span>
                <span className="font-semibold text-slate-700">{submittedApplication.submittedAt}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Vault Documents Attached:</span>
                <span className="font-semibold text-[#0D9488]">{submittedApplication.documentsAttached} Verified Certificates</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => showToast(`Downloaded Application Receipt ${submittedApplication.referenceId}.pdf`)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Signed Application Receipt (PDF)</span>
            </button>

            <button
              onClick={() => {
                setSubmittedApplication(null);
                navigateToPage('scholarships');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs cursor-pointer transition-colors"
            >
              Back to Scholarships
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
              Feature 8 • Smart Application Pre-fill
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Zero Manual Re-entry
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">
            1-Click Smart Application
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Review and submit. All personal credentials, academic transcripts, and official vault documents are already populated automatically.
          </p>
        </div>

        <button
          onClick={() => navigateToPage('readiness')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#1E293B] border border-slate-300 font-semibold text-xs shadow-xs transition-all cursor-pointer self-start md:self-auto"
        >
          <span>← Back to Readiness</span>
        </button>
      </div>

      {/* Target Scholarship Banner */}
      <div className="mb-6 p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#2563EB]">
              {selectedScholarship.type}
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              {selectedScholarship.organization}
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#1E293B]">
            {selectedScholarship.name}
          </h2>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
            <span><strong>Grant:</strong> {selectedScholarship.amountRange}</span>
            <span>•</span>
            <span><strong>Deadline:</strong> {selectedScholarship.deadlineFormatted} ({selectedScholarship.deadlineDays}d left)</span>
            <span>•</span>
            <span className="text-[#16A34A] font-bold">Application Fee: ₹0 (Free)</span>
          </div>
        </div>

        <div className="shrink-0">
          <span className="text-xs font-bold px-3 py-1.5 rounded-2xl bg-emerald-50 text-[#16A34A] border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Vault Sync Active</span>
          </span>
        </div>
      </div>

      {/* Pre-fill Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Pre-filled Personal Details */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#2563EB]" />
              <h3 className="text-base font-bold text-[#1E293B]">
                1. Personal Details (Auto-filled from Profile)
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-[#16A34A] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ✓ Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Full Applicant Name:</span>
              <span className="font-bold text-[#1E293B]">{profile.personal.fullName}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Email Address:</span>
              <span className="font-bold text-[#1E293B]">{profile.personal.email}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Aadhaar-Linked Phone:</span>
              <span className="font-bold text-[#1E293B]">{profile.personal.phone}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Social Category:</span>
              <span className="font-bold text-[#1E293B]">{profile.personal.category}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Permanent Domicile State:</span>
              <span className="font-bold text-[#1E293B]">{profile.personal.state}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Gender:</span>
              <span className="font-bold text-[#1E293B]">{profile.personal.gender}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Pre-filled Academic & Income Details */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#2563EB]" />
              <h3 className="text-base font-bold text-[#1E293B]">
                2. Academic & Means Details (Auto-filled from Profile)
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-[#16A34A] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ✓ Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Course / Degree Enrolled:</span>
              <span className="font-bold text-[#1E293B]">{profile.academic.currentCourse}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Current Year of Study:</span>
              <span className="font-bold text-[#1E293B]">{profile.academic.yearOfStudy}</span>
            </div>

            <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">College / Institution:</span>
              <span className="font-bold text-[#1E293B]">{profile.academic.institution}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Current Academic Score:</span>
              <span className="font-bold text-[#2563EB] text-sm">{profile.academic.academicScore}% (CGPA 8.7)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Class 12th Board Score:</span>
              <span className="font-bold text-[#1E293B]">{profile.academic.class12Score}%</span>
            </div>

            <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Verified Gross Annual Family Income:</span>
              <span className="font-bold text-[#1E293B]">₹{(profile.preferences.familyAnnualIncome / 100000).toFixed(2)} Lakhs / year</span>
            </div>
          </div>
        </div>

        {/* Section 3: Vault Attached Documents */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FolderLock className="w-5 h-5 text-[#0D9488]" />
              <h3 className="text-base font-bold text-[#1E293B]">
                3. Attached Documents from Document Vault
              </h3>
            </div>
            <span className="text-xs font-bold text-[#0D9488]">
              {vaultDocs.length} Documents Attached
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {vaultDocs.map((doc) => (
              <div 
                key={doc.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#16A34A] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-[#1E293B] block truncate">{doc.name}</span>
                    <span className="text-[11px] text-slate-500 truncate block">{doc.fileName}</span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-[#0D9488] bg-teal-50 px-2 py-0.5 rounded border border-teal-200 shrink-0">
                  {doc.fileSize}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 italic">
            * Automatically hashed and attached via DigiLocker secure transfer tokens.
          </p>
        </div>

        {/* Section 4: Bank & DBT Seeding Details */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
            <span>4. Direct Benefit Transfer (DBT) Bank Seeding</span>
          </h3>

          <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Bank Name & Branch:</span>
              <strong className="text-slate-800 text-sm">State Bank of India (SBI) - Pune University Branch</strong>
              <div className="flex items-center gap-3 mt-1 text-slate-600">
                <span>A/C: •••• •••• 4821</span>
                <span>•</span>
                <span>IFSC: SBIN0001842</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#16A34A] bg-emerald-100/70 px-2.5 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" />
                <span>NPCI Aadhaar Seeded</span>
              </span>
            </div>
          </div>
        </div>

        {/* Section 5: Declaration Checkbox & Submit */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={declarationAgreed}
              onChange={(e) => setDeclarationAgreed(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <span className="text-xs text-slate-600 leading-relaxed">
              I hereby declare that all the information auto-filled from my ScholarSync profile and uploaded vault documents is true, correct, and verified. I authorize the scholarship provider to electronically access these documents for grant evaluation.
            </span>
          </label>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>Free submission • Instant application receipt generation</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting Application Data...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Submit 1-Click Application</span>
                </>
              )}
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
