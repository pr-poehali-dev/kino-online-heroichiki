import ContentCard from '@/components/ContentCard';
import Icon from '@/components/ui/icon';
import { ALL_CONTENT } from '@/data/content';

interface FavoritesPageProps {
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
  onContentClick: (id: string) => void;
  onNavigateHome: () => void;
}

export default function FavoritesPage({ favorites, onFavoriteToggle, onContentClick, onNavigateHome }: FavoritesPageProps) {
  const favoriteItems = ALL_CONTENT.filter(c => favorites.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-24 pb-16 min-h-screen animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'hsla(0,90%,58%,0.15)' }}>
          <Icon name="Heart" size={20} style={{ color: 'hsl(0,90%,58%)', fill: 'hsl(0,90%,58%)' }} />
        </div>
        <div>
          <h1 className="font-oswald text-4xl font-bold text-white">МОИ ИЗБРАННЫЕ</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {favoriteItems.length > 0 ? `${favoriteItems.length} ${favoriteItems.length === 1 ? 'элемент' : favoriteItems.length < 5 ? 'элемента' : 'элементов'}` : 'Пусто'}
          </p>
        </div>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'hsl(220,14%,12%)' }}>
            <Icon name="Heart" size={32} className="text-gray-700" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Список избранного пуст</h3>
          <p className="text-gray-500 text-sm max-w-xs">Добавляйте фильмы и сериалы в избранное, нажимая на иконку сердечка</p>
          <button
            onClick={onNavigateHome}
            className="mt-6 px-6 py-3 rounded-xl font-medium text-sm text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, hsl(25,100%,55%), hsl(0,90%,55%))' }}
          >
            На главную
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-stagger">
          {favoriteItems.map(item => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              poster={item.poster}
              rating={item.rating}
              genre={item.genre}
              year={item.year}
              isFavorite={true}
              onFavoriteToggle={onFavoriteToggle}
              onClick={() => onContentClick(item.id)}
              size="sm"
            />
          ))}
        </div>
      )}
    </div>
  );
}
