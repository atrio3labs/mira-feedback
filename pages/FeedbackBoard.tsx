import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useApp } from '../services/AppContext';
import { FeedbackCard } from '../components/FeedbackCard';
import { FeedbackCategory } from '../types';

export const FeedbackBoard: React.FC = () => {
  const { feedback } = useApp();
  const [filter, setFilter] = useState<'All' | FeedbackCategory>('All');
  const [search, setSearch] = useState('');

  const filteredData = feedback.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24 md:pb-8">
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-900 tracking-tight">Feedback</h1>
            <p className="text-zinc-500 font-light mt-1">Help us build the best product for you.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm p-1 rounded-xl border border-white/60 shadow-sm">
            {['All', ...Object.values(FeedbackCategory)].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-white text-zinc-900 shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-700 hover:bg-white/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search feedback..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl focus:bg-white focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-300 outline-none transition-all shadow-sm"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <FeedbackCard key={item.id} item={item} />
          ))
        ) : (
          <div className="text-center py-20 bg-white/30 rounded-2xl border border-dashed border-zinc-200">
            <Filter className="mx-auto text-zinc-300 mb-3" size={48} />
            <h3 className="text-lg font-medium text-zinc-900">No feedback found</h3>
            <p className="text-zinc-500 font-light">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};