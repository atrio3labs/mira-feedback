import React from 'react';
import { LayoutDashboard, Map, History, Plus, LogOut } from 'lucide-react';

interface NavigationProps {
  onOpenModal: () => void;
  currentRoute: string;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Board', path: '/' },
  { icon: Map, label: 'Roadmap', path: '/roadmap' },
  { icon: History, label: 'Changelog', path: '/changelog' },
];

interface NavItemProps {
  icon: any;
  label: string;
  path: string;
  currentRoute: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, path, currentRoute }) => {
  // Normalize paths for comparison
  const normalizeHash = (hash: string) => hash.replace('#', '') || '/';
  const targetPath = path;
  const currentPath = normalizeHash(currentRoute);

  const isActive = currentPath === targetPath;

  return (
    <a 
      href={`#${path}`}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
        ${isActive 
          ? 'bg-zinc-900 text-white shadow-md shadow-zinc-200' 
          : 'text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm'
        }`}
    >
      <Icon size={20} strokeWidth={isActive ? 2 : 1.5} className="transition-transform duration-300 group-hover:scale-110" />
      <span className="font-medium tracking-wide hidden md:block">{label}</span>
    </a>
  );
};

export const Navigation: React.FC<NavigationProps> = ({ onOpenModal, currentRoute }) => {
  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-zinc-200/50 z-50 flex items-center px-4 justify-between">
         <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-zinc-900 font-sans">mira</span>
         </div>
         
         <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden">
           <img src="https://picsum.photos/40/40" alt="User" className="w-full h-full object-cover opacity-80" />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-glass-100 backdrop-blur-md border-r border-zinc-200/50 p-6 z-40">
        <div className="flex items-center gap-3 mb-10 px-4 pt-2">
          <div className="flex items-center gap-3">
             <span className="text-3xl font-bold tracking-tighter text-zinc-900 font-sans">mira</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} currentRoute={currentRoute} />
          ))}
        </nav>

        <button 
          onClick={onOpenModal}
          className="mt-auto mb-4 w-full bg-gradient-to-r from-zinc-900 to-zinc-700 hover:from-black hover:to-zinc-800 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 shadow-lg shadow-zinc-200 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={18} />
          <span className="font-light">New Feedback</span>
        </button>

        <div className="flex items-center gap-3 px-2 pt-4 border-t border-zinc-200/50">
          <img src="https://picsum.photos/40/40" alt="User" className="w-8 h-8 rounded-full border border-white shadow-sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-800 truncate">Alex D.</p>
            <p className="text-xs text-zinc-400 truncate">Admin</p>
          </div>
          <LogOut size={16} className="text-zinc-400 hover:text-zinc-600 cursor-pointer" />
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-zinc-200 pb-safe z-50">
        <div className="flex justify-around items-center p-2">
           {navItems.map((item) => {
             const Icon = item.icon;
             // Logic for mobile active state
             const normalizeHash = (hash: string) => hash.replace('#', '') || '/';
             const isActive = normalizeHash(currentRoute) === item.path;

             return (
               <a 
                 key={item.path}
                 href={`#${item.path}`}
                 className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors
                   ${isActive ? 'text-zinc-900' : 'text-zinc-400'}
                 `}
               >
                 <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                 <span className="text-[10px] font-medium">{item.label}</span>
               </a>
             );
           })}
           <button 
             onClick={onOpenModal}
             className="flex flex-col items-center gap-1 p-2 text-zinc-900"
           >
              <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center shadow-lg shadow-zinc-300">
                <Plus size={20} className="text-white" />
              </div>
           </button>
        </div>
      </div>
    </>
  );
};