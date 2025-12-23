import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Paperclip, X as XIcon } from 'lucide-react';
import { FeedbackCategory, Attachment } from '../types';
import { useApp } from '../services/AppContext';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const { addFeedback } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FeedbackCategory>(FeedbackCategory.FEATURE);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [bugStep, setBugStep] = useState(0);
  const [bugSummary, setBugSummary] = useState('');
  const [bugIntent, setBugIntent] = useState('');
  const [bugActual, setBugActual] = useState('');
  const [bugExpected, setBugExpected] = useState('');
  const [bugFrequency, setBugFrequency] = useState('');
  const [bugSteps, setBugSteps] = useState('');
  const [bugReproducible, setBugReproducible] = useState('');
  const [bugAppVersion, setBugAppVersion] = useState('');
  const [bugDeviceBrowser, setBugDeviceBrowser] = useState('');
  const [bugOsVersion, setBugOsVersion] = useState('');
  const [bugErrorMessage, setBugErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isBugFlow = category === FeedbackCategory.BUG;

  const bugFlowSteps = useMemo(() => ([
    { id: 'core', label: 'Core details' },
    { id: 'repro', label: 'Reproduction' },
    { id: 'env', label: 'Environment' },
    { id: 'evidence', label: 'Evidence' }
  ]), []);

  useEffect(() => {
    if (!isBugFlow) setBugStep(0);
  }, [isBugFlow]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const newAttachment: Attachment = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          url: reader.result as string,
          type: file.type
        };
        setAttachments(prev => [...prev, newAttachment]);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isBugFlow) {
      const requiredFields = [
        bugSummary,
        bugIntent,
        bugActual,
        bugExpected,
        bugFrequency,
        bugSteps,
        bugReproducible,
        bugAppVersion,
        bugDeviceBrowser,
        bugOsVersion
      ];
      if (requiredFields.some((field) => !field.trim())) return;

      const bugDescription = [
        `What were you trying to do?\n${bugIntent}`,
        `What actually happened?\n${bugActual}`,
        `What did you expect to happen?\n${bugExpected}`,
        `How often does this happen?\n${bugFrequency}`,
        `Steps to reproduce:\n${bugSteps}`,
        `Can you reproduce it consistently?\n${bugReproducible}`,
        `App version: ${bugAppVersion}`,
        `Device / Browser: ${bugDeviceBrowser}`,
        `OS version: ${bugOsVersion}`,
        bugErrorMessage.trim() ? `Error message or code:\n${bugErrorMessage}` : ''
      ]
        .filter(Boolean)
        .join('\n\n');

      addFeedback(bugSummary, bugDescription, category, attachments);
    } else {
      if (!title.trim() || !description.trim()) return;
      addFeedback(title, description, category, attachments);
    }

    setTitle('');
    setDescription('');
    setAttachments([]);
    setBugStep(0);
    setBugSummary('');
    setBugIntent('');
    setBugActual('');
    setBugExpected('');
    setBugFrequency('');
    setBugSteps('');
    setBugReproducible('');
    setBugAppVersion('');
    setBugDeviceBrowser('');
    setBugOsVersion('');
    setBugErrorMessage('');
    onClose();
  };

  const canAdvanceBugStep = () => {
    if (bugStep === 0) {
      return Boolean(bugSummary.trim() && bugIntent.trim() && bugActual.trim() && bugExpected.trim());
    }
    if (bugStep === 1) {
      return Boolean(bugFrequency.trim() && bugSteps.trim() && bugReproducible.trim());
    }
    if (bugStep === 2) {
      return Boolean(bugAppVersion.trim() && bugDeviceBrowser.trim() && bugOsVersion.trim());
    }
    return true;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-zinc-400 hover:text-zinc-800 transition-colors rounded-full hover:bg-zinc-100"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-zinc-900 mb-2">Submit Feedback</h2>
        <p className="text-zinc-500 mb-6 font-light">Help us improve the product by sharing your ideas.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Category</label>
            <div className="flex gap-2">
              {Object.values(FeedbackCategory).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all border ${
                    category === cat 
                      ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' 
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {isBugFlow ? (
            <>
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-zinc-400">
                <span>Step {bugStep + 1} of {bugFlowSteps.length}</span>
                <span>{bugFlowSteps[bugStep].label}</span>
              </div>

              {bugStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Brief summary</label>
                    <input
                      type="text"
                      value={bugSummary}
                      onChange={(e) => setBugSummary(e.target.value)}
                      placeholder="App crashes when I tap ‘Save’ on a new task."
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">What were you trying to do?</label>
                    <textarea
                      value={bugIntent}
                      onChange={(e) => setBugIntent(e.target.value)}
                      placeholder="What were you trying to accomplish when the issue happened?"
                      rows={3}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">What actually happened?</label>
                    <textarea
                      value={bugActual}
                      onChange={(e) => setBugActual(e.target.value)}
                      placeholder="What happened instead of what you expected?"
                      rows={3}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">What did you expect to happen?</label>
                    <textarea
                      value={bugExpected}
                      onChange={(e) => setBugExpected(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {bugStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">How often does this happen?</label>
                    <select
                      value={bugFrequency}
                      onChange={(e) => setBugFrequency(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
                    >
                      <option value="">Select frequency</option>
                      <option value="Every time">Every time</option>
                      <option value="Often">Often</option>
                      <option value="Sometimes">Sometimes</option>
                      <option value="Once">Once</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Steps to reproduce</label>
                    <textarea
                      value={bugSteps}
                      onChange={(e) => setBugSteps(e.target.value)}
                      placeholder={`Open the app\nGo to Settings\nTap “Sync”\nApp freezes`}
                      rows={4}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Can you reproduce it consistently?</label>
                    <select
                      value={bugReproducible}
                      onChange={(e) => setBugReproducible(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
                    >
                      <option value="">Select an option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Not sure">Not sure</option>
                    </select>
                  </div>
                </div>
              )}

              {bugStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">App version</label>
                    <input
                      type="text"
                      value={bugAppVersion}
                      onChange={(e) => setBugAppVersion(e.target.value)}
                      placeholder="What app version are you using?"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Device / Browser</label>
                    <input
                      type="text"
                      value={bugDeviceBrowser}
                      onChange={(e) => setBugDeviceBrowser(e.target.value)}
                      placeholder="iPhone 15 / Pixel 8, Chrome / Safari / Edge"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">OS version</label>
                    <input
                      type="text"
                      value={bugOsVersion}
                      onChange={(e) => setBugOsVersion(e.target.value)}
                      placeholder="e.g. iOS 18.1, macOS 15, Windows 11"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
                    />
                  </div>

                </div>
              )}

              {bugStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Screenshots or screen recordings</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.txt"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg text-sm text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 transition-all"
                    >
                      <Paperclip size={16} />
                      Add files
                    </button>
                    {attachments.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {attachments.map(att => (
                          <div key={att.id} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-lg text-sm text-zinc-700">
                            <span className="truncate max-w-[150px]">{att.name}</span>
                            <button type="button" onClick={() => removeAttachment(att.id)} className="text-zinc-400 hover:text-zinc-600">
                              <XIcon size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Error messages or codes</label>
                    <textarea
                      value={bugErrorMessage}
                      onChange={(e) => setBugErrorMessage(e.target.value)}
                      placeholder="Did you see an error message? If so, please copy it here."
                      rows={3}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
                <input 
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Short, descriptive title"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain your idea or issue..."
                  rows={4}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Attachments</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg text-sm text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 transition-all"
                >
                  <Paperclip size={16} />
                  Add files
                </button>
                {attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {attachments.map(att => (
                      <div key={att.id} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-lg text-sm text-zinc-700">
                        <span className="truncate max-w-[150px]">{att.name}</span>
                        <button type="button" onClick={() => removeAttachment(att.id)} className="text-zinc-400 hover:text-zinc-600">
                          <XIcon size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            {isBugFlow && bugStep > 0 && (
              <button
                type="button"
                onClick={() => setBugStep(prev => Math.max(0, prev - 1))}
                className="px-5 py-2.5 border border-zinc-200 text-zinc-700 hover:bg-zinc-50 rounded-xl transition-colors font-medium"
              >
                Back
              </button>
            )}
            {isBugFlow && bugStep < bugFlowSteps.length - 1 ? (
              <button
                type="button"
                onClick={() => setBugStep(prev => Math.min(bugFlowSteps.length - 1, prev + 1))}
                className="px-5 py-2.5 bg-zinc-900 hover:bg-black text-white rounded-xl shadow-lg shadow-zinc-200 transition-all transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={!canAdvanceBugStep()}
              >
                Next
              </button>
            ) : (
              <button 
                type="submit"
                className="px-5 py-2.5 bg-zinc-900 hover:bg-black text-white rounded-xl shadow-lg shadow-zinc-200 transition-all transform hover:scale-105 font-medium"
                disabled={isBugFlow && !canAdvanceBugStep()}
              >
                Submit Feedback
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
