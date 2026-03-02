/**
 * Custom event tracking functions for Cricketer.bd.
 */
const GA_MEASUREMENT_ID = 'G-HZ1P39XS1F';

window.trackPlayerView = (playerId, playerName) => {
  if (typeof gtag === 'function') {
    gtag('event', 'player_view', {
      player_id: playerId,
      player_name: playerName,
    });
  }
};

window.trackSearchQuery = (query) => {
  if (typeof gtag === 'function') {
    gtag('event', 'search', {
      search_term: query,
    });
  }
};

window.trackLanguageToggle = (language) => {
  if (typeof gtag === 'function') {
    gtag('event', 'language_toggle', {
      language: language,
    });
  }
};
