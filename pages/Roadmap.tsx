import React from 'react';
import { useApp } from '../services/AppContext';
import { FeedbackStatus } from '../types';
import { FeedbackCard } from '../components/FeedbackCard';
import { CircleDot, Clock, CheckCircle2 } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const { feedback } = useApp();

  const getStatusItems = (status: FeedbackStatus) => 
    feedback.filter(item => item.status === status);

  const columns = [
    { 
      status: FeedbackStatus.PLANNED, 
      label: 'Planned', 
      icon: CircleDot,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      items: getStatusItems(FeedbackStatus.PLANNED) 
    },
    { 
      status: FeedbackStatus.IN_PROGRESS, 
      label: 'In Progress', 
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      items: getStatusItems(FeedbackStatus.IN_PROGRESS) 
    },
    { 
      status: FeedbackStatus.COMPLETED, 
      label: 'Completed', 
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      items: getStatusItems(FeedbackStatus.COMPLETED) 
    },
  ];

  return (
    <div className="h-full flex flex-col pb-24 md:pb-0">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-zinc-900 tracking-tight">Roadmap</h1>
        <p className="text-zinc-500 font-light mt-1">What we're working on.</p>
      </header>

      {/* Responsive Grid: Stacks on mobile, Columns on Desktop */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto pb-4">
        {columns.map((col) => {
          const Icon = col.icon;
          return (
            <div key={col.status} className="min-w-0 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4 sticky top-0 bg-[#f9fafb]/95 backdrop-blur z-10 py-2">
                <div className={`p-1.5 rounded-md ${col.bg}`}>
                  <Icon size={16} className={col.color} />
                </div>
                <h2 className="font-medium text-zinc-800">{col.label}</h2>
                <span className="ml-auto text-xs font-medium text-zinc-400 bg-white px-2 py-0.5 rounded-full border border-zinc-100">
                  {col.items.length}
                </span>
              </div>
              
              <div className="space-y-4 flex-1">
                {col.items.length > 0 ? (
                  col.items.map(item => (
                    <FeedbackCard key={item.id} item={item} compact />
                  ))
                ) : (
                  <div className="h-32 rounded-2xl border border-dashed border-zinc-200 flex items-center justify-center text-zinc-300 font-light text-sm">
                    No items
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};