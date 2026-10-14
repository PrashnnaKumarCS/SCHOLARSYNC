import React from 'react';
import { useScholar } from '../context/ScholarContext';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  FolderLock, 
  FileText, 
  GraduationCap, 
  TrendingUp,
  Search,
  Users,
  Building2,
  Check,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function HeroLanding() {
  const { navigateToPage, profile, profileCompleteness, scholarships, documents } = useScholar();

  const highMatchCount = scholarships.filter((s) => s.matchScore >= 80).length;
  const addedDocsCount = documents.filter((d) => d.status === 'Added').length;

  return (
    <div className="w-full bg-white overflow-x-hidden">
      
      {/* 1. PROMINENT STUDENT PROFILE CARD (RIGHT AT TOP - NO SCROLLING NEEDED) */}
      <section className="w-full bg-gradient-to-b from-blue-50/60 via-slate-50/40 to-white border-b border-slate-200/80 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-300 transition-all">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Left: Prominent Student PFP Avatar & Key Credentials */}
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                
                {/* Large Student PFP Avatar */}
                <div className="relative shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#2563EB] via-indigo-600 to-teal-500 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-md ring-4 ring-blue-50">
                    {profile.personal.fullName.charAt(0)}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#16A34A] rounded-full border-2 border-white flex items-center justify-center text-white shadow-xs" title="Verified Student Profile">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* Identity & Academic Meta */}
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200">
                      ✓ Active Student Profile
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Student ID: SCH-2026-0842
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] leading-tight truncate">
                    {profile.personal.fullName}
                  </h2>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-700 font-medium">
                    <span className="font-bold text-[#2563EB]">{profile.academic.currentCourse}</span>
                    <span className="text-slate-300">•</span>
                    <span>Year: <strong>{profile.academic.yearOfStudy}</strong></span>
                    <span className="text-slate-300">•</span>
                    <span>Score: <strong className="text-[#16A34A]">{profile.academic.academicScore}%</strong></span>
                    <span className="text-slate-300">•</span>
                    <span>State: <strong>{profile.personal.state}</strong></span>
                  </div>

                  <p className="text-xs text-slate-500 pt-0.5 truncate">
                    {profile.academic.institution} • {profile.personal.category} • Family Income: <strong>₹{(profile.preferences.familyAnnualIncome / 100000).toFixed(1)}L/yr</strong>
                  </p>
                </div>

              </div>

              {/* Right: Profile Completeness Gauge & Fast Navigation Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:border-l lg:border-slate-200 lg:pl-6 shrink-0">
                
                {/* Progress bar info */}
                <div className="space-y-1.5 w-full sm:w-auto">
                  <div className="flex items-center justify-between sm:justify-start gap-3 text-xs font-bold text-slate-700">
                    <span>Profile Completeness:</span>
                    <span className="text-sm font-black text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {profileCompleteness}%
                    </span>
                  </div>

                  <div className="w-full sm:w-36 h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div 
                      className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-[#2563EB] to-[#16A34A]"
                      style={{ width: `${profileCompleteness}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-slate-500 font-medium">
                    {addedDocsCount} of {documents.length} Vault Documents Attached
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="flex flex-wrap sm:flex-col gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => navigateToPage('profile')}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer text-center whitespace-nowrap"
                  >
                    Edit Profile Credentials
                  </button>
                  <button
                    onClick={() => navigateToPage('documents')}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs cursor-pointer text-center whitespace-nowrap"
                  >
                    Open Document Vault
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. HERO SECTION WITH PROMINENT SCHOLARSYNC BRANDING & BIG TAGLINE */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Big Brand Presentation */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <img 
                src="/scholarsync-logo-cropped.png" 
                alt="ScholarSync Logo" 
                className="h-24 sm:h-32 md:h-40 lg:h-44 w-auto object-contain mx-auto drop-shadow-sm transition-transform hover:scale-105"
              />
              
              {/* Extra Large, Super Visible Tagline */}
              <div className="pt-2 space-y-2">
                <span className="inline-block text-xs sm:text-sm font-black uppercase tracking-widest text-[#2563EB] bg-[#EFF6FF] px-5 py-2 rounded-full border-2 border-[#BFDBFE]">
                  India's Dedicated AI Scholarship Platform
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#1E293B] tracking-tight uppercase leading-tight">
                  Smarter Matching.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-indigo-600 to-[#0D9488]">
                    Brighter Future.
                  </span>
                </h1>
              </div>
            </div>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Fill your profile once, store verified documents in your secure vault, and see <strong>full eligibility criteria visible upfront</strong> for every government, private, and corporate scholarship across India.
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <button
                onClick={() => navigateToPage('scholarships')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Discover All Scholarships</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateToPage('match-analysis')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-[#1E293B] border-2 border-slate-300 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#0D9488]" />
                <span>Smart Match Analysis</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Banner */}
          <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-200">
            <div className="p-3 text-center sm:border-r border-slate-200">
              <div className="text-2xl sm:text-3xl font-black text-[#2563EB]">
                {scholarships.length}+
              </div>
              <div className="text-xs font-bold text-slate-600 mt-0.5">
                Verified Grants
              </div>
            </div>

            <div className="p-3 text-center sm:border-r border-slate-200">
              <div className="text-2xl sm:text-3xl font-black text-[#16A34A]">
                {highMatchCount}
              </div>
              <div className="text-xs font-bold text-slate-600 mt-0.5">
                High Matches for You
              </div>
            </div>

            <div className="p-3 text-center sm:border-r border-slate-200">
              <div className="text-2xl sm:text-3xl font-black text-[#0D9488]">
                {addedDocsCount}/{documents.length}
              </div>
              <div className="text-xs font-bold text-slate-600 mt-0.5">
                Vault Certificates Ready
              </div>
            </div>

            <div className="p-3 text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#1E293B]">
                100%
              </div>
              <div className="text-xs font-bold text-slate-600 mt-0.5">
                Auto Pre-fill Guaranteed
              </div>
            </div>
          </div>

          {/* Guided Flow Steps Banner (Responsive, fits in width with zero horizontal scroll) */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                The ScholarSync Pipeline
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B] mt-2">
                From Discovery to Acceptance in 6 Simple Steps
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { 
                  step: '01', 
                  title: 'Student Profile', 
                  desc: 'Add credentials once', 
                  page: 'profile',
                  color: 'text-blue-600',
                  bg: 'bg-blue-50'
                },
                { 
                  step: '02', 
                  title: 'Document Vault', 
                  desc: 'Store verified certificates', 
                  page: 'documents',
                  color: 'text-teal-600',
                  bg: 'bg-teal-50'
                },
                { 
                  step: '03', 
                  title: 'Discovery', 
                  desc: 'All criteria visible upfront', 
                  page: 'scholarships',
                  color: 'text-indigo-600',
                  bg: 'bg-indigo-50'
                },
                { 
                  step: '04', 
                  title: 'Smart Match', 
                  desc: 'Criterion breakdown (✓ / ✗)', 
                  page: 'match-analysis',
                  color: 'text-amber-600',
                  bg: 'bg-amber-50'
                },
                { 
                  step: '05', 
                  title: 'Alternatives', 
                  desc: 'Zero dead ends for mismatches', 
                  page: 'alternatives',
                  color: 'text-emerald-600',
                  bg: 'bg-emerald-50'
                },
                { 
                  step: '06', 
                  title: '1-Click Apply', 
                  desc: 'Vault auto-filled submission', 
                  page: 'apply',
                  color: 'text-purple-600',
                  bg: 'bg-purple-50'
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => navigateToPage(item.page)}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.bg} ${item.color}`}>
                        Step {item.step}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs text-[#1E293B] group-hover:text-[#2563EB] transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-slate-400 group-hover:text-[#2563EB]">
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
