import React, { useState } from 'react';
import { useScholar } from '../context/ScholarContext';
import { 
  GraduationCap, 
  FolderLock, 
  Compass, 
  Sparkles, 
  UserCheck, 
  Menu, 
  X, 
  Bot,
  Shuffle,
  ClipboardCheck,
  SendHorizontal,
  Check
} from 'lucide-react';

export default function Navbar() {
  const { activePage, navigateToPage, profileCompleteness, profile } = useScholar();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'scholarships', label: 'Scholarships', icon: GraduationCap },
    { id: 'match-analysis', label: 'Smart Match', icon: Sparkles },
    { id: 'alternatives', label: 'Alternatives', icon: Shuffle },
    { id: 'readiness', label: 'Readiness', icon: ClipboardCheck },
    { id: 'documents', label: 'Vault', icon: FolderLock },
    { id: 'profile', label: 'Profile', icon: UserCheck },
    { id: 'apply', label: 'Apply', icon: SendHorizontal },
    { id: 'assistant', label: 'AI Assistant', icon: Bot, isBeta: true },
  ];

  const handleNavClick = (id) => {
    navigateToPage(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-slate-200/90 shadow-sm select-none">
      
      {/* Main Spacious Navbar - Fits full page width comfortably */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex items-center justify-between min-h-[96px] sm:min-h-[104px] md:min-h-[114px] py-3 sm:py-3.5 gap-4 lg:gap-6">
          
          {/* Logo & Tag Section (Large, Prominent, Clean, No Tagline) */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 sm:gap-4.5 cursor-pointer group shrink-0"
            title="ScholarSync • AI Scholarship Platform"
          >
            {/* Big Clean Logo Image (Tagline removed) */}
            <img 
              src="/scholarsync-logo-clean.png" 
              alt="ScholarSync" 
              className="h-14 sm:h-16 md:h-18 lg:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />

            {/* Prominent High-Visibility Tag for ScholarSync */}
            <div className="hidden lg:flex flex-col border-l-2 border-slate-200/90 pl-4 py-1 justify-center shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black tracking-wider uppercase text-[#1E293B]">
                  SCHOLARSYNC
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-black bg-blue-100 text-[#2563EB] border border-blue-200 uppercase tracking-wider">
                  AI PORTAL
                </span>
              </div>
              <span className="text-xs sm:text-[13px] text-slate-500 font-bold tracking-wide mt-0.5">
                Central Matching & Vault
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Bigger font, larger icons, spacious padding) */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5 flex-wrap justify-center">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2.5 2xl:px-4 2xl:py-3 rounded-xl text-sm 2xl:text-[15px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#2563EB] shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-[#1E293B] hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 2xl:w-5 2xl:h-5 ${isActive ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.isBeta && (
                    <span className="text-[10px] 2xl:text-[11px] font-black px-1.5 py-0.5 rounded-md bg-teal-50 text-[#0D9488] border border-teal-200">
                      AI
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2563EB] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Medium Screen Navigation (Condensed but with bigger text) */}
          <nav className="hidden md:flex xl:hidden items-center gap-1.5">
            {[
              { id: 'scholarships', label: 'Scholarships' },
              { id: 'match-analysis', label: 'Smart Match' },
              { id: 'alternatives', label: 'Alternatives' },
              { id: 'readiness', label: 'Readiness' },
              { id: 'documents', label: 'Vault' },
              { id: 'apply', label: 'Apply' },
              { id: 'assistant', label: 'AI Help' },
            ].map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive ? 'bg-[#EFF6FF] text-[#2563EB] font-extrabold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Prominent Student Profile Card (Right in Navbar - Bigger & Clearer) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div 
              onClick={() => handleNavClick('profile')}
              className="flex items-center gap-3 sm:gap-3.5 px-3.5 py-2 sm:py-2.5 rounded-2xl bg-slate-50 hover:bg-[#EFF6FF] border border-slate-200 hover:border-blue-300 transition-all cursor-pointer shadow-xs group"
              title="Click to view full Student Profile"
            >
              {/* Large Student PFP Avatar */}
              <div className="relative shrink-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white flex items-center justify-center font-black text-base sm:text-lg shadow-xs ring-2 ring-white">
                  {profile.personal.fullName.charAt(0)}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#16A34A] rounded-full border-2 border-white flex items-center justify-center text-white" title="Verified Student">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              </div>

              {/* Student info */}
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-sm sm:text-base font-extrabold text-[#1E293B] group-hover:text-[#2563EB] transition-colors">
                    {profile.personal.fullName}
                  </span>
                </div>

                <div className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-none mt-1.5">
                  <span>{profile.academic.yearOfStudy}</span> • <span className="text-[#2563EB] font-bold">{profile.academic.academicScore}% Score</span>
                </div>

                {/* Progress bar pill */}
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-20 sm:w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 bg-[#16A34A]"
                      style={{ width: `${profileCompleteness}%` }}
                    />
                  </div>
                  <span className="text-xs font-extrabold text-slate-700">
                    {profileCompleteness}%
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 sm:p-3 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-5 pt-4 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto overflow-x-hidden">
          <div className="p-3.5 mb-2 rounded-2xl bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base">
                {profile.personal.fullName.charAt(0)}
              </div>
              <div>
                <p className="text-base font-bold text-[#1E293B]">{profile.personal.fullName}</p>
                <p className="text-xs text-slate-600">{profile.personal.state} • Score: {profile.academic.academicScore}%</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#16A34A]">{profileCompleteness}% Complete</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.isBeta && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-50 text-[#0D9488] border border-teal-200">
                      AI ASSIST
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </header>
  );
}
