import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'favorites' | 'tv' | 'schedule' | 'search';

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = time.getHours().toString().padStart(2, '0');
  const mm = time.getMinutes().toString().padStart(2, '0');
  const ss = time.getSeconds().toString().padStart(2, '0');
  const date = time.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="hidden sm:flex flex-col items-end select-none">
      <div className="flex items-center gap-1 font-mono text-sm font-semibold tracking-widest" style={{ color: 'hsl(25,100%,60%)' }}>
        <span>{hh}</span>
        <span className="opacity-60 animate-pulse">:</span>
        <span>{mm}</span>
        <span className="opacity-60 animate-pulse">:</span>
        <span style={{ color: 'hsl(0,0%,50%)' }}>{ss}</span>
      </div>
      <div className="text-xs capitalize" style={{ color: 'hsl(0,0%,45%)' }}>{date}</div>
    </div>
  );
}

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'tv', label: 'ТВ-каналы', icon: 'Tv' },
  { id: 'schedule', label: 'Программа', icon: 'CalendarDays' },
  { id: 'favorites', label: 'Избранное', icon: 'Heart' },
  { id: 'search', label: 'Поиск', icon: 'Search' },
];

export default function Navbar({ currentPage, onNavigate, searchQuery, onSearchChange }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'linear-gradient(to bottom, rgba(8,10,15,0.98) 0%, rgba(8,10,15,0.85) 100%)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 gap-8">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, hsl(25,100%,55%), hsl(0,90%,58%))' }}>
              🎬
            </div>
            <span className="font-oswald font-bold text-xl tracking-wide text-white">
              ПОЕХАЛИ<span style={{ color: 'hsl(25,100%,55%)' }}>.КИНО</span>
            </span>
          </button>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`nav-link flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-white active'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon name={item.icon} size={15} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search bar (inline when on search page) */}
          {currentPage === 'search' && (
            <div className="flex-1 max-w-md relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                autoFocus
                type="text"
                placeholder="Фильмы, сериалы, каналы..."
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-orange-500"
                style={{ background: 'hsl(220,14%,14%)', border: '1px solid hsl(220,14%,20%)' }}
              />
            </div>
          )}

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-4">
            <LiveClock />
            <button
              onClick={() => onNavigate('search')}
              className={`md:hidden p-2 rounded-lg transition-colors ${currentPage === 'search' ? 'text-orange-400' : 'text-gray-400 hover:text-white'}`}
            >
              <Icon name="Search" size={20} />
            </button>
            <button
              onClick={() => onNavigate('favorites')}
              className={`p-2 rounded-lg transition-colors ${currentPage === 'favorites' ? 'text-orange-400' : 'text-gray-400 hover:text-white'}`}
            >
              <Icon name="Heart" size={20} />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-1 pb-2 overflow-x-auto scrollbar-none">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                currentPage === item.id
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={currentPage === item.id ? { background: 'hsl(25,100%,55%)', color: 'white' } : {}}
            >
              <Icon name={item.icon} size={12} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}