import React, { useState } from 'react';
import { useScholar } from '../context/ScholarContext';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  ExternalLink,
  ChevronDown,
  X,
  MessageSquare
} from 'lucide-react';

export default function AIAssistantWidget({ isFloating = false, onClose }) {
  const { profile, documents, scholarships } = useScholar();
  
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${profile.personal.fullName.split(' ')[0]}! I'm your ScholarSync AI Assistant. I can help you understand eligibility criteria, navigate government certificate procedures (like Tahsil Income or EWS certificates), and track application deadlines vs. government processing times.`,
      actionPlan: null,
    },
    {
      sender: 'ai',
      text: `Try asking one of the questions below or type your question:`,
      actionPlan: null,
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const starterQuestions = [
    "How do I get my Income Certificate and will I make the deadline?",
    "Which scholarships can I apply to right now with my 87% score?",
    "Why is Karnataka SSP showing criteria mismatch for me?",
    "What documents are needed for Reliance Foundation Scholarship?"
  ];

  const handleSendQuery = (queryText) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: q }];
    setMessages(newMessages);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "";
      let actionPlan = null;

      const lowerQ = q.toLowerCase();

      if (lowerQ.includes('income certificate') || lowerQ.includes('deadline')) {
        replyText = `Here is your step-by-step action plan to obtain your official Tahsildar Income Certificate in ${profile.personal.state}:`;
        actionPlan = {
          title: "Income Certificate Issuance vs. Nearest Scholarship Deadline (Reliance: 31 Oct)",
          timeStatus: "Time available", // or "Not enough time"
          daysRemaining: 17,
          processingDays: "7 to 10 working days",
          whereToApply: `Aaple Sarkar Portal (MahaOnline) or nearest CSC / Setu Kendra in ${profile.personal.district}`,
          steps: [
            "Gather Identity Proof (Aadhaar Card) & Ration Card / Electricity Bill.",
            "Obtain Salary Slip / Form 16 / Talathi Income Report from village/ward officer.",
            "Submit online application on aaplesarkar.mahaonline.gov.in (fee: ₹33.60).",
            "Verification by Circle Officer & digital sign by Naib Tahsildar within 7 days.",
            "Download digitally signed certificate and upload to your ScholarSync Document Vault."
          ],
          conclusion: "Status: TIME AVAILABLE! If you apply today, your certificate will arrive approximately 5 days before the Reliance Foundation deadline (31 Oct)."
        };
      } else if (lowerQ.includes('which scholarships') || lowerQ.includes('87%') || lowerQ.includes('apply')) {
        replyText = `Based on your academic score of ${profile.academic.academicScore}% and family income of ₹${(profile.preferences.familyAnnualIncome / 100000).toFixed(1)}L, you are in the top 90%+ match bracket for:`;
        actionPlan = {
          title: "Immediate High-Match Opportunities",
          timeStatus: "Time available",
          daysRemaining: 17,
          processingDays: "Instant 1-Click Vault Pre-fill",
          whereToApply: "ScholarSync Discovery Portal",
          steps: [
            "Reliance Foundation UG Scholarship (96% Match, Up to ₹2,00,000, 17 days left)",
            "Tata Trusts Higher Education Grant (94% Match, Up to ₹1,00,000, 32 days left)",
            "Central Sector Scheme of Scholarships (92% Match, ₹20,000/yr, 47 days left)",
            "Vidyasaarathi - ACC Cements (90% Match, ₹40,000/yr, 37 days left)"
          ],
          conclusion: "Your Document Vault already has 4 out of 5 required documents ready. You can apply right now!"
        };
      } else if (lowerQ.includes('karnataka') || lowerQ.includes('mismatch')) {
        replyText = `The Karnataka State SSP Scholarship shows a 40% match because it has strict state domicile criteria:`;
        actionPlan = {
          title: "Eligibility Breakdown Analysis",
          timeStatus: "State Ineligible",
          daysRemaining: 27,
          processingDays: "N/A",
          whereToApply: "MahaDBT (Maharashtra State Portal)",
          steps: [
            "Requirement: Candidate must be a permanent domicile of Karnataka state.",
            `Your Profile: Registered domicile is ${profile.personal.state}.`,
            "Better-fit alternative: Apply for Maharashtra MahaDBT Post-Matric or National Central Sector Scheme (NSP) where you are 100% eligible."
          ],
          conclusion: "Recommendation: Don't spend time on state-locked schemes outside your domicile. Focus on Reliance & NSP!"
        };
      } else {
        replyText = `I have analyzed your query against the national scholarship database. For ${profile.academic.currentCourse} students in ${profile.personal.state}, all required documents can be auto-attached directly from your Document Vault.`;
        actionPlan = {
          title: "General Guidance & Vault Status",
          timeStatus: "Time available",
          daysRemaining: 30,
          processingDays: "Instant Pre-fill",
          whereToApply: "National Scholarship Portal & Corporate Portals",
          steps: [
            "Review your Smart Match Analysis tab for criteria breakdown.",
            "Keep your Marksheet and Bonafide certificate updated.",
            "Use 1-Click Pre-fill to submit applications with zero repeated typing."
          ],
          conclusion: "ScholarSync AI is actively monitoring updates to eligibility guidelines."
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: replyText,
          actionPlan,
        }
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className={`flex flex-col bg-white ${
      isFloating 
        ? 'w-full sm:w-[420px] h-[580px] rounded-3xl border border-slate-200 shadow-2xl overflow-hidden' 
        : 'w-full max-w-4xl mx-auto rounded-3xl border border-slate-200 shadow-xs overflow-hidden my-8'
    }`}>
      
      {/* Header */}
      <div className="bg-[#2563EB] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm flex items-center gap-1.5">
              <span>ScholarSync AI Assistant</span>
              <span className="text-[10px] font-semibold bg-emerald-400 text-slate-900 px-1.5 py-0.2 rounded-full">
                ONLINE
              </span>
            </h3>
            <p className="text-[11px] text-blue-100">
              Instant action plans & deadline feasibility
            </p>
          </div>
        </div>

        {isFloating && onClose && (
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 text-xs">
        {messages.map((msg, index) => {
          const isUser = msg.sender === 'user';

          return (
            <div 
              key={index} 
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div 
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  isUser 
                    ? 'bg-[#2563EB] text-white font-medium rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>

              {/* Action Plan Card from AI */}
              {msg.actionPlan && (
                <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Step-by-Step Action Plan
                      </span>
                      <h4 className="font-bold text-slate-800 text-xs mt-0.5">
                        {msg.actionPlan.title}
                      </h4>
                    </div>

                    {/* Time Available / Not Enough Time Pill */}
                    <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1 shrink-0 ${
                      msg.actionPlan.timeStatus === 'Time available'
                        ? 'bg-emerald-50 text-[#16A34A] border-emerald-200'
                        : 'bg-rose-50 text-[#EF4444] border-rose-200'
                    }`}>
                      <Clock className="w-3 h-3" />
                      <span>{msg.actionPlan.timeStatus}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block">Processing Time:</span>
                      <span className="font-semibold text-slate-700">{msg.actionPlan.processingDays}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Days to Deadline:</span>
                      <span className="font-bold text-[#2563EB]">{msg.actionPlan.daysRemaining} days left</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-200">
                      <span className="text-slate-400 block">Where to Apply / Portal:</span>
                      <span className="font-semibold text-[#0D9488]">{msg.actionPlan.whereToApply}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="font-bold text-slate-700 text-[11px] block">Steps to execute:</span>
                    {msg.actionPlan.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-slate-600">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span className="leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-teal-50/60 border border-teal-200 text-[#0D9488] font-semibold text-[11px]">
                    ✓ {msg.actionPlan.conclusion}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-slate-200 w-28 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>

      {/* Starter Prompts (Zero horizontal scroll) */}
      <div className="p-2.5 sm:p-3 bg-white border-t border-slate-100 flex flex-wrap items-center gap-1.5 w-full">
        {starterQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendQuery(q)}
            className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-[#EFF6FF] border border-slate-200 hover:border-blue-200 text-slate-600 hover:text-[#2563EB] text-[11px] font-medium whitespace-nowrap cursor-pointer transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendQuery()}
          placeholder="Ask about certificates, deadlines, or eligibility..."
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
        />
        <button
          onClick={() => handleSendQuery()}
          className="p-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
