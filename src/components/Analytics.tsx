import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTrackEvent } from '../hooks/useTrackEvent';

interface AnalyticsProps {
  children?: React.ReactNode;
  event?: string;
  params?: Record<string, any>;
}

/**
 * Analytics component to track page views and custom events.
 * Can be used as a wrapper or as a standalone component.
 */
export default function Analytics({ children, event, params }: AnalyticsProps) {
  const location = useLocation();
  const { track } = useTrackEvent();

  // Track page views on route change
  useEffect(() => {
    track('page_view', {
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname, track]);

  // Track custom event if provided
  useEffect(() => {
    if (event) {
      track(event, params);
    }
  }, [event, params, track]);

  return <>{children}</>;
}
