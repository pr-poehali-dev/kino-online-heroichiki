import Icon from '@/components/ui/icon';
import { SEASON1_EPISODES } from '@/data/content';

interface ContentItem {
  id: string;
  title: string;
  subtitle?: string;
  poster: string;
  rating?: string;
  genre?: string;
  year?: number;
  description?: string;
  type: string;
  episodes?: number;
  season?: number;
  duration?: number;
}

interface ContentModalProps {
  item: ContentItem | null;
  isFavorite: boolean;
  onClose: () => void;
  onFavoriteToggle: (id: string) => void;
  onWatch: (item: ContentItem) => void;
}

export default function ContentModal({ item, isFavorite, onClose, onFavoriteToggle, onWatch }: ContentModalProps) {
  if (!item) return null;

  const showEpisodes = item.id === 'heroychiki-s1';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden animate-fade-in"
        style={{ background: 'hsl(220,14%,10%)', border: '1px solid hsl(220,14%,18%)', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="relative h-64 sm:h-80 shrink-0">
          <img src={item.poster} alt={item.title} className="w-full h-full object-cover" />
          <div className="gradient-banner-overlay absolute inset-0" />
          <div style={{ background: 'linear-gradient(to top, hsl(220,14%,10%) 0%, transparent 60%)' }} className="absolute inset-0" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          >
            <Icon name="X" size={18} className="text-white" />
          </button>

          {item.rating && (
            <div className="absolute top-4 left-4 px-2 py-1 rounded-lg text-xs font-bold text-white" style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}>
              {item.rating}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 -mt-16 relative">
          <h2 className="font-oswald text-3xl font-bold text-white leading-tight">{item.title}</h2>
          {item.subtitle && <p className="text-gray-400 mt-1">{item.subtitle}</p>}

          <div className="flex flex-wrap items-center gap-3 mt-3">
            {item.year && <span className="text-gray-400 text-sm">{item.year}</span>}
            {item.genre && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'hsl(220,14%,18%)', color: 'hsl(25,100%,65%)' }}>
                {item.genre}
              </span>
            )}
            {item.type === 'series' && item.episodes && (
              <span className="text-gray-400 text-sm">{item.episodes} серий</span>
            )}
            {item.type === 'movie' && item.duration && (
              <span className="text-gray-400 text-sm">{item.duration} мин</span>
            )}
          </div>

          {item.description && (
            <p className="text-gray-300 text-sm leading-relaxed mt-4 line-clamp-4">{item.description}</p>
          )}

          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => onWatch(item)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, hsl(25,100%,55%), hsl(0,90%,55%))' }}
            >
              <Icon name="Play" size={18} />
              Смотреть
            </button>

            <button
              onClick={() => onFavoriteToggle(item.id)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all hover:scale-105"
              style={{
                background: isFavorite ? 'hsla(0,90%,58%,0.15)' : 'hsl(220,14%,18%)',
                color: isFavorite ? 'hsl(0,90%,58%)' : 'hsl(0,0%,80%)',
                border: `1px solid ${isFavorite ? 'hsla(0,90%,58%,0.4)' : 'hsl(220,14%,25%)'}`,
              }}
            >
              <Icon name="Heart" size={16} style={isFavorite ? { fill: 'currentColor' } : {}} />
              {isFavorite ? 'В избранном' : 'В избранное'}
            </button>

            <button
              className="ml-auto p-3 rounded-xl transition-colors hover:scale-105"
              style={{ background: 'hsl(220,14%,18%)', color: 'hsl(0,0%,70%)', border: '1px solid hsl(220,14%,25%)' }}
            >
              <Icon name="Share2" size={16} />
            </button>
          </div>

          {/* Episodes list for Season 1 */}
          {showEpisodes && (
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="List" size={16} style={{ color: 'hsl(25,100%,55%)' }} />
                <h3 className="font-oswald text-lg font-semibold text-white tracking-wide">СЕРИИ — СЕЗОН 1</h3>
              </div>
              <div className="flex flex-col gap-1">
                {SEASON1_EPISODES.map(ep => (
                  <div key={ep.num} className="flex items-center gap-3 group">
                    <span className="text-xs font-mono w-6 text-right shrink-0" style={{ color: 'hsl(0,0%,35%)' }}>{ep.num}</span>
                    {ep.url ? (
                      <a
                        href={ep.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.01]"
                        style={{ background: 'hsl(220,14%,13%)', color: 'hsl(0,0%,85%)', border: '1px solid hsl(220,14%,18%)' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'hsl(25,100%,45%)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'hsl(220,14%,18%)'; (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,85%)'; }}
                      >
                        <span>{ep.title}</span>
                        <Icon name="ExternalLink" size={13} style={{ color: 'hsl(25,100%,55%)', opacity: 0.8 }} />
                      </a>
                    ) : (
                      <div
                        className="flex-1 px-3 py-2.5 rounded-xl text-sm"
                        style={{ background: 'hsl(220,14%,11%)', color: 'hsl(0,0%,40%)', border: '1px solid hsl(220,14%,15%)' }}
                      >
                        {ep.title}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
