import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import { SkeletonGrid } from './components/PlayerCardSkeleton';
import { 
  HomePage, 
  PlayersPage, 
  PlayerDetailPage, 
  EraPage,
  CaptainsPage,
  LeadersPage,
  DistrictsPage,
  AboutPage, 
  NotFoundPage 
} from './utils/lazyLoad';

const LoadingFallback = () => (
  <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <SkeletonGrid />
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="players" element={<PlayersPage />} />
              <Route path="players/:id" element={<PlayerDetailPage />} />
              <Route path="era/:era" element={<EraPage />} />
              <Route path="captains" element={<CaptainsPage />} />
              <Route path="leaders" element={<LeadersPage />} />
              <Route path="districts" element={<DistrictsPage />} />
              <Route path="districts/:district" element={<DistrictsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}
