import React, { useState, useRef } from 'react';
import { X, ChevronUp, MessageCircle, Send, Pencil, Trash2, Check, Paperclip, X as XIcon } from 'lucide-react';
import { useApp } from '../services/AppContext';
import { Badge } from './Badge';
import { Attachment } from '../types';

export const FeedbackDetailModal: React.FC = () => {
  const { selectedFeedbackId, feedback, closeFeedback, voteFeedback, addComment, editComment, deleteComment, votedIds } = useApp();
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [commentAttachments, setCommentAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const item = feedback.find(f => f.id === selectedFeedbackId);

  if (!selectedFeedbackId || !item) return null;

  const hasVoted = votedIds.has(item.id);

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    voteFeedback(item.id);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() && commentAttachments.length === 0) return;
    addComment(item.id, commentText, "User", commentAttachments);
    setCommentText('');
    setCommentAttachments([]);
  };

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
        setCommentAttachments(prev => [...prev, newAttachment]);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (id: string) => {
    setCommentAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleEditStart = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleEditSave = () => {
    if (!editingCommentId || !editingContent.trim()) return;
    editComment(item.id, editingCommentId, editingContent);
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleDelete = (commentId: string) => {
    deleteComment(item.id, commentId);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center md:items-start md:pt-20 p-4">
      <div 
        className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm transition-opacity" 
        onClick={closeFeedback}
      />
      
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-zinc-100 flex gap-6">
          <div className="flex flex-col items-center gap-1 pt-1">
             <button 
              onClick={handleVote}
              className={`flex flex-col items-center justify-center w-12 h-14 border rounded-xl transition-all active:scale-95 ${
                hasVoted 
                  ? 'bg-blue-50 border-blue-300 shadow-md' 
                  : 'bg-zinc-50 border-zinc-200 hover:border-zinc-400 hover:shadow-md'
              }`}
            >
              <ChevronUp size={24} className={hasVoted ? 'text-blue-600' : 'text-zinc-500'} />
              <span className={`text-sm font-semibold ${hasVoted ? 'text-blue-600' : 'text-zinc-900'}`}>{item.votes}</span>
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
               <h2 className="text-2xl font-semibold text-zinc-900 leading-tight mb-2">{item.title}</h2>
               <button 
                  onClick={closeFeedback}
                  className="p-2 -mr-2 -mt-2 text-zinc-400 hover:text-zinc-800 transition-colors rounded-full hover:bg-zinc-100"
                >
                  <X size={20} />
                </button>
            </div>
            
            <div className="flex gap-2 mb-4">
              <Badge type="status" value={item.status} />
              <Badge type="category" value={item.category} />
            </div>

            <p className="text-zinc-600 font-light leading-relaxed text-lg">
              {item.description}
            </p>
            {item.attachments && item.attachments.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.attachments.map(att => (
                  <a
                    key={att.id}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-zinc-100 rounded-lg text-sm text-zinc-600 hover:bg-zinc-200 transition-colors"
                  >
                    <Paperclip size={14} />
                    <span className="truncate max-w-[150px]">{att.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 bg-zinc-50/50 flex-1">
          <h3 className="text-sm font-semibold text-zinc-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <MessageCircle size={16} />
            Discussion ({item.comments.length})
          </h3>

          <div className="space-y-6">
            {item.comments.length > 0 ? (
              item.comments.map(comment => (
                <div key={comment.id} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center text-xs font-bold text-zinc-600 shrink-0">
                    {comment.author.charAt(0)}
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100 flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-zinc-900 text-sm">{comment.author}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-400">{new Date(comment.timestamp).toLocaleDateString()}</span>
                        {comment.author === "User" && (
                          <div className="flex gap-1">
                            {editingCommentId === comment.id ? (
                              <button
                                onClick={handleEditSave}
                                className="p-1 text-green-500 hover:text-green-700 transition-colors"
                              >
                                <Check size={14} />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleEditStart(comment.id, comment.content)}
                                className="p-1 text-zinc-400 hover:text-zinc-600 transition-colors"
                              >
                                <Pencil size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(comment.id)}
                              className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {editingCommentId === comment.id ? (
                      <input
                        type="text"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleEditSave()}
                        className="w-full px-2 py-1 text-sm border border-zinc-200 rounded focus:outline-none focus:border-zinc-400"
                        autoFocus
                      />
                    ) : (
                      <>
                        <p className="text-zinc-600 font-light text-sm">{comment.content}</p>
                        {comment.attachments && comment.attachments.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {comment.attachments.map(att => (
                              <a
                                key={att.id}
                                href={att.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 px-2 py-1 bg-zinc-100 rounded text-xs text-zinc-600 hover:bg-zinc-200 transition-colors"
                              >
                                <Paperclip size={12} />
                                <span className="truncate max-w-[100px]">{att.name}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-400 text-sm py-4 italic">No comments yet. Be the first!</p>
            )}
          </div>
        </div>

        {/* Footer / Input */}
        <div className="p-4 bg-white border-t border-zinc-200">
          {commentAttachments.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {commentAttachments.map(att => (
                <div key={att.id} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-lg text-sm text-zinc-700">
                  <span className="truncate max-w-[150px]">{att.name}</span>
                  <button type="button" onClick={() => removeAttachment(att.id)} className="text-zinc-400 hover:text-zinc-600">
                    <XIcon size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleCommentSubmit} className="relative flex items-center gap-2">
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
              className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <Paperclip size={18} />
            </button>
            <input 
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 pl-4 pr-12 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 outline-none transition-all"
            />
            <button 
              type="submit"
              disabled={!commentText.trim() && commentAttachments.length === 0}
              className="p-2 text-zinc-400 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-zinc-400 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};