import React, { useState } from 'react';
import Modal from './Modal';
import { getResumeFileUrl } from '../utils/fileUrl';
import { ExternalLink, Download, FileText, AlertCircle, Eye } from 'lucide-react';

const ResumePreviewModal = ({
  isOpen,
  onClose,
  resumeUrl,
  title = 'Resume Document Preview'
}) => {
  const [iframeError, setIframeError] = useState(false);

  if (!isOpen || !resumeUrl) return null;

  const fileUrl = getResumeFileUrl(resumeUrl);
  const isPdf = resumeUrl.toLowerCase().endsWith('.pdf');
  const isDoc =
    resumeUrl.toLowerCase().endsWith('.doc') ||
    resumeUrl.toLowerCase().endsWith('.docx');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-4">
        {/* Top Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span className="text-xs font-mono font-medium text-slate-700 truncate">
              {resumeUrl}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              Open in New Tab
            </a>

            <a
              href={fileUrl}
              download={resumeUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </a>
          </div>
        </div>

        {/* Content Viewer */}
        {isPdf ? (
          <div className="relative w-full h-[68vh] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex flex-col">
            {iframeError ? (
              <div className="m-auto text-center p-6">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-800">Preview Unavailable Inline</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Your browser could not render the PDF in the embedded viewer.
                </p>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Browser Tab
                </a>
              </div>
            ) : (
              <iframe
                src={fileUrl}
                title="PDF Resume Preview"
                className="w-full h-full border-0"
                onError={() => setIframeError(true)}
              />
            )}
          </div>
        ) : isDoc ? (
          <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-xl my-4">
            <div className="w-14 h-14 mx-auto mb-3 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
              <FileText className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Microsoft Word Document (.docx / .doc)</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
              Web browsers cannot preview Microsoft Word documents inline. Please download the document to view it in Word, Google Docs, or LibreOffice.
            </p>
            <a
              href={fileUrl}
              download={resumeUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download {resumeUrl}
            </a>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-500">
            Unsupported file type for preview. You can still download the file using the button above.
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ResumePreviewModal;
