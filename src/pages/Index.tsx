import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ContentModal from '@/components/ContentModal';
import HomePage from '@/pages/HomePage';
import TVPage from '@/pages/TVPage';
import SchedulePage from '@/pages/SchedulePage';
import FavoritesPage from '@/pages/FavoritesPage';
import SearchPage from '@/pages/SearchPage';
import { useHistory } from '@/hooks/useHistory';
import { useFavorites } from '@/hooks/useFavorites';
import { ALL_CONTENT } from '@/data/content';

type Page = 'home' | 'favorites' | 'tv' | 'schedule' | 'search';

export default function Index() {
  const [page, setPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalContentId, setModalContentId] = useState<string | null>(null);

  const { history, addOrUpdate } = useHistory();
  const { favorites, toggle: toggleFavorite, isFavorite } = useFavorites();

  const modalItem = modalContentId ? ALL_CONTENT.find(c => c.id === modalContentId) || null : null;

  const handleContentClick = (id: string) => {
    setModalContentId(id);
  };

  const handleWatch = (item: { id: string; title: string; poster: string; type: string; duration?: number; episodes?: number }) => {
    addOrUpdate({
      id: item.id,
      title: item.title,
      poster: item.poster,
      progress: history.find(h => h.id === item.id)?.progress || 5,
      duration: item.duration || 25,
      watchedAt: new Date().toISOString(),
      type: item.type as 'movie' | 'series',
    });
    setModalContentId(null);
  };

  const handleNavigate = (p: Page) => {
    setPage(p);
    if (p !== 'search') setSearchQuery('');
  };

  return (
    <div className="gradient-hero min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Navbar
        currentPage={page}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={q => { setSearchQuery(q); setPage('search'); }}
      />

      <main>
        {page === 'home' && (
          <HomePage
            history={history}
            favorites={favorites}
            onFavoriteToggle={toggleFavorite}
            onContentClick={handleContentClick}
            onNavigate={handleNavigate}
          />
        )}
        {page === 'tv' && (
          <TVPage onNavigateSchedule={() => setPage('schedule')} />
        )}
        {page === 'schedule' && (
          <SchedulePage />
        )}
        {page === 'favorites' && (
          <FavoritesPage
            favorites={favorites}
            onFavoriteToggle={toggleFavorite}
            onContentClick={handleContentClick}
            onNavigateHome={() => setPage('home')}
          />
        )}
        {page === 'search' && (
          <SearchPage
            query={searchQuery}
            favorites={favorites}
            onFavoriteToggle={toggleFavorite}
            onContentClick={handleContentClick}
          />
        )}
      </main>

      {modalItem && (
        <ContentModal
          item={modalItem}
          isFavorite={isFavorite(modalItem.id)}
          onClose={() => setModalContentId(null)}
          onFavoriteToggle={toggleFavorite}
          onWatch={handleWatch}
        />
      )}
    </div>
  );
}
