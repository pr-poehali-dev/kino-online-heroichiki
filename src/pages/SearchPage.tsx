import { useMemo } from 'react';
import ContentCard from '@/components/ContentCard';
import Icon from '@/components/ui/icon';
import { ALL_CONTENT, TV_CHANNELS } from '@/data/content';

interface SearchPageProps {
  query: string;
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
  onContentClick: (id: string) => void;
}

export default function SearchPage({ query, favorites, onFavoriteToggle, onContentClick }: SearchPageProps) {
  const q = query.trim().toLowerCase();

  const contentResults = useMemo(() => {
    if (!q) return [];
    return ALL_CONTENT.filter(c =>
      c.title.toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q) ||
      (c.genre || '').toLowerCase().includes(q)
    );
  }, [q]);

  const channelResults = useMemo(() => {
    if (!q) return [];
    return TV_CHANNELS.filter(c =>
      c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [q]);

  const hasResults = contentResults.length > 0 || channelResults.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-24 pb-16 min-h-screen animate-fade-in">
      <div className="mb-8">
        <h1 className="font-oswald text-4xl font-bold text-white">ПОИСК</h1>

        {/* Big search bar */}
        <div className="relative mt-4 max-w-2xl">
          <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            readOnly
            value={query}
            placeholder="Используйте поиск в шапке..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-white placeholder-gray-600 text-base outline-none"
            style={{ background: 'hsl(220,14%,12%)', border: '1px solid hsl(220,14%,20%)' }}
          />
          {query && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-600">
              {contentResults.length + channelResults.length} результатов
            </div>
          )}
        </div>
      </div>

      {/* No query — show hints */}
      {!q && (
        <div>
          <p className="text-gray-500 text-sm mb-6">Популярные запросы:</p>
          <div className="flex flex-wrap gap-2">
            {['Геройчики', 'Мультфильм', 'Карусель', 'Незваный гость', 'Первый канал'].map(hint => (
              <span
                key={hint}
                className="px-4 py-2 rounded-full text-sm cursor-pointer transition-all hover:scale-105"
                style={{ background: 'hsl(220,14%,14%)', color: 'hsl(0,0%,70%)', border: '1px solid hsl(220,14%,22%)' }}
              >
                {hint}
              </span>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-oswald text-xl font-semibold text-white mb-5 tracking-wide">ВСЕ ФИЛЬМЫ И СЕРИАЛЫ</h3>
            <div className="flex gap-4 flex-wrap animate-stagger">
              {ALL_CONTENT.map(item => (
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
          </div>
        </div>
      )}

      {/* Results */}
      {q && !hasResults && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'hsl(220,14%,12%)' }}>
            <Icon name="SearchX" size={32} className="text-gray-700" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Ничего не найдено</h3>
          <p className="text-gray-500 text-sm">Попробуйте другой запрос</p>
        </div>
      )}

      {q && contentResults.length > 0 && (
        <section className="mb-10">
          <h3 className="font-oswald text-xl font-semibold text-white mb-5 tracking-wide">
            ФИЛЬМЫ И СЕРИАЛЫ
            <span className="ml-3 text-sm font-normal text-gray-500">({contentResults.length})</span>
          </h3>
          <div className="flex gap-4 flex-wrap animate-stagger">
            {contentResults.map(item => (
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
      )}

      {q && channelResults.length > 0 && (
        <section>
          <h3 className="font-oswald text-xl font-semibold text-white mb-5 tracking-wide">
            ТВ-КАНАЛЫ
            <span className="ml-3 text-sm font-normal text-gray-500">({channelResults.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-stagger">
            {channelResults.map(ch => (
              <div
                key={ch.id}
                className="tv-channel-card p-4 rounded-xl flex items-center gap-3 cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black shrink-0" style={{ background: ch.color }}>
                  {ch.logo}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{ch.name}</p>
                  <p className="text-gray-500 text-xs">{ch.description}</p>
                </div>
                <button
                  className="ml-auto px-3 py-1.5 rounded-lg text-xs font-bold text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, hsl(25,100%,55%), hsl(0,90%,55%))' }}
                >
                  Смотреть
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
