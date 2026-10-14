import React from 'react';
import { useScholar } from '../context/ScholarContext';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Building2, 
  Calendar, 
  IndianRupee, 
  FolderLock, 
  UserCheck, 
  ArrowRight, 
  Check, 
  X, 
  ShieldCheck, 
  ChevronRight,
  HelpCircle,
  FileText
} from 'lucide-react';

export default function SmartMatchAnalysisPage() {
  const { 
    scholarships, 
    selectedScholarshipId, 
    setSelectedScholarshipId, 
    selectedScholarship, 
    navigateToPage,
    profile,
    documents,
    showToast
  } = useScholar();

  // Scholarships sorted best first (highest matchScore first)
  const sortedScholarships = [...scholarships].sort((a, b) => b.matchScore - a.matchScore);

  const getMatchScoreBadge = (score) => {
    if (score >= 80) {
      return {
        bg: 'bg-emerald-50 text-[#16A34A] border-emerald-200',
        barBg: 'bg-[#16A34A]',
        label: 'Strong Match • Eligible',
      };
    } else if (score >= 60) {
      return {
        bg: 'bg-amber-50 text-[#D97706] border-amber-200',
        barBg: 'bg-[#D97706]',
        label: 'Partial Match • Minor Gaps',
      };
    } else {
      return {
        bg: 'bg-rose-50 text-[#EF4444] border-rose-200',
        barBg: 'bg-[#EF4444]',
        label: 'Ineligible • Clear Reasons',
      };
    }
  };

  const badgeMeta = getMatchScoreBadge(selectedScholarship.matchScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#0D9488] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              AI Smart Match Engine
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Transparent, Criterion-by-Criterion Verification
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">
            Smart Match Analysis
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Every scholarship evaluated against your profile. We explain precisely why each criterion passes or fails in simple, friendly language.
          </p>
        </div>

        {/* Quick Nav Button */}
        <button
          onClick={() => navigateToPage('scholarships')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#1E293B] border border-slate-300 font-semibold text-xs shadow-xs transition-all cursor-pointer self-start md:self-auto"
        >
          <span>← Back to All Scholarships</span>
        </button>
      </div>

      {/* Main Grid: Left Selector List (Sorted Best First) + Right Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Sorted Best First Scholarship List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Scholarships (Sorted Best First)
            </h2>
            <span className="text-[11px] font-semibold text-slate-400">
              {sortedScholarships.length} Evaluated
            </span>
          </div>

          <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1">
            {sortedScholarships.map((sch) => {
              const isSelected = sch.id === selectedScholarship.id;
              const schMeta = getMatchScoreBadge(sch.matchScore);

              return (
                <div
                  key={sch.id}
                  onClick={() => setSelectedScholarshipId(sch.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none text-left ${
                    isSelected
                      ? 'bg-[#EFF6FF] border-[#2563EB] shadow-xs ring-1 ring-[#2563EB]'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                      {sch.type}
                    </span>
                    <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full border ${schMeta.bg}`}>
                      {sch.matchScore}% Match
                    </span>
                  </div>

                  <h3 className={`text-xs font-bold leading-snug line-clamp-2 ${
                    isSelected ? 'text-[#2563EB]' : 'text-[#1E293B]'
                  }`}>
                    {sch.name}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                    <span className="font-semibold text-slate-700">{sch.amountRange}</span>
                    <span className="text-slate-400">{sch.criteriaBreakdown.filter(c => c.isMet).length}/{sch.criteriaBreakdown.length} criteria met</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-Depth Smart Match Analysis for Selected Scholarship (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Scholarship Card Banner */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
            
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
                    {selectedScholarship.type}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {selectedScholarship.organization}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] tracking-tight">
                  {selectedScholarship.name}
                </h2>
                <p className="text-xs text-slate-600 max-w-xl">
                  {selectedScholarship.description}
                </p>
              </div>

              {/* Big Match Score Gauge Pill */}
              <div className="text-right shrink-0">
                <div className={`p-4 rounded-2xl border text-center ${badgeMeta.bg}`}>
                  <div className="text-3xl font-black tracking-tight">
                    {selectedScholarship.matchScore}%
                  </div>
                  <div className="text-[11px] font-bold mt-0.5">
                    Match Score
                  </div>
                  <div className="text-[10px] opacity-80 mt-1">
                    {selectedScholarship.metCount} of {selectedScholarship.totalCount} Met
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Financial & Deadline Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium block">Award Amount</span>
                <span className="font-extrabold text-[#1E293B] text-sm mt-0.5 block">
                  {selectedScholarship.amountRange}
                </span>
                <span className="text-[10px] text-slate-400 truncate block mt-0.5">
                  {selectedScholarship.amountDetails}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium block">Application Deadline</span>
                <span className="font-extrabold text-[#1E293B] text-sm mt-0.5 block">
                  {selectedScholarship.deadlineFormatted}
                </span>
                <span className={`text-[10px] font-bold mt-0.5 block ${
                  selectedScholarship.deadlineDays <= 20 ? 'text-[#EF4444]' : 'text-[#2563EB]'
                }`}>
                  {selectedScholarship.deadlineDays} days remaining
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium block">Application Readiness</span>
                <span className="font-extrabold text-[#16A34A] text-sm mt-0.5 block">
                  {selectedScholarship.matchScore >= 80 ? 'Ready to Apply' : 'Prerequisites Missing'}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Auto-fill available from Vault
                </span>
              </div>
            </div>

          </div>

          {/* Criterion-by-Criterion Eligibility Breakdown Section */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
                  <span>Criterion-by-Criterion Eligibility Breakdown</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified using your profile credentials: Aarav Sharma ({profile.personal.state}, {profile.academic.currentCourse.split(' ')[0]})
                </p>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                {selectedScholarship.metCount} / {selectedScholarship.totalCount} Criteria Satisfied
              </span>
            </div>

            {/* List of Criteria */}
            <div className="space-y-3 pt-2">
              {selectedScholarship.criteriaBreakdown.map((item, idx) => {
                const isMet = item.isMet;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      isMet
                        ? 'bg-emerald-50/30 border-emerald-200'
                        : 'bg-rose-50/30 border-rose-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      
                      {/* Left: Icon + Title + Plain-Language Reason */}
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isMet 
                            ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]' 
                            : 'bg-[#FEE2E2] text-[#EF4444] border border-[#FCA5A5]'
                        }`}>
                          {isMet ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : (
                            <X className="w-4 h-4 stroke-[3]" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-[#1E293B]">
                              {item.criterion}
                            </h4>
                            <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                              isMet ? 'bg-emerald-100 text-[#16A34A]' : 'bg-rose-100 text-[#EF4444]'
                            }`}>
                              {isMet ? 'Eligible' : 'Not Met'}
                            </span>
                          </div>

                          {/* Plain-Language Reason */}
                          <p className={`text-xs mt-1.5 font-medium leading-relaxed ${
                            isMet ? 'text-emerald-900' : 'text-rose-900'
                          }`}>
                            {item.reason}
                          </p>
                        </div>
                      </div>

                      {/* Right: Required vs Your Profile side-by-side pill */}
                      <div className="sm:text-right shrink-0 bg-white p-2.5 rounded-xl border border-slate-200 text-xs space-y-1">
                        <div>
                          <span className="text-slate-400 text-[10px] block">Scholarship Requirement:</span>
                          <span className="font-semibold text-slate-700">{item.required}</span>
                        </div>
                        <div className="pt-1 border-t border-slate-100">
                          <span className="text-slate-400 text-[10px] block">Your Profile:</span>
                          <span className={`font-bold ${isMet ? 'text-[#16A34A]' : 'text-[#EF4444]'}`}>
                            {item.userValue}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Recommendations Based on Match */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              {selectedScholarship.matchScore >= 80 ? (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-xs text-blue-900">
                    <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0" />
                    <span>
                      <strong>High Eligibility Confirmed!</strong> Your profile and documents fulfill all requirements.
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      showToast('Proceeding to 1-Click Vault Pre-fill...');
                      navigateToPage('apply');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span>Apply with 1-Click Vault Pre-fill</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-xs text-amber-900">
                    <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />
                    <div>
                      <strong>Criteria Gaps Identified:</strong> This scholarship has specific mismatches. Rejection is never a dead end!
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateToPage('profile')}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold cursor-pointer"
                    >
                      Update Profile
                    </button>
                    <button
                      onClick={() => {
                        showToast('Showing personalized alternative scholarships...');
                        navigateToPage('alternatives');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <span>Show Better-Fit Alternatives</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
