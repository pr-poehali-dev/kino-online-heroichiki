import ContentCard from '@/components/ContentCard';
import Icon from '@/components/ui/icon';
import { ALL_CONTENT, SERIES, MOVIES } from '@/data/content';
import { HistoryItem } from '@/hooks/useHistory';

interface HomePageProps {
  history: HistoryItem[];
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
  onContentClick: (id: string) => void;
  onNavigate: (page: 'home' | 'favorites' | 'tv' | 'schedule' | 'search') => void;
}

export default function HomePage({ history, favorites, onFavoriteToggle, onContentClick, onNavigate }: HomePageProps) {
  const featuredItem = MOVIES[0];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[75vh] min-h-[500px] overflow-hidden">
        <img
          src="https://cdn.poehali.dev/projects/312e5844-24db-4805-af37-6bf9e63c2cd2/files/2e0a0735-5778-4163-81a2-f4585a9adb2d.jpg"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="gradient-banner-overlay absolute inset-0" />
        <div style={{ background: 'linear-gradient(to top, hsl(220,15%,6%) 0%, transparent 40%)' }} className="absolute inset-0" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end pb-16 px-6 sm:px-10 max-w-7xl mx-auto">
          <div className="max-w-xl animate-slide-up">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase" style={{ background: 'linear-gradient(135deg, hsl(25,100%,55%), hsl(0,90%,55%))', color: 'white' }}>
                🎬 Новинка
              </span>
              <span className="text-gray-400 text-sm">2025 · Мультфильм · 0+</span>
            </div>

            <h1 className="font-oswald text-5xl sm:text-6xl font-bold text-white leading-none mb-2">
              ГЕРОЙЧИКИ
            </h1>
            <h2 className="font-oswald text-2xl sm:text-3xl font-light mb-4" style={{ color: 'hsl(25,100%,65%)' }}>
              НЕЗВАНЫЙ ГОСТЬ
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
              Рома планирует выступить на школьном конкурсе и показать огромный звездолёт из конструктора. 
              Но таинственные космические пираты хотят угнать корабль...
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onContentClick('heroychiki-movie')}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 glow-orange"
                style={{ background: 'linear-gradient(135deg, hsl(25,100%,55%), hsl(0,90%,55%))' }}
              >
                <Icon name="Play" size={18} />
                Смотреть
              </button>
              <button
                onClick={() => onContentClick('heroychiki-movie')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-white transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <Icon name="Info" size={18} />
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Watching */}
      {history.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-10 mt-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={18} style={{ color: 'hsl(25,100%,55%)' }} />
              <h3 className="font-oswald text-xl font-semibold text-white tracking-wide">ПРОДОЛЖИТЬ ПРОСМОТР</h3>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 animate-stagger" style={{ scrollbarWidth: 'none' }}>
            {history.map(item => (
              <ContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={item.episode}
                poster={item.poster}
                progress={item.progress}
                duration={item.duration}
                isFavorite={favorites.includes(item.id)}
                onFavoriteToggle={onFavoriteToggle}
                onClick={() => onContentClick(item.id)}
                size="md"
              />
            ))}
          </div>
        </section>
      )}

      {/* Мультсериалы */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 mt-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎭</span>
            <h3 className="font-oswald text-xl font-semibold text-white tracking-wide">МУЛЬТСЕРИАЛЫ</h3>
          </div>
          <button className="text-xs font-medium transition-colors hover:text-white" style={{ color: 'hsl(25,100%,55%)' }}>
            Все →
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 animate-stagger" style={{ scrollbarWidth: 'none' }}>
          {SERIES.map(item => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              poster={item.poster}
              rating={item.rating}
              genre={item.genre}
              year={item.year}
              isFavorite={favorites.includes(item.id)}
              onFavoriteToggle={onFavoriteToggle}
              onClick={() => onContentClick(item.id)}
              size="md"
            />
          ))}
        </div>
      </section>

      {/* Фильмы */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 mt-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎬</span>
            <h3 className="font-oswald text-xl font-semibold text-white tracking-wide">ФИЛЬМЫ</h3>
          </div>
          <button className="text-xs font-medium transition-colors hover:text-white" style={{ color: 'hsl(25,100%,55%)' }}>
            Все →
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 animate-stagger" style={{ scrollbarWidth: 'none' }}>
          {MOVIES.map(item => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              poster={item.poster}
              rating={item.rating}
              genre={item.genre}
              year={item.year}
              isFavorite={favorites.includes(item.id)}
              onFavoriteToggle={onFavoriteToggle}
              onClick={() => onContentClick(item.id)}
              size="lg"
            />
          ))}
        </div>
      </section>

      {/* ТВ Превью */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 mt-10 mb-16">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Icon name="Tv" size={18} style={{ color: 'hsl(25,100%,55%)' }} />
            <h3 className="font-oswald text-xl font-semibold text-white tracking-wide">ПРЯМОЙ ЭФИР</h3>
          </div>
          <button
            onClick={() => onNavigate('tv')}
            className="text-xs font-medium transition-colors hover:text-white"
            style={{ color: 'hsl(25,100%,55%)' }}
          >
            Все каналы →
          </button>
        </div>
        <div
          className="p-5 rounded-2xl flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.01]"
          style={{ background: 'hsl(220,14%,10%)', border: '1px solid hsl(220,14%,18%)' }}
          onClick={() => onNavigate('tv')}
        >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0" style={{ background: 'hsl(220,14%,16%)' }}>
            🎠
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-white font-semibold text-sm">Карусель</span>
              <span className="px-1.5 py-0.5 rounded text-xs font-bold animate-pulse-live" style={{ background: 'hsla(0,90%,58%,0.2)', color: 'hsl(0,90%,70%)' }}>
                ● LIVE
              </span>
            </div>
            <p className="text-gray-400 text-sm truncate">Геройчики. Новые серии</p>
          </div>
          <Icon name="ChevronRight" size={20} className="text-gray-600 shrink-0" />
        </div>
      </section>
    </div>
  );
}
