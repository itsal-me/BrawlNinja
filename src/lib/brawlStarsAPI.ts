import axios from 'axios';
import { Player, Club, BattleLog } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_BRAWL_STARS_API_URL;
const API_TOKEN = process.env.BRAWL_STARS_API_TOKEN;

if (!API_BASE_URL || !API_TOKEN) {
  throw new Error('Missing Brawl Stars API configuration');
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

const encodeBrawlStarsTag = (tag: string): string => {
  const normalizedTag = tag.replace(/^#/, '').toUpperCase();
  return encodeURIComponent(`#${normalizedTag}`);
};

export const brawlStarsAPI = {
  /**
   * Get player data by tag.
   * @param tag Player tag, with or without #
   */
  async getPlayer(tag: string): Promise<Player> {
    const encodedTag = encodeBrawlStarsTag(tag);
    const response = await apiClient.get<Player>(`/players/${encodedTag}`);
    return response.data;
  },

  /**
   * Get club data by tag.
   * @param tag Club tag, with or without #
   */
  async getClub(tag: string): Promise<Club> {
    const encodedTag = encodeBrawlStarsTag(tag);
    const response = await apiClient.get<Club>(`/clubs/${encodedTag}`);
    return response.data;
  },

  /**
   * Get player battle log.
   * @param tag Player tag, with or without #
   */
  async getBattleLog(tag: string): Promise<BattleLog[]> {
    const encodedTag = encodeBrawlStarsTag(tag);
    const response = await apiClient.get<{ items: BattleLog[] }>(
      `/players/${encodedTag}/battlelog`
    );
    return response.data.items;
  },

  /**
   * Get player rankings by trophies.
   */
  async getPlayerRankings(limit: number = 200): Promise<Player[]> {
    const response = await apiClient.get<{ items: Player[] }>(
      `/rankings/global/players?limit=${limit}`
    );
    return response.data.items;
  },

  /**
   * Get club rankings.
   */
  async getClubRankings(limit: number = 200): Promise<Club[]> {
    const response = await apiClient.get<{ items: Club[] }>(
      `/rankings/global/clubs?limit=${limit}`
    );
    return response.data.items;
  },
};

export default brawlStarsAPI;
