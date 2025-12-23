import React, { useEffect, useState } from 'react';
import { ChevronDown, Link } from 'lucide-react';
import { useApp } from '../services/AppContext';

interface AccordionProps {
  title: string;
  sectionId: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, sectionId, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div id={sectionId} className="border-b border-zinc-200 last:border-b-0">
      <a
        href={`#/changelog?section=${sectionId}`}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium no-underline hover:text-zinc-700"
        aria-expanded={isOpen}
        aria-controls={`${sectionId}-content`}
      >
        {title}
        <ChevronDown
          size={16}
          className={`text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </a>
      {isOpen && (
        <div id={`${sectionId}-content`} className="pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

const renderTextWithBold = (text: string) => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => 
    i % 2 === 1 ? <strong key={i} className="font-semibold text-zinc-900">{part}</strong> : part
  );
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const Changelog: React.FC = () => {
  const { changelog } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const scrollToSection = () => {
      const hash = window.location.hash || '';
      const [route, queryString] = hash.split('?');
      if (route !== '#/changelog') return;
      const params = new URLSearchParams(queryString);
      const sectionId = params.get('section');
      if (!sectionId) return;
      const target = document.getElementById(sectionId);
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    };

    scrollToSection();
    window.addEventListener('hashchange', scrollToSection);
    return () => window.removeEventListener('hashchange', scrollToSection);
  }, []);

  const filteredChangelog = changelog.filter(entry => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(query) ||
      entry.tags.some(tag => tag.toLowerCase().includes(query)) ||
      entry.version.toLowerCase().includes(query) ||
      entry.highlights?.some(h => h.toLowerCase().includes(query)) ||
      entry.features?.some(f => f.toLowerCase().includes(query)) ||
      entry.bugFixes?.some(b => b.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Header with Search */}
      <div className="max-w-5xl mx-auto mb-8 flex items-center justify-between">
        <div />
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search changelog..."
            className="w-64 pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {filteredChangelog.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">
              No changelog entries match your search.
            </div>
          ) : (
            filteredChangelog.map((entry) => {
              const titleSlug = slugify(entry.title);
              const entrySectionId = titleSlug || entry.id;

              return (
                <div key={entry.id} className="relative">
                  <div className="flex flex-col md:flex-row gap-y-6">
                    {/* Left side - Date and Version */}
                    <div className="md:w-48 flex-shrink-0">
                      <div className="md:sticky md:top-8 pb-10">
                        <time className="text-sm font-medium text-zinc-500 block mb-3">
                          {entry.date}
                        </time>
                        <div className="inline-flex relative z-10 items-center justify-center w-10 h-10 text-zinc-900 border border-zinc-200 rounded-lg text-sm font-bold bg-white">
                          {entry.version}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="flex-1 md:pl-8 relative pb-10">
                      {/* Vertical timeline line */}
                      <div className="hidden md:block absolute top-2 left-0 w-px h-full bg-zinc-200">
                        {/* Timeline dot */}
                        <div className="hidden md:block absolute -translate-x-1/2 w-3 h-3 bg-zinc-900 rounded-full z-10" />
                      </div>

                      <div className="space-y-6">
                        {/* Title and Tags */}
                        <div className="relative z-10 flex flex-col gap-2">
                          <h2 id={entrySectionId} className="text-2xl font-semibold tracking-tight text-zinc-900">
                            <a
                              href={`#/changelog?section=${entrySectionId}`}
                              className="inline-flex items-center gap-2 no-underline hover:text-zinc-700"
                              aria-label={`Link to ${entry.title}`}
                            >
                              {entry.title}
                              <Link size={16} className="text-zinc-400" />
                            </a>
                          </h2>

                          {entry.tags && entry.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {entry.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="h-6 w-fit px-2 text-xs font-medium bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200 flex items-center justify-center"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Highlights */}
                        {entry.highlights && entry.highlights.length > 0 && (
                          <div className="prose prose-zinc max-w-none">
                            <ul className="list-disc space-y-1 pl-4 text-zinc-600">
                              {entry.highlights.map((item, idx) => (
                                <li key={idx}>{renderTextWithBold(item)}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Accordion sections */}
                        {((entry.features && entry.features.length > 0) || (entry.bugFixes && entry.bugFixes.length > 0)) && (
                          <div className="border-t border-zinc-200">
                            {entry.features && entry.features.length > 0 && (
                              <Accordion sectionId={`${entrySectionId}-features`} title="Features">
                                <ul className="list-disc space-y-2 pl-4 text-zinc-600 text-sm">
                                  {entry.features.map((item, idx) => (
                                    <li key={idx}>{renderTextWithBold(item)}</li>
                                  ))}
                                </ul>
                              </Accordion>
                            )}

                            {entry.bugFixes && entry.bugFixes.length > 0 && (
                              <Accordion sectionId={`${entrySectionId}-bug-fixes`} title="Bug Fixes">
                                <ul className="list-disc space-y-2 pl-4 text-zinc-600 text-sm">
                                  {entry.bugFixes.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </Accordion>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
