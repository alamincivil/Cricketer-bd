# Project Handover: Cricketer.bd 🇧🇩

## 1. Project Overview
**Cricketer.bd** is a comprehensive digital encyclopedia and statistics platform dedicated to Bangladesh cricket. It features a rich database of players, historical eras, and major milestones, designed with a focus on "Local Pride" and "Historical Storytelling."

## 2. Technical Stack
- **Frontend:** React 19, TypeScript
- **Styling:** Tailwind CSS 4.0
- **Routing:** React Router Dom 7
- **Animations:** Framer Motion (motion/react)
- **Icons:** Lucide React
- **SEO:** React Helmet Async
- **Data:** Static JSON-based architecture for high performance and easy maintenance.

## 3. Key Features Implemented

### 🏏 District Browser (Local Pride)
- **Route:** `/districts`
- **Functionality:** Users can browse cricketers by their home district.
- **Components:** `DistrictSelector`, `DistrictCard`.
- **Logic:** Aggregates player counts per district and provides a searchable interface.

### ⏳ Era Stories
- **Route:** `/era/:eraSlug`
- **Functionality:** Dedicated pages for different periods of Bangladesh cricket (e.g., 1990s Pioneers, Golden Generation).
- **Components:** `EraStory`, `EraHighlight`.
- **Logic:** Filters players by `eraTags` and displays historical narratives with statistics.

### 🏆 Milestones Timeline
- **Route:** `/milestones`
- **Functionality:** A chronological timeline of the 25+ most significant moments in Bangladesh cricket history.
- **Components:** `MilestoneCard`.
- **Logic:** Sorts events by date and links to key players involved.

### 🎖️ Awards & Accolades
- **Location:** Player Detail Page
- **Functionality:** Displays specific awards (ICC Team of the Year, Wisden, etc.) with year and significance.
- **Data:** Integrated into the `Player` interface and `players.json`.

## 4. File Structure Highlights
```text
src/
├── components/          # Reusable UI components
│   ├── DistrictCard.tsx
│   ├── EraStory.tsx
│   ├── MilestoneCard.tsx
│   └── ...
├── data/                # JSON Data Sources
│   ├── players.json     # 100+ player records
│   ├── eras.json        # Historical era data
│   └── milestones.json  # Timeline events
├── pages/               # Page-level components
│   ├── DistrictsPage.tsx
│   ├── EraPage.tsx
│   ├── MilestonesPage.tsx
│   └── PlayerDetailPage.tsx
├── services/            # Data fetching/filtering logic
│   └── players.ts
└── types/               # TypeScript interfaces
    └── player.ts
```

## 5. Data Schemas

### Player Interface (`src/types/player.ts`)
```typescript
export interface Award {
  name: string;
  year: number;
  significance: string;
}

export interface Player {
  id: string;
  fullName: string;
  knownAs: string;
  dob: string;
  birthPlace: string;
  role: string;
  formats: string[];
  eraTags: string[];
  statsSummary: StatsSummary;
  bioEn: string;
  bioBn: string;
  awards?: Award[];
  district: string;
  // ... other fields
}
```

## 6. Visual Style Guide
- **Primary Color:** `#006a4e` (Bangladesh Green - `bg-flag-500`)
- **Secondary Color:** `#f42a41` (Bangladesh Red - `bg-flag-red-500`)
- **Accent Color:** Gold (`text-flag-gold-400`)
- **Typography:** Bold, uppercase tracking-widest labels for a "premium sports" feel.
- **Cards:** `rounded-2xl` or `rounded-3xl` with subtle borders and shadow-sm.

## 7. Roadmap for Further Development (Instructions for Claude)
1. **Dynamic Stats:** Integrate a real-time API (like Cricinfo or a custom scraper) to update player stats.
2. **Comparison Tool:** Allow users to compare two players side-by-side.
3. **Quiz/Trivia:** Add a gamified section about Bangladesh cricket history using the `milestones.json` data.
4. **Fan Zone:** Implement a "Favorite Players" list using LocalStorage (basic version exists).
5. **Search Optimization:** Enhance `SearchBar.tsx` with Fuse.js for better fuzzy searching across districts and eras.

---
*Prepared by Google AI Studio Build Agent*
