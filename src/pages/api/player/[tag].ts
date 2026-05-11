import { NextApiRequest, NextApiResponse } from 'next';
import brawlStarsAPI from '@/lib/brawlStarsAPI';
import { Analytics } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { tag } = req.query;

  if (!tag || typeof tag !== 'string') {
    return res.status(400).json({ error: 'Player tag is required' });
  }

  try {
    // Fetch live player data from Brawl Stars API
    const livePlayer = await brawlStarsAPI.getPlayer(tag);

    // TODO: Fetch historical snapshots from Supabase
    // const snapshots = await supabase
    //   .from('players')
    //   .select('*')
    //   .eq('tag', tag)
    //   .order('snapshot_date', { ascending: false })
    //   .limit(30);

    // TODO: Compute analytics from snapshots
    const analytics: Analytics = {
      dailyGains: 0,
      weeklyGains: 0,
      bestBrawler: livePlayer.brawlers?.[0]?.name || 'N/A',
      bestBrawlerWinRate: 0,
      modeWinRates: [],
      trophyTrend: [],
    };

    return res.status(200).json({
      live: livePlayer,
      analytics,
      snapshots: [],
    });
  } catch (error: any) {
    console.error('Error fetching player:', error);

    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Player not found' });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
}
