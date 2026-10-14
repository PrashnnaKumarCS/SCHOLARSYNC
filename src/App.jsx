import React, { useState } from 'react';
import { ScholarProvider, useScholar } from './context/ScholarContext';
import Navbar from './components/Navbar';
import HeroLanding from './components/HeroLanding';
import ProfilePage from './components/ProfilePage';
import DocumentVaultPage from './components/DocumentVaultPage';
import ScholarshipDiscoveryPage from './components/ScholarshipDiscoveryPage';
import SmartMatchAnalysisPage from './components/SmartMatchAnalysisPage';
import AlternativesPage from './components/AlternativesPage';
import ApplicationReadinessPage from './components/ApplicationReadinessPage';
import SmartApplyPage from './components/SmartApplyPage';
import AIAssistantWidget from './components/AIAssistantWidget';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  FolderLock, 
  UserCheck, 
  ShieldCheck, 
  Shield, 
  ArrowRight,
  Shuffle,
  ClipboardCheck,
  SendHorizontal,
  RefreshCw
} from 'lucide-react';

function ScholarSyncApp() {
  const { activePage, navigateToPage, toastMessage, profile, isPageLoading } = useScholar();
  const [showFloatingAssistant, setShowFloatingAssistant] = useState(false);

  // Stepper flow configuration
  const flowSteps = [
    { id: 'profile', label: '1. Profile', desc: 'Create once' },
    { id: 'scholarships', label: '2. Discovery', desc: 'All criteria visible' },
    { id: 'match-analysis', label: '3. Eligibility Check', desc: 'Criteria breakdown' },
    { id: 'alternatives', label: '4. Explain & Alternatives', desc: 'Zero dead ends' },
    { id: 'readiness', label: '5. Fix Gaps & Readiness', desc: 'Audit readiness' },
    { id: 'apply', label: '6. Smart 1-Click Apply', desc: 'Vault auto-fill' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1E293B] flex flex-col font-sans selection:bg-[#EFF6FF] selection:text-[#2563EB] w-full max-w-full overflow-x-hidden">
      
      {/* Sleek Top Loading Progress Bar during Page Transitions */}
      {isPageLoading && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-600 via-teal-400 to-blue-600 shadow-sm animate-pulse" />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1E293B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom duration-200">
          <Sparkles className="w-4 h-4 text-[#0D9488]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar />

      {/* Interactive Global Flow Header Bar (Zero horizontal scroll) */}
      {activePage !== 'home' && (
        <div className="bg-slate-50 border-b border-slate-200/90 py-3 px-4 w-full">
          <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
            <span className="font-extrabold text-slate-500 uppercase tracking-wider text-xs sm:text-[13px] shrink-0">
              ScholarSync Application Pipeline:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {flowSteps.map((step, idx) => {
                const isActive = activePage === step.id;
                return (
                  <React.Fragment key={step.id}>
                    <button
                      onClick={() => navigateToPage(step.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : 'text-slate-600 hover:text-[#1E293B] hover:bg-white'
                      }`}
                    >
                      <span>{step.label}</span>
                    </button>
                    {idx < flowSteps.length - 1 && (
                      <span className="text-slate-300 font-bold hidden sm:inline">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Page Content with Smooth Transition */}
      <main className={`flex-1 transition-opacity duration-200 ${isPageLoading ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        {activePage === 'home' && (
          <div>
            <HeroLanding />
            {/* Quick Teaser of Discovery */}
            <div className="border-t border-slate-200 bg-slate-50/50 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
                      Featured High-Match Scholarships
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Personalized for <strong>{profile.personal.fullName}</strong> • All eligibility criteria visible upfront
                    </p>
                  </div>
                  <button
                    onClick={() => navigateToPage('scholarships')}
                    className="text-xs font-bold text-[#2563EB] hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Scholarships →</span>
                  </button>
                </div>
                <ScholarshipDiscoveryPage />
              </div>
            </div>
          </div>
        )}

        {/* 8 Core Pages */}
        {activePage === 'profile' && <ProfilePage />}
        {activePage === 'documents' && <DocumentVaultPage />}
        {activePage === 'scholarships' && <ScholarshipDiscoveryPage />}
        {activePage === 'match-analysis' && <SmartMatchAnalysisPage />}
        {activePage === 'alternatives' && <AlternativesPage />}
        {activePage === 'readiness' && <ApplicationReadinessPage />}
        {activePage === 'apply' && <SmartApplyPage />}
        {activePage === 'assistant' && (
          <div className="py-8 px-4">
            <div className="text-center max-w-xl mx-auto mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold border border-blue-200 mb-2">
                <Bot className="w-3.5 h-3.5" />
                <span>ScholarSync AI Scholarship Copilot</span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#1E293B]">
                AI Scholarship Assistant
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Ask about official certificate procedures, processing times vs deadlines, and how to fix eligibility gaps.
              </p>
            </div>
            <AIAssistantWidget isFloating={false} />
          </div>
        )}
      </main>

      {/* Floating AI Assistant Trigger & Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        {showFloatingAssistant ? (
          <AIAssistantWidget 
            isFloating={true} 
            onClose={() => setShowFloatingAssistant(false)} 
          />
        ) : (
          <button
            onClick={() => setShowFloatingAssistant(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#2563EB] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all font-semibold text-xs cursor-pointer group"
            title="Ask AI Assistant"
          >
            <div className="relative">
              <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#16A34A] rounded-full border-2 border-white" />
            </div>
            <span>AI Assistant</span>
          </button>
        )}
      </div>

      {/* Footer (Government Portal Styling with Single Official Logo) */}
      <footer className="border-t border-slate-200 bg-slate-50/70 pt-12 pb-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Col 1: Brand (Using the logo itself, prominent and big) */}
            <div className="space-y-3">
              <div 
                onClick={() => navigateToPage('home')}
                className="cursor-pointer inline-block"
                title="ScholarSync • AI Scholarship Platform"
              >
                <img 
                  src="/scholarsync-logo-clean.png" 
                  alt="ScholarSync" 
                  className="h-16 sm:h-20 w-auto object-contain"
                />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                India's AI-Powered Scholarship Matching Platform. Fill your profile once, store verified documents in your secure vault, and apply with 1-click pre-fill.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#0D9488] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span>Verified Applicant Protection</span>
              </div>
            </div>

            {/* Col 2: Core Platform Pages */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Discovery & Vault (1–4)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li>
                  <button onClick={() => navigateToPage('profile')} className="hover:text-[#2563EB] cursor-pointer">
                    1. Student Profile
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('documents')} className="hover:text-[#2563EB] cursor-pointer">
                    2. Document Vault
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('scholarships')} className="hover:text-[#2563EB] cursor-pointer">
                    3. Scholarships for You (All Criteria Visible)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('match-analysis')} className="hover:text-[#2563EB] cursor-pointer">
                    4. Smart Match Analysis
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Advanced Pipeline (Pages 5–8) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Action & Apply (5–8)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li>
                  <button onClick={() => navigateToPage('alternatives')} className="hover:text-[#2563EB] cursor-pointer">
                    5. Personalized Alternatives
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('readiness')} className="hover:text-[#2563EB] cursor-pointer">
                    6. Application Readiness
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('assistant')} className="hover:text-[#2563EB] cursor-pointer">
                    7. AI Scholarship Assistant
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('apply')} className="hover:text-[#2563EB] cursor-pointer">
                    8. Smart 1-Click Vault Pre-fill
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Flow summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                The Student Guarantee
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero repetitive form filling. Rejection is never a dead end. Transparent criteria evaluation.
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-800 bg-white border border-slate-200 px-3 py-1 rounded-lg shadow-2xs inline-block">
                  Academic Year 2026–2027
                </span>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© 2026 ScholarSync India. An AI Public Welfare Initiative.</p>
            <div className="flex items-center gap-4">
              <span>National Portal Standard</span>
              <span>•</span>
              <span>Accessible Contrast</span>
              <span>•</span>
              <span>100% Pre-fill Guarantee</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <ScholarProvider>
      <ScholarSyncApp />
    </ScholarProvider>
  );
}
