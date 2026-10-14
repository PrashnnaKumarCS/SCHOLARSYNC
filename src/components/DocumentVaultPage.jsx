import React, { useState } from 'react';
import { useScholar } from '../context/ScholarContext';
import { 
  FolderLock, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Eye, 
  Trash2, 
  ShieldCheck, 
  Sparkles, 
  FileCheck2,
  RefreshCw,
  ExternalLink,
  Download,
  Info
} from 'lucide-react';

export default function DocumentVaultPage() {
  const { documents, uploadDocument, removeDocument, profileCompleteness, navigateToPage, showToast } = useScholar();
  const [activeUploadDocId, setActiveUploadDocId] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);

  const addedCount = documents.filter((d) => d.status === 'Added').length;
  const missingCount = documents.filter((d) => d.status === 'Missing').length;

  const handleSimulateUpload = (docId) => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      const doc = documents.find((d) => d.id === docId);
      const fakeName = `${doc?.name.replace(/\s+/g, '_')}_Official_2026.pdf`;
      uploadDocument(docId, { name: fakeName, size: 1024 * 1024 * 1.3 });
      setIsSimulatingUpload(false);
      setActiveUploadDocId(null);
    }, 900);
  };

  const handleFileChange = (e, docId) => {
    const file = e.target.files[0];
    if (file) {
      uploadDocument(docId, { name: file.name, size: file.size });
      setActiveUploadDocId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-[#0D9488] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              One-Time Upload • Auto Pre-fill Everywhere
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Encrypted Student Document Repository
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">
            Document Vault
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Upload your verified documents once. When applying for scholarships, ScholarSync automatically attaches them from your vault so you never re-upload.
          </p>
        </div>

        <button
          onClick={() => navigateToPage('scholarships')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm shadow-xs transition-all cursor-pointer self-start md:self-auto"
        >
          <span>Find Eligible Scholarships</span>
        </button>
      </div>

      {/* Vault Status Overview Banner */}
      <div className="mb-8 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold">
                <FolderLock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1E293B] flex items-center gap-2">
                  <span>Vault Readiness: {addedCount} of {documents.length} Uploaded</span>
                  {missingCount === 0 ? (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200">
                      100% Vaulted
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-[#EF4444] border border-rose-200">
                      {missingCount} Missing Document
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500">
                  {missingCount === 0
                    ? 'All required certificates are present. You can apply to all Indian scholarships in 1 click!'
                    : 'Upload your Community Certificate to qualify for category reservations and social welfare schemes.'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Counter Pills */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-[#16A34A] text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>{addedCount} Added</span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-rose-50/80 border border-rose-200 text-[#EF4444] text-xs font-bold">
              <AlertCircle className="w-4 h-4" />
              <span>{missingCount} Missing</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
              <span>DigiLocker Synced</span>
            </div>
          </div>

        </div>

        {/* Vault Progress Bar */}
        <div className="mt-5 w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500 bg-[#16A34A]"
            style={{ width: `${(addedCount / documents.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Document Grid (5 Required Documents) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => {
          const isAdded = doc.status === 'Added';

          return (
            <div 
              key={doc.id}
              className={`rounded-3xl border transition-all duration-200 p-6 flex flex-col justify-between ${
                isAdded 
                  ? 'bg-white border-slate-200 shadow-xs hover:border-slate-300' 
                  : 'bg-rose-50/20 border-rose-200 shadow-xs hover:border-rose-300'
              }`}
            >
              <div>
                
                {/* Header Tag & Status */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    {doc.category}
                  </span>

                  {isAdded ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Added</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEE2E2] text-[#EF4444] border border-[#FCA5A5]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Missing</span>
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold text-[#1E293B] mb-1">
                  {doc.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {doc.description}
                </p>

                {/* Metadata when Added */}
                {isAdded ? (
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">File Name:</span>
                      <span className="font-semibold text-slate-800 truncate max-w-[150px]" title={doc.fileName}>
                        {doc.fileName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">File Size:</span>
                      <span className="text-slate-700 font-medium">{doc.fileSize}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Uploaded:</span>
                      <span className="text-slate-700 font-medium">{doc.uploadedDate}</span>
                    </div>

                    {doc.verificationAgency && (
                      <div className="pt-1.5 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-semibold text-[#0D9488]">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{doc.verificationAgency}</span>
                      </div>
                    )}

                    {doc.expiryDate && (
                      <div className="text-[10px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Valid through {doc.expiryDate}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/60 mb-4 space-y-1.5">
                    <p className="text-xs font-semibold text-rose-800 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />
                      <span>Not attached to your Vault yet</span>
                    </p>
                    <p className="text-[11px] text-rose-600 leading-snug">
                      Required for state quota scholarships and central SC/ST/OBC/EWS fee waivers.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                {isAdded ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-[#1E293B] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => setActiveUploadDocId(doc.id)}
                      className="py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center justify-center transition-colors cursor-pointer"
                      title="Replace file"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="py-2 px-3 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 text-xs font-semibold text-slate-400 hover:text-[#EF4444] flex items-center justify-center transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveUploadDocId(doc.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload {doc.name}</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Info Notice: Reuse Across Applications */}
      <div className="mt-10 p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#2563EB] flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-6 h-6 text-[#2563EB]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#1E293B]">
              Reusable Across Every Single Application
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Once a certificate is marked as <strong>Added</strong>, ScholarSync binds it to your verified applicant ID. You will never have to compress PDFs or hunt for documents again.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateToPage('scholarships')}
          className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs whitespace-nowrap cursor-pointer transition-colors"
        >
          Check Scholarships for You →
        </button>
      </div>

      {/* UPLOAD MODAL */}
      {activeUploadDocId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FolderLock className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-bold text-base text-[#1E293B]">
                  Upload {documents.find((d) => d.id === activeUploadDocId)?.name}
                </h3>
              </div>
              <button 
                onClick={() => setActiveUploadDocId(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Please upload a clear scanned copy in PDF or JPG format (Max size: 5 MB).
            </p>

            {/* Drag & Drop Simulation Area */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-blue-400 hover:bg-blue-50/20 transition-all">
              <input
                type="file"
                id="vault-file-input"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, activeUploadDocId)}
              />
              <label 
                htmlFor="vault-file-input" 
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-[#1E293B]">
                  Click to choose file from computer
                </div>
                <div className="text-[11px] text-slate-400">
                  Supports PDF, JPEG, PNG up to 5MB
                </div>
              </label>
            </div>

            {/* Instant Demo Simulation Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                disabled={isSimulatingUpload}
                onClick={() => handleSimulateUpload(activeUploadDocId)}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isSimulatingUpload ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying Document OCR...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Simulate Instant DigiLocker Upload</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveUploadDocId(null)}
                className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#16A34A]" />
                <h3 className="font-bold text-base text-[#1E293B]">
                  {previewDoc.name} - Vault Preview
                </h3>
              </div>
              <button 
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Document:</span>
                <span className="font-semibold text-slate-800">{previewDoc.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">File Size:</span>
                <span className="text-slate-700">{previewDoc.fileSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Source:</span>
                <span className="text-[#0D9488] font-semibold">{previewDoc.verificationAgency}</span>
              </div>
            </div>

            {/* Mock Certificate Preview Canvas */}
            <div className="border border-slate-200 rounded-2xl p-6 bg-white text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">Official Government Seal / Institute Certified</p>
                <p className="text-[11px] text-slate-500">Ref: SCH-VLT-2026-IND-0984</p>
              </div>
              <div className="text-[11px] text-[#16A34A] font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                ✓ Verified & Validated by DigiLocker API
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => {
                  showToast(`Downloaded ${previewDoc.fileName}`);
                  setPreviewDoc(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Copy</span>
              </button>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
