import React, { useState, useMemo } from 'react';
import { useScholar } from '../context/ScholarContext';
import { 
  Search, 
  Filter, 
  GraduationCap, 
  Sparkles, 
  Calendar, 
  IndianRupee, 
  Building2, 
  ArrowRight, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  AlertCircle, 
  Check, 
  X,
  Clock, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  FileText,
  UserCheck,
  HelpCircle,
  Eye
} from 'lucide-react';
import { scholarshipTypes } from '../data/mockData';

export default function ScholarshipDiscoveryPage() {
  const { 
    scholarships, 
    navigateToPage, 
    setSelectedScholarshipId, 
    searchQuery, 
    setSearchQuery, 
    selectedTypeFilter, 
    setSelectedTypeFilter,
    bookmarkedIds,
    toggleBookmark,
    profile,
    documents,
    showToast
  } = useScholar();

  const [sortBy, setSortBy] = useState('match'); // 'match' | 'deadline'
  const [onlyHighMatch, setOnlyHighMatch] = useState(false);

  // Filtered & Sorted list
  const filteredScholarships = useMemo(() => {
    let result = [...scholarships];

    // Filter by type
    if (selectedTypeFilter !== 'All') {
      result = result.filter((s) => s.type === selectedTypeFilter);
    }

    // Filter by search query (course, location, organization, name)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((s) => 
        s.name.toLowerCase().includes(q) ||
        s.organization.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q) ||
        s.applicableCourses.some((c) => c.toLowerCase().includes(q)) ||
        s.applicableStates.some((st) => st.toLowerCase().includes(q))
      );
    }

    // Only high match
    if (onlyHighMatch) {
      result = result.filter((s) => s.matchScore >= 80);
    }

    // Sort
    if (sortBy === 'match') {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'deadline') {
      result.sort((a, b) => a.deadlineDays - b.deadlineDays);
    }

    return result;
  }, [scholarships, selectedTypeFilter, searchQuery, onlyHighMatch, sortBy]);

  const handleViewAnalysis = (schId) => {
    setSelectedScholarshipId(schId);
    navigateToPage('match-analysis');
  };

  const handleApply = (schId) => {
    setSelectedScholarshipId(schId);
    navigateToPage('apply');
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'Government':
        return 'bg-blue-50 text-[#2563EB] border-blue-200';
      case 'Private':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'NGO':
        return 'bg-teal-50 text-[#0D9488] border-teal-200';
      case 'Company':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'University':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getMatchScoreBadge = (score) => {
    if (score >= 80) {
      return {
        bg: 'bg-[#DCFCE7] text-[#16A34A] border-[#86EFAC]',
        label: `${score}% Match`,
        sub: 'High Eligibility',
      };
    } else if (score >= 60) {
      return {
        bg: 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]',
        label: `${score}% Match`,
        sub: 'Partial Gaps',
      };
    } else {
      return {
        bg: 'bg-[#FEE2E2] text-[#EF4444] border-[#FCA5A5]',
        label: `${score}% Match`,
        sub: 'Not Eligible',
      };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header with Government Portal Style Texture */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-[#2563EB] bg-[#EFF6FF] px-2.5 py-0.5 rounded border border-[#BFDBFE] uppercase tracking-wide">
              Official Portal Registry • AY 2026–27
            </span>
            <span className="text-xs text-slate-600 font-medium">
              Applicant: <strong>{profile.personal.fullName}</strong> ({profile.personal.state})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
            Scholarships for You
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            All active Central, State, Corporate, and NGO scholarships with <strong>full eligibility criteria visible upfront</strong> under each scholarship card.
          </p>
        </div>

        {/* Action button */}
        <button
          onClick={() => navigateToPage('match-analysis')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#1E293B] border border-slate-300 font-semibold text-xs shadow-xs transition-all cursor-pointer self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-[#0D9488]" />
          <span>Compare All in Smart Match</span>
        </button>
      </div>

      {/* Filter Tabs (All, Government, Private, NGO, University, Company - Zero horizontal scroll) */}
      <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-200 mb-6 w-full">
        {scholarshipTypes.map((type) => {
          const count = type === 'All' 
            ? scholarships.length 
            : scholarships.filter((s) => s.type === type).length;
          const isActive = selectedTypeFilter === type;

          return (
            <button
              key={type}
              onClick={() => setSelectedTypeFilter(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>{type}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Sort Toolbar */}
      <div className="mb-8 p-4 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course (e.g. B.Tech), state (e.g. Maharashtra), or scholarship name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-medium text-[#1E293B] focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Filters & Sorting */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setOnlyHighMatch(!onlyHighMatch)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              onlyHighMatch
                ? 'bg-emerald-50 text-[#16A34A] border-emerald-300 font-bold'
                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>High Matches (≥80%)</span>
          </button>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-300 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="match">Best Match %</option>
              <option value="deadline">Deadline (Soonest)</option>
            </select>
          </div>
        </div>

      </div>

      {/* Results Banner */}
      <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
        <span>Showing <strong>{filteredScholarships.length}</strong> scholarships • Full eligibility criteria visible on each card</span>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-[#2563EB] hover:underline font-semibold"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Cards Grid: Render ALL eligibility criteria visible under every single scholarship card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredScholarships.map((sch) => {
          const matchMeta = getMatchScoreBadge(sch.matchScore);
          const isSaved = bookmarkedIds.includes(sch.id);
          const metCount = sch.criteriaBreakdown.filter((c) => c.isMet).length;
          const totalCount = sch.criteriaBreakdown.length;

          return (
            <div
              key={sch.id}
              className="bg-white rounded-3xl border-2 border-slate-200 hover:border-blue-400 hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between"
            >
              <div>
                
                {/* Top Type Badge & Bookmark */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${getBadgeColor(sch.type)}`}>
                      {sch.type}
                    </span>
                    {sch.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200">
                        {sch.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`px-2.5 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 ${matchMeta.bg}`}>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{matchMeta.label}</span>
                    </div>

                    <button
                      onClick={() => {
                        toggleBookmark(sch.id);
                        showToast(isSaved ? 'Removed from saved scholarships' : 'Saved to your shortlist');
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-colors cursor-pointer"
                      title={isSaved ? 'Remove Bookmark' : 'Bookmark Scholarship'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-[#2563EB] fill-[#2563EB]" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Scholarship Name & Organization */}
                <h3 
                  onClick={() => handleViewAnalysis(sch.id)}
                  className="text-base sm:text-lg font-extrabold text-[#1E293B] hover:text-[#2563EB] transition-colors cursor-pointer leading-snug mb-1"
                >
                  {sch.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mb-4">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{sch.organization}</span>
                </div>

                {/* Amount & Deadline Highlighting Cards */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 mb-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Scholarship Amount:</span>
                    <span className="font-extrabold text-[#1E293B] text-sm">
                      {sch.amountRange}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-200">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Last Date to Apply:</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{sch.deadlineFormatted}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        sch.deadlineDays <= 20 
                          ? 'bg-rose-100 text-[#EF4444] border border-rose-300' 
                          : 'bg-blue-100 text-[#2563EB] border border-blue-300'
                      }`}>
                        {sch.deadlineDays} days remaining
                      </span>
                    </div>
                  </div>
                </div>

                {/* ALL ELIGIBILITY CRITERIA VISIBLE INDIVIDUALLY DIRECTLY UNDER THIS CARD */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 mb-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E293B]">
                      <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>All Eligibility Criteria ({metCount}/{totalCount} Met)</span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500">
                      Evaluated against your profile
                    </span>
                  </div>

                  {/* List of every individual criterion for this scholarship */}
                  <div className="space-y-2">
                    {sch.criteriaBreakdown.map((criterionItem, cIdx) => {
                      const isMet = criterionItem.isMet;
                      return (
                        <div 
                          key={cIdx}
                          className={`p-2.5 rounded-xl border text-xs transition-colors ${
                            isMet 
                              ? 'bg-emerald-50/40 border-emerald-200' 
                              : 'bg-rose-50/50 border-rose-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2">
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 ${
                                isMet ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#EF4444]'
                              }`}>
                                {isMet ? '✓' : '✗'}
                              </span>
                              <div>
                                <span className="font-bold text-[#1E293B] block">
                                  {criterionItem.criterion}
                                </span>
                                <span className="text-[11px] text-slate-600 block leading-tight mt-0.5">
                                  Required: <strong>{criterionItem.required}</strong>
                                </span>
                                <span className={`text-[11px] block mt-0.5 font-medium ${
                                  isMet ? 'text-emerald-800' : 'text-rose-700'
                                }`}>
                                  Reason: {criterionItem.reason}
                                </span>
                              </div>
                            </div>

                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                              isMet 
                                ? 'bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]' 
                                : 'bg-[#FEE2E2] text-[#EF4444] border border-[#FCA5A5]'
                            }`}>
                              {isMet ? 'Met' : 'Not Met'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Bottom Card Actions */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                
                <button
                  onClick={() => handleViewAnalysis(sch.id)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#1E293B] border border-slate-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Smart Match</span>
                </button>

                {sch.matchScore >= 80 ? (
                  <button
                    onClick={() => handleApply(sch.id)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <span>1-Click Smart Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedScholarshipId(sch.id);
                      navigateToPage('alternatives');
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <span>Find Better-Fit Alternatives</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

              </div>

            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredScholarships.length === 0 && (
        <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#1E293B]">No scholarships found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No matches found for "{searchQuery}". Try searching for "Engineering", "Maharashtra", or reset the filter tabs.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTypeFilter('All');
              setOnlyHighMatch(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-semibold cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}
