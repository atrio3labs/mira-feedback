import React from 'react';
import { FeedbackStatus, FeedbackCategory } from '../types';

interface BadgeProps {
  type: 'status' | 'category';
  value: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, value, className = '' }) => {
  let styles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ";
  
  if (type === 'status') {
    switch (value) {
      case FeedbackStatus.PLANNED:
        styles += "bg-blue-50 text-blue-700 border-blue-100";
        break;
      case FeedbackStatus.IN_PROGRESS:
        styles += "bg-amber-50 text-amber-700 border-amber-100";
        break;
      case FeedbackStatus.COMPLETED:
        styles += "bg-emerald-50 text-emerald-700 border-emerald-100";
        break;
      case FeedbackStatus.OPEN:
      default:
        styles += "bg-zinc-100 text-zinc-600 border-zinc-200";
        break;
    }
  } else {
    // Category
    switch (value) {
      case FeedbackCategory.BUG:
        styles += "bg-red-50 text-red-600 border-red-100";
        break;
      case FeedbackCategory.FEATURE:
        styles += "bg-violet-50 text-violet-600 border-violet-100";
        break;
      case FeedbackCategory.IMPROVEMENT:
        styles += "bg-sky-50 text-sky-600 border-sky-100";
        break;
      default:
        styles += "bg-zinc-50 text-zinc-500 border-zinc-200";
    }
  }

  return (
    <span className={`${styles} ${className}`}>
      {value}
    </span>
  );
};