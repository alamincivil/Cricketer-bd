import { lazy } from 'react';

export const HomePage = lazy(() => import('../pages/HomePage'));
export const PlayersPage = lazy(() => import('../pages/PlayersPage'));
export const PlayerDetailPage = lazy(() => import('../pages/PlayerDetailPage'));
export const EraPage = lazy(() => import('../pages/EraPage'));
export const CaptainsPage = lazy(() => import('../pages/CaptainsPage'));
export const LeadersPage = lazy(() => import('../pages/LeadersPage'));
export const DistrictsPage = lazy(() => import('../pages/DistrictsPage'));
export const AboutPage = lazy(() => import('../pages/AboutPage'));
export const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
