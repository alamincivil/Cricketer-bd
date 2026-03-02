/**
 * Custom hook for tracking Google Analytics events.
 */
export const useTrackEvent = () => {
  /**
   * Track a custom event with optional parameters.
   * @param eventName The name of the event (e.g., 'player_view', 'search', 'language_toggle')
   * @param params Optional parameters to include with the event
   */
  const track = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    } else {
      // Fallback for development or if gtag is not loaded
      console.log(`[Analytics] Track Event: ${eventName}`, params);
    }
  };

  return { track };
};
