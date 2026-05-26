import Icon from '@/components/ui/icon';

interface ContentCardProps {
  id: string;
  title: string;
  subtitle?: string;
  poster: string;
  rating?: string;
  genre?: string;
  year?: number;
  progress?: number;
  duration?: number;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function ContentCard({
  id, title, subtitle, poster, rating, genre, year,
  progress, duration, isFavorite, onFavoriteToggle, onClick, size = 'md'
}: ContentCardProps) {
  const sizeClasses = {
    sm: 'w-36',
    md: 'w-44',
    lg: 'w-56',
  };

  const progressPercent = progress && duration ? Math.round((progress / duration) * 100) : null;

  return (
    <div
      className={`${sizeClasses[size]} shrink-0 cursor-pointer card-hover relative group`}
      onClick={onClick}
    >
      {/* Poster */}
      <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '2/3', background: 'hsl(220,14%,14%)' }}>
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="gradient-card-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: '2px solid rgba(255,255,255,0.3)' }}>
            <Icon name="Play" size={20} className="text-white ml-0.5" />
          </div>
        </div>

        {/* Rating badge */}
        {rating && (
          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-xs font-bold text-white" style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)' }}>
            {rating}
          </div>
        )}

        {/* Favorite button */}
        {onFavoriteToggle && (
          <button
            onClick={e => { e.stopPropagation(); onFavoriteToggle(id); }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          >
            <Icon
              name={isFavorite ? 'Heart' : 'Heart'}
              size={14}
              className={isFavorite ? 'text-red-500' : 'text-gray-300'}
              style={isFavorite ? { fill: 'currentColor' } : {}}
            />
          </button>
        )}

        {/* Progress bar */}
        {progressPercent !== null && (
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-2 px-0.5">
        <p className="text-white text-sm font-semibold leading-tight line-clamp-1">{title}</p>
        {subtitle && <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{subtitle}</p>}
        <div className="flex items-center gap-2 mt-1">
          {genre && <span className="text-gray-600 text-xs">{genre}</span>}
          {year && <span className="text-gray-600 text-xs">{year}</span>}
        </div>
        {progressPercent !== null && duration && (
          <p className="text-xs mt-1" style={{ color: 'hsl(25,100%,55%)' }}>
            Просмотрено {progressPercent}% · {duration - (progress || 0)} мин осталось
          </p>
        )}
      </div>
    </div>
  );
}
