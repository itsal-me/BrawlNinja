// Brawl Stars API Types

export interface Player {
  tag: string;
  name: string;
  trophies: number;
  highTrophies: number;
  expLevel: number;
  powerLevel: number;
  totalBrawlers: number;
  brawlers: Brawler[];
  club?: PlayerClub;
  clubTag?: string;
  clubName?: string;
  clubRole?: string;
}

export interface PlayerClub {
  tag: string;
  name: string;
}

export interface Brawler {
  id: number;
  name: string;
  power: number;
  trophies: number;
  highestTrophies: number;
  starPowers?: StarPower[];
  gadgets?: Gadget[];
}

export interface StarPower {
  id: number;
  name: string;
}

export interface Gadget {
  id: number;
  name: string;
}

export interface Club {
  tag: string;
  name: string;
  type: string;
  description?: string;
  badgeId: number;
  requiredTrophies: number;
  membersCount: number;
  members?: ClubMember[];
}

export interface ClubMember {
  tag: string;
  name: string;
  role: string;
  trophies: number;
}

export interface BattleLog {
  battleTime: string;
  event: {
    id: number;
    mode: string;
    map: string;
  };
  battle: {
    mode: string;
    type: string;
    result: string;
    starPlayer?: string;
    teams?: BattleTeam[][];
    duration?: number;
  };
}

export interface BattleTeam {
  tag: string;
  name: string;
  brawler: {
    id: number;
    name: string;
    power: number;
    trophies: number;
  };
}

// App-specific Types

export interface PlayerSnapshot {
  tag: string;
  name: string;
  trophies: number;
  highTrophies: number;
  expLevel: number;
  powerLevel: number;
  totalBrawlers: number;
  snapshotDate: string;
}

export interface Analytics {
  dailyGains: number;
  weeklyGains: number;
  bestBrawler: string;
  bestBrawlerWinRate: number;
  modeWinRates: ModeWinRate[];
  trophyTrend: TrophyPoint[];
}

export interface ModeWinRate {
  mode: string;
  winRate: number;
  matchesPlayed: number;
}

export interface TrophyPoint {
  date: string;
  trophies: number;
}

export interface TeamRecommendation {
  brawlerId: number;
  brawlerName: string;
  synergyScore: number;
  winRate: number;
  reason: string;
  role: string;
}

export interface User {
  id: string;
  playerTag?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFavorite {
  id: string;
  userId: string;
  playerTag?: string;
  clubTag?: string;
  createdAt: string;
}

export interface UserAlert {
  id: string;
  userId: string;
  playerTag: string;
  alertType: 'trophy_milestone' | 'daily_gain' | 'ranking';
  threshold: number;
  isActive: boolean;
  createdAt: string;
}

export interface BrawlerStat {
  id: number;
  name: string;
  rarity: string;
  class: string;
  description: string;
  releaseDate: string;
}

export interface BrawlerModeStat {
  brawlerId: number;
  mode: string;
  mapName?: string;
  winRate: number;
  pickRate: number;
  banRate?: number;
  averageTrophies: number;
  strengthScore: number;
  synergyTags: string[];
  counterTags: string[];
}
