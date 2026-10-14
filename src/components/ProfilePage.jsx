import React, { useState } from 'react';
import { useScholar } from '../context/ScholarContext';
import { 
  User, 
  GraduationCap, 
  Settings, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  FolderLock
} from 'lucide-react';
import { indianStates, courseOptions, categoryOptions, scholarshipTypes } from '../data/mockData';

export default function ProfilePage() {
  const { profile, updateProfile, profileCompleteness, documents, navigateToPage, showToast } = useScholar();
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'academic' | 'documents'

  const addedDocsCount = documents.filter((d) => d.status === 'Added').length;

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Profile saved successfully! Synced across all matching algorithms.');
  };

  const handlePreferenceToggle = (type) => {
    const current = profile.preferences.preferredTypes || [];
    let updated;
    if (current.includes(type)) {
      if (current.length === 1) return; // Keep at least one
      updated = current.filter((t) => t !== type);
    } else {
      updated = [...current, type];
    }
    updateProfile('preferences', 'preferredTypes', updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Prominent Student PFP & Identification Banner */}
      <div className="mb-6 p-6 rounded-3xl bg-gradient-to-r from-blue-50/80 via-white to-teal-50/70 border-2 border-blue-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#2563EB] to-indigo-600 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-md ring-4 ring-white">
              {profile.personal.fullName.charAt(0)}
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#16A34A] rounded-full border-2 border-white flex items-center justify-center text-white text-[11px] font-bold">
              ✓
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-[#16A34A] border border-emerald-300">
                Aadhaar e-KYC Verified
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Reg ID: 2026-IND-0984
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1E293B]">
              {profile.personal.fullName}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {profile.academic.currentCourse} • {profile.academic.yearOfStudy} • Academic Score: <strong className="text-[#2563EB]">{profile.academic.academicScore}%</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateToPage('scholarships')}
            className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>View Eligible Scholarships</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
              One Profile • Unlimited Matches
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Reusable across Central, State, and Corporate Portals
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
            Student Profile & Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Update your profile credentials. The AI matching algorithm instantly evaluates all 14 scholarship cutoffs based on this data.
          </p>
        </div>

        <button
          onClick={() => navigateToPage('documents')}
          className="text-xs font-bold px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-[#EFF6FF] text-[#2563EB] border border-slate-300 hover:border-[#BFDBFE] transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <FolderLock className="w-4 h-4" />
          <span>Document Vault ({addedDocsCount}/5 Ready)</span>
        </button>
      </div>

      {/* Completeness Card */}
      <div className="mb-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-black text-lg border border-[#BFDBFE]">
              {profileCompleteness}%
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
                <span>Profile Completeness: {profileCompleteness}%</span>
                {profileCompleteness >= 80 ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200">
                    High Readiness
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-[#D97706] border border-amber-200">
                    Action Needed
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {profileCompleteness === 100 
                  ? 'Your profile is 100% complete! All scholarship criteria can be checked automatically.'
                  : `Upload your missing Community Certificate in the Document Vault to reach 100% and unlock quota benefits.`}
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
          <div 
            className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-[#2563EB] via-blue-500 to-[#0D9488]"
            style={{ width: `${profileCompleteness}%` }}
          />
        </div>

        {/* Section milestones */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span><strong>Personal Details:</strong> 100% Complete</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
            <span><strong>Academic Scores:</strong> Verified (87%)</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            {addedDocsCount === 5 ? (
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />
            )}
            <span>
              <strong>Document Vault:</strong> {addedDocsCount}/5 Added 
              {addedDocsCount < 5 && ' (1 Missing)'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Tabbed Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Navigation Tabs (Zero horizontal scroll) */}
        <div className="flex flex-wrap border-b border-slate-200 bg-slate-50/60 px-4 sm:px-6 pt-3 gap-2 w-full">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex items-center gap-2 py-3 px-4 rounded-t-xl text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'personal'
                ? 'border-[#2563EB] text-[#2563EB] bg-white'
                : 'border-transparent text-slate-600 hover:text-[#1E293B]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>1. Personal Information</span>
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            className={`flex items-center gap-2 py-3 px-4 rounded-t-xl text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'academic'
                ? 'border-[#2563EB] text-[#2563EB] bg-white'
                : 'border-transparent text-slate-600 hover:text-[#1E293B]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>2. Academic Records</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`flex items-center gap-2 py-3 px-4 rounded-t-xl text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'documents'
                ? 'border-[#2563EB] text-[#2563EB] bg-white'
                : 'border-transparent text-slate-600 hover:text-[#1E293B]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>3. Preferences & Financial</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSave}>

            {/* TAB 1: PERSONAL INFORMATION */}
            {activeTab === 'personal' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-[#1E293B]">
                    Personal Identity & Location
                  </h3>
                  <p className="text-xs text-slate-500">
                    State domicile and category determine eligibility for central and state quotas.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      Full Name (As per 10th Marksheet / Aadhaar) *
                    </label>
                    <input
                      type="text"
                      value={profile.personal.fullName}
                      onChange={(e) => updateProfile('personal', 'fullName', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      placeholder="e.g. Aarav Sharma"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={profile.personal.email}
                      onChange={(e) => updateProfile('personal', 'email', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      placeholder="name@college.edu.in"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      Mobile Number (Aadhaar Linked) *
                    </label>
                    <input
                      type="tel"
                      value={profile.personal.phone}
                      onChange={(e) => updateProfile('personal', 'phone', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      placeholder="+91 98402 71829"
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      Gender *
                    </label>
                    <select
                      value={profile.personal.gender}
                      onChange={(e) => updateProfile('personal', 'gender', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white transition-all cursor-pointer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female (Eligible for Pragati & Women STEM)</option>
                      <option value="Non-Binary / Other">Non-Binary / Other</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      Social Category / Reservation *
                    </label>
                    <select
                      value={profile.personal.category}
                      onChange={(e) => updateProfile('personal', 'category', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white transition-all cursor-pointer"
                    >
                      {categoryOptions.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* State / Domicile */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      State of Permanent Domicile *
                    </label>
                    <select
                      value={profile.personal.state}
                      onChange={(e) => updateProfile('personal', 'state', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white transition-all cursor-pointer"
                    >
                      {indianStates.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      District
                    </label>
                    <input
                      type="text"
                      value={profile.personal.district}
                      onChange={(e) => updateProfile('personal', 'district', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      placeholder="e.g. Pune / Mumbai"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      value={profile.personal.pincode}
                      onChange={(e) => updateProfile('personal', 'pincode', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      placeholder="411004"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={profile.personal.dob}
                      onChange={(e) => updateProfile('personal', 'dob', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                    />
                  </div>

                </div>
              </div>
            )}

            {/* TAB 2: ACADEMIC RECORDS */}
            {activeTab === 'academic' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-[#1E293B]">
                    Academic Details & Performance
                  </h3>
                  <p className="text-xs text-slate-500">
                    Scholarships evaluate cutoffs based on current CGPA and Class 12th board marks.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  
                  {/* Course */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      Current Course / Degree Program *
                    </label>
                    <select
                      value={profile.academic.currentCourse}
                      onChange={(e) => updateProfile('academic', 'currentCourse', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white transition-all cursor-pointer"
                    >
                      {courseOptions.map((crs) => (
                        <option key={crs} value={crs}>{crs}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year of Study */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      Current Year of Study *
                    </label>
                    <select
                      value={profile.academic.yearOfStudy}
                      onChange={(e) => updateProfile('academic', 'yearOfStudy', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white transition-all cursor-pointer"
                    >
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Junior)</option>
                      <option value="4th Year">4th Year (Senior / Final)</option>
                    </select>
                  </div>

                  {/* College / Institution */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      College / University Name *
                    </label>
                    <input
                      type="text"
                      value={profile.academic.institution}
                      onChange={(e) => updateProfile('academic', 'institution', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      placeholder="e.g. National Institute of Technology (NIT)"
                      required
                    />
                  </div>

                  {/* Institution Type */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      Institution Recognition Type
                    </label>
                    <select
                      value={profile.academic.institutionType}
                      onChange={(e) => updateProfile('academic', 'institutionType', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white transition-all cursor-pointer"
                    >
                      <option value="Institute of National Importance / Central">Central / Institute of National Importance (NIT/IIT/IISER)</option>
                      <option value="State Government University / College">State Govt University / Affiliated</option>
                      <option value="Private Deemed University (NAAC A++)">Private Deemed University (NAAC A++)</option>
                      <option value="Autonomous College">Autonomous College</option>
                    </select>
                  </div>

                  {/* Academic Score (Current) */}
                  <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]">
                    <label className="block text-xs font-bold text-[#2563EB] mb-1.5">
                      Current Academic Score (%) *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="40"
                        max="100"
                        step="0.1"
                        value={profile.academic.academicScore}
                        onChange={(e) => updateProfile('academic', 'academicScore', parseFloat(e.target.value) || 0)}
                        className="w-24 px-3 py-1.5 rounded-lg border border-blue-300 bg-white text-base font-bold text-[#1E293B] focus:ring-2 focus:ring-blue-200 outline-none"
                        required
                      />
                      <span className="text-xs text-slate-600 font-medium">
                        % or CGPA equivalent (e.g. 8.7 CGPA = 87%)
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-700 mt-2">
                      💡 Matches Reliance, Tata, Google & CSSS merit cutoff (&gt;75%).
                    </p>
                  </div>

                  {/* Class 12 Score */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      Class 12th Board Score (%) *
                    </label>
                    <input
                      type="number"
                      min="40"
                      max="100"
                      step="0.1"
                      value={profile.academic.class12Score}
                      onChange={(e) => updateProfile('academic', 'class12Score', parseFloat(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      placeholder="89.2"
                    />
                  </div>

                  {/* Class 10 Score */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                      Class 10th Board Score (%)
                    </label>
                    <input
                      type="number"
                      min="40"
                      max="100"
                      step="0.1"
                      value={profile.academic.class10Score}
                      onChange={(e) => updateProfile('academic', 'class10Score', parseFloat(e.target.value) || 0)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all"
                      placeholder="92.4"
                    />
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: PREFERENCES & FINANCIAL */}
            {activeTab === 'documents' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-[#1E293B]">
                    Financial Bracket & Scholarship Preferences
                  </h3>
                  <p className="text-xs text-slate-500">
                    Family income is the primary threshold for means-based scholarships.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Family Annual Income */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-[#1E293B]">
                      Gross Annual Family Income (INR) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 font-bold text-slate-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        step="10000"
                        min="0"
                        max="2500000"
                        value={profile.preferences.familyAnnualIncome}
                        onChange={(e) => updateProfile('preferences', 'familyAnnualIncome', parseInt(e.target.value) || 0)}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none text-base font-semibold transition-all bg-white"
                        required
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {[
                        { label: '₹1.5 Lakhs', val: 150000 },
                        { label: '₹2.4 Lakhs', val: 240000 },
                        { label: '₹4.5 Lakhs', val: 450000 },
                        { label: '₹6.0 Lakhs', val: 600000 },
                        { label: '₹8.0 Lakhs', val: 800000 },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => updateProfile('preferences', 'familyAnnualIncome', preset.val)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                            profile.preferences.familyAnnualIncome === preset.val
                              ? 'bg-[#2563EB] text-white border-[#2563EB]'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      Current Value: <strong className="text-[#1E293B]">₹{(profile.preferences.familyAnnualIncome / 100000).toFixed(2)} Lakhs / year</strong>. Matches your uploaded Tahsil Income Certificate.
                    </p>
                  </div>

                  {/* Scholarship Type Preferences */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-[#1E293B]">
                      Scholarship Preference (Select all that interest you) *
                    </label>
                    <p className="text-xs text-slate-500">
                      We highlight matching options according to these provider categories.
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                      {scholarshipTypes.filter((t) => t !== 'All').map((type) => {
                        const isSelected = (profile.preferences.preferredTypes || []).includes(type);
                        return (
                          <div
                            key={type}
                            onClick={() => handlePreferenceToggle(type)}
                            className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all select-none ${
                              isSelected
                                ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE] shadow-2xs'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span>{type}</span>
                            <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                              isSelected ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'border-slate-300'
                            }`}>
                              {isSelected && '✓'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Vault Cross-Link Callout */}
                <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#0D9488] flex items-center justify-center shrink-0">
                      <FolderLock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1E293B]">
                        Attach Documents via Document Vault
                      </h4>
                      <p className="text-xs text-slate-600">
                        {addedDocsCount} of 5 required application documents are vaulted and verified.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePage('documents')}
                    className="px-4 py-2 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Manage Vault Documents</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span>Protected with DigiLocker encryption. Never shared with third parties.</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {activeTab !== 'documents' ? (
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === 'personal' ? 'academic' : 'documents')}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Next Section</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Update All Matches</span>
                  </button>
                )}
              </div>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}
