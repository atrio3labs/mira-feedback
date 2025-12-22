import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FeedbackItem, ChangelogEntry, FeedbackStatus, FeedbackCategory, Comment, Attachment } from '../types';
import { INITIAL_FEEDBACK, INITIAL_CHANGELOG } from './mockData';

interface AppContextType {
  feedback: FeedbackItem[];
  changelog: ChangelogEntry[];
  selectedFeedbackId: string | null;
  votedIds: Set<string>;
  addFeedback: (title: string, description: string, category: FeedbackCategory, attachments?: Attachment[]) => void;
  voteFeedback: (id: string) => void;
  updateStatus: (id: string, status: FeedbackStatus) => void;
  openFeedback: (id: string) => void;
  closeFeedback: () => void;
  addComment: (feedbackId: string, content: string, author: string, attachments?: Attachment[]) => void;
  editComment: (feedbackId: string, commentId: string, content: string) => void;
  deleteComment: (feedbackId: string, commentId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>(INITIAL_FEEDBACK);
  const [changelog] = useState<ChangelogEntry[]>(INITIAL_CHANGELOG);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  const addFeedback = (title: string, description: string, category: FeedbackCategory, attachments?: Attachment[]) => {
    const newItem: FeedbackItem = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      status: FeedbackStatus.OPEN,
      category,
      votes: 1,
      comments: [],
      createdAt: new Date().toISOString(),
      attachments: attachments || []
    };
    setFeedback([newItem, ...feedback]);
  };

  const voteFeedback = (id: string) => {
    const hasVoted = votedIds.has(id);
    setFeedback(prev => prev.map(item => 
      item.id === id ? { ...item, votes: item.votes + (hasVoted ? -1 : 1) } : item
    ));
    setVotedIds(prev => {
      const newSet = new Set(prev);
      if (hasVoted) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const updateStatus = (id: string, status: FeedbackStatus) => {
    setFeedback(prev => prev.map(item => 
      item.id === id ? { ...item, status } : item
    ));
  };

  const openFeedback = (id: string) => setSelectedFeedbackId(id);
  const closeFeedback = () => setSelectedFeedbackId(null);

  const addComment = (feedbackId: string, content: string, author: string, attachments?: Attachment[]) => {
    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      author,
      content,
      timestamp: new Date().toISOString(),
      attachments: attachments || []
    };

    setFeedback(prev => prev.map(item => 
      item.id === feedbackId 
        ? { ...item, comments: [...item.comments, newComment] }
        : item
    ));
  };

  const editComment = (feedbackId: string, commentId: string, content: string) => {
    setFeedback(prev => prev.map(item => 
      item.id === feedbackId 
        ? { ...item, comments: item.comments.map(c => c.id === commentId ? { ...c, content } : c) }
        : item
    ));
  };

  const deleteComment = (feedbackId: string, commentId: string) => {
    setFeedback(prev => prev.map(item => 
      item.id === feedbackId 
        ? { ...item, comments: item.comments.filter(c => c.id !== commentId) }
        : item
    ));
  };

  return (
    <AppContext.Provider value={{ 
      feedback, 
      changelog, 
      selectedFeedbackId,
      votedIds,
      addFeedback, 
      voteFeedback, 
      updateStatus,
      openFeedback,
      closeFeedback,
      addComment,
      editComment,
      deleteComment
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};