import React, { useState } from 'react';
import { useScholar } from '../context/ScholarContext';
import { 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  ChevronRight,
  HelpCircle,
  IndianRupee,
  Calendar,
  Compass
} from 'lucide-react';

export default function AlternativesPage() {
  const { 
    scholarships, 
    selectedScholarshipId, 
    setSelectedScholarshipId, 
    navigateToPage, 
    profile, 
    showToast 
  } = useScholar();

  // Find ineligible or low-match scholarships (< 75% match) to demonstrate rejection pivot
  const ineligibleScholarships = scholarships.filter((s) => s.matchScore < 75);
  
  // High-match alternative scholarships (>= 85% match)
  const highMatchAlternatives = scholarships.filter((s) => s.matchScore >= 85);

  const [activeIneligibleId, setActiveIneligibleId] = useState(
    ineligibleScholarships[0]?.id || 'sch-aicte-pragati'
  );

  const currentIneligible = scholarships.find((s) => s.id === activeIneligibleId) || ineligibleScholarships[0];

  // Specific tailored alternatives based on why this scholarship failed
  const getTailoredAlternatives = (sch) => {
    if (!sch) return highMatchAlternatives.slice(0, 3);

    // If gender mismatch (AICTE Pragati or Infosys STEM Stars for women)
    if (sch.eligibleGender === 'Female') {
      return highMatchAlternatives.filter(
        (s) => s.id === 'sch-tata-trusts' || s.id === 'sch-reliance-ug' || s.id === 'sch-central-univ'
      );
    }

    // If State mismatch (Karnataka SSP)
    if (sch.applicableStates.some((st) => st.includes('Karnataka'))) {
      return highMatchAlternatives.filter(
        (s) => s.id === 'sch-vidyasaarathi-acc' || s.id === 'sch-nsp-csss' || s.id === 'sch-reliance-ug'
      );
    }

    return highMatchAlternatives.slice(0, 3);
  };

  const recommendedAlternatives = getTailoredAlternatives(currentIneligible);

  const handleSelectAlternative = (altSchId) => {
    setSelectedScholarshipId(altSchId);
    showToast(`Switched to ${scholarships.find(s => s.id === altSchId)?.name}`);
    navigateToPage('readiness');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#0D9488] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Feature 5 • Zero Dead Ends
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Personalized Alternatives Engine
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">
            Personalized Alternatives
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Rejection should never be a dead end. When you are not eligible for a scheme, we explain exactly why and immediately connect you to better-fit scholarships with higher match rates.
          </p>
        </div>

        <button
          onClick={() => navigateToPage('match-analysis')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#1E293B] border border-slate-300 font-semibold text-xs shadow-xs transition-all cursor-pointer self-start md:self-auto"
        >
          <span>← Back to Smart Match</span>
        </button>
      </div>

      {/* Selector of Ineligible Schemes to Test */}
      <div className="mb-6 p-4 rounded-3xl bg-slate-50 border border-slate-200">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Select an Ineligible Scheme to Inspect Reason & View Alternatives:
        </span>
        <div className="flex flex-wrap items-center gap-2.5">
          {ineligibleScholarships.map((sch) => (
            <button
              key={sch.id}
              onClick={() => setActiveIneligibleId(sch.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeIneligibleId === sch.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>{sch.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeIneligibleId === sch.id ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-700'
              }`}>
                {sch.matchScore}% Match
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Comparison Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Why You Were Filtered Out (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-rose-50/40 border border-rose-200 shadow-xs space-y-4">
            
            <div className="flex items-start justify-between gap-3 border-b border-rose-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  Disqualification Reason
                </span>
                <h3 className="text-base font-bold text-[#1E293B] mt-1.5 leading-snug">
                  {currentIneligible.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentIneligible.organization} • {currentIneligible.type}
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-2xl bg-white border border-rose-200 text-center shrink-0">
                <span className="text-xs font-extrabold text-[#EF4444] block">
                  {currentIneligible.matchScore}%
                </span>
                <span className="text-[10px] text-slate-400">Low Match</span>
              </div>
            </div>

            {/* Exact Failed Criteria List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Why your profile did not qualify:
              </h4>

              {currentIneligible.criteriaBreakdown
                .filter((c) => !c.isMet)
                .map((failedItem, fIdx) => (
                  <div 
                    key={fIdx}
                    className="p-3.5 rounded-2xl bg-white border border-rose-200 space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-black">
                        ✕
                      </span>
                      <span className="text-xs font-bold text-[#1E293B]">
                        {failedItem.criterion}
                      </span>
                    </div>

                    <p className="text-xs text-rose-900 font-medium leading-relaxed pl-7">
                      {failedItem.reason}
                    </p>

                    <div className="pl-7 pt-1 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Requirement: <strong>{failedItem.required}</strong></span>
                      <span>Your profile: <strong className="text-rose-600">{failedItem.userValue}</strong></span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Friendly guidance note */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>Our Recommendation:</span>
              </p>
              <p className="leading-snug">
                Do not spend time applying to schemes where institutional hard caps (gender or state domicile) are strict. Instead, pivot your efforts to open national and corporate merit grants where your <strong>87% score</strong> and <strong>₹2.4L income</strong> place you in the top 5% of applicants!
              </p>
            </div>

          </div>
        </div>

        {/* Right Column: Tailored High-Match Alternatives (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0D9488]" />
                <span>Better-Fit Scholarships for You ({recommendedAlternatives.length} Matches)</span>
              </h2>
              <p className="text-xs text-slate-500">
                100% compatible with your B.Tech course, {profile.personal.state} domicile, and verified vault documents.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendedAlternatives.map((alt) => (
              <div
                key={alt.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                        {alt.type}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {alt.organization}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#1E293B]">
                      {alt.name}
                    </h3>
                  </div>

                  {/* Match percentage pill */}
                  <div className="px-3 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center shrink-0 self-start">
                    <span className="text-sm font-black text-[#16A34A] block">
                      {alt.matchScore}% Match
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700">Top Candidate</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {alt.description}
                </p>

                {/* Key Advantages over rejected scheme */}
                <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-2 text-xs">
                  <span className="font-bold text-[#2563EB] text-[11px] uppercase tracking-wide block">
                    ✓ Why This Is A Superior Fit:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                      <span><strong>Gender:</strong> Open to all eligible students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                      <span><strong>State:</strong> Full national / state coverage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                      <span><strong>Amount:</strong> {alt.amountRange}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                      <span><strong>Deadline:</strong> {alt.deadlineFormatted} ({alt.deadlineDays}d left)</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{alt.criteriaBreakdown.filter(c => c.isMet).length} of {alt.criteriaBreakdown.length}</span> criteria verified in Vault
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setSelectedScholarshipId(alt.id);
                        navigateToPage('match-analysis');
                      }}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                    >
                      View Breakdown
                    </button>
                    <button
                      onClick={() => handleSelectAlternative(alt.id)}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Check Application Readiness</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
