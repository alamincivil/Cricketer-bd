# Cricketer.bd 🇧🇩

The ultimate biography portal for Bangladesh cricketers. Explore career stats, stories, and historic moments of our Tigers.

**LIVE:** [https://cricketer.bd](https://cricketer.bd)

## Features
- **200 Legendary Players**: Comprehensive documentation of Bangladesh's finest cricketers across generations.
- **Advanced Search**: Fuzzy search powered by `Fuse.js` to find players by name, role, or birthplace.
- **Smart Filters**: Filter by Format (Test, ODI, T20I), Role, and Era (1990s–2020s).
- **Mobile-First Design**: Fully responsive with a floating filter toggle for mobile users.
- **SEO Optimized**: Dynamic meta tags, sitemaps, and robots.txt for maximum visibility.
- **Social Sharing**: Share player profiles directly to Twitter, Facebook, and WhatsApp.
- **Fast Performance**: Route-based lazy loading and skeleton screens for a smooth experience.

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Search**: Fuse.js
- **SEO**: React Helmet Async
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/alamincivil/Cricketer-bd.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🐯 Screenshots

| Home Page | Players List | Player Details |
| :---: | :---: | :---: |
| ![Home](https://picsum.photos/seed/cricket-home/800/600) | ![Players](https://picsum.photos/seed/cricket-list/800/600) | ![Detail](https://picsum.photos/seed/cricket-detail/800/600) |

## 📊 Analytics Setup

Cricketer.bd uses Google Analytics 4 (GA4) to track user engagement.

1.  **Google Analytics**: Create a GA4 property and get your `G-XXXXXXXXXX` measurement ID.
2.  **Configuration**: Replace `GA_MEASUREMENT_ID` in `public/google-analytics.html` and `G-XXXXXXXXXX` in `public/gtag-config.js` with your actual ID.
3.  **Tracking**: The app automatically tracks:
    *   `page_view`: All page navigations.
    *   `player_view`: When a user visits a player's profile.
    *   `search`: When a user performs a search.
    *   `language_toggle`: When a user switches between English and Bangla.

## License
MIT License. 🇧🇩
