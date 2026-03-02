import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Player } from '../types/player';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  player?: Player;
}

export default function SEOHead({ title, description, image, article, player }: SEOHeadProps) {
  const { pathname } = useLocation();
  const siteName = 'Cricketer.bd';
  const defaultDescription = 'The ultimate biography portal for Bangladesh cricketers. Explore career stats, stories, and historic moments of our Tigers.';
  const defaultImage = 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1200';
  const baseUrl = process.env.APP_URL || 'https://cricketer.bd';

  let finalDescription = description || defaultDescription;

  if (player) {
    const totalRuns = Object.values(player.statsSummary).reduce((acc, curr) => acc + (curr?.runs || 0), 0);
    const totalWickets = Object.values(player.statsSummary).reduce((acc, curr) => acc + (curr?.wickets || 0), 0);
    const statsParts = [];
    if (totalRuns > 0) statsParts.push(`${totalRuns.toLocaleString()} runs`);
    if (totalWickets > 0) statsParts.push(`${totalWickets.toLocaleString()} wickets`);
    const statsString = statsParts.length > 0 ? `Career stats: ${statsParts.join(' & ')}.` : '';
    
    finalDescription = `Discover the career of ${player.fullName}, a legendary ${player.role} from Bangladesh. ${statsString} Active during the ${player.eraTags.join(', ')} era(s).`;
  }

  const seo = {
    title: title ? `${title} | ${siteName}` : `${siteName} | Bangladesh Cricketers Biography Portal`,
    description: finalDescription,
    image: image || defaultImage,
    url: `${baseUrl}${pathname}`,
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
}
