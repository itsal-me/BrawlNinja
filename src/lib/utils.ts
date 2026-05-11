/**
 * Utility functions for data processing and formatting
 */

export const formatTrophies = (trophies: number): string => {
  if (trophies >= 1000) {
    return `${(trophies / 1000).toFixed(1)}k`;
  }
  return trophies.toString();
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const calculateDailyGain = (
  current: number,
  previous: number
): number => {
  return current - previous;
};

export const calculateWinRate = (wins: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((wins / total) * 100);
};

export const normalizeTag = (tag: string): string => {
  return tag.replace('#', '').toUpperCase();
};

export const validateTag = (tag: string): boolean => {
  const normalized = normalizeTag(tag);
  return /^[0-9A-Z]{3,}$/.test(normalized);
};

export const getOrdinalSuffix = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
};

export const getRarityColor = (rarity: string): string => {
  const rarityMap: Record<string, string> = {
    COMMON: '#a0a0a0',
    RARE: '#3da5d9',
    SUPER_RARE: '#16c784',
    EPIC: '#9d4edd',
    MYTHIC: '#ff006e',
    LEGENDARY: '#ffd60a',
  };
  return rarityMap[rarity] || '#e0e0e0';
};

export const getClassEmoji = (brawlerClass: string): string => {
  const classEmojis: Record<string, string> = {
    Assassin: '🗡️',
    Tank: '🛡️',
    Healer: '💚',
    Thrower: '💣',
    Sniper: '🎯',
    Support: '🤝',
  };
  return classEmojis[brawlerClass] || '⚡';
};
