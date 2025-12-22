import React from 'react';
import { ChevronUp, MessageCircle } from 'lucide-react';
import { FeedbackItem } from '../types';
import { Badge } from './Badge';
import { useApp } from '../services/AppContext';

interface FeedbackCardProps {
  item: FeedbackItem;
  compact?: boolean;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ item, compact = false }) => {
  const { voteFeedback, openFeedback, votedIds } = useApp();
  const hasVoted = votedIds.has(item.id);

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    voteFeedback(item.id);
  };

  return (
    <div 
      onClick={() => openFeedback(item.id)}
      className="group bg-white/70 backdrop-blur-xl border border-white/50 hover:border-zinc-200 rounded-2xl p-5 shadow-glass hover:shadow-glass-hover transition-all duration-300 flex gap-4 animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
    >
      <div className="flex flex-col items-center gap-1">
        <button 
          onClick={handleVote}
          className={`flex flex-col items-center justify-center w-10 h-12 md:w-12 md:h-14 border rounded-xl transition-all group-active:scale-95 ${
            hasVoted 
              ? 'bg-blue-50 border-blue-300 shadow-md' 
              : 'bg-white border-zinc-100 hover:border-zinc-300 hover:shadow-md'
          }`}
        >
          <ChevronUp size={20} className={hasVoted ? 'text-blue-600' : 'text-zinc-400 group-hover:text-zinc-600'} />
          <span className={`text-sm font-semibold ${hasVoted ? 'text-blue-600' : 'text-zinc-700'}`}>{item.votes}</span>
        </button>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base md:text-lg font-medium text-zinc-900 leading-tight group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          {compact && <Badge type="status" value={item.status} className="shrink-0" />}
        </div>
        
        <p className={`text-zinc-500 font-light text-sm md:text-base mb-3 leading-relaxed ${compact ? 'line-clamp-2' : ''}`}>
          {item.description}
        </p>

        <div className="flex items-center gap-3 md:gap-4 flex-wrap">
          {!compact && <Badge type="status" value={item.status} />}
          <Badge type="category" value={item.category} />
          
          <div className="flex items-center gap-1.5 text-zinc-400 text-xs md:text-sm ml-auto">
            <MessageCircle size={14} />
            <span>{item.comments.length}</span>
            <span className="hidden sm:inline">comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};