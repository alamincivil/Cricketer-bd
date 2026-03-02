export interface FormatStats {
  matches: number;
  runs: number;
  wickets: number;
}

export interface StatsSummary {
  test?: FormatStats;
  odi?: FormatStats;
  t20i?: FormatStats;
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
  sourceUrls: string[];
  imageUrl?: string;
}
