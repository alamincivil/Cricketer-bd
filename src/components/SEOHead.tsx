import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
}

export default function SEOHead({ title, description, image, article }: SEOHeadProps) {
  const { pathname } = useLocation();
  const siteName = 'Cricketer.bd';
  const defaultDescription = 'The ultimate biography portal for Bangladesh cricketers. Explore career stats, stories, and historic moments of our Tigers.';
  const defaultImage = 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1200';
  const baseUrl = process.env.APP_URL || 'https://cricketer.bd';

  const seo = {
    title: title ? `${title} | ${siteName}` : `${siteName} | Bangladesh Cricketers Biography Portal`,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${baseUrl}${pathname}`,
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && <meta property="og:description" content={seo.description} />}
      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
}
