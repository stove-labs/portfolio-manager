import { HistoricalPeriod } from '../../../components/TokenBalanceWidget/TokenBalanceWidgetSettings/TokenBalanceWidgetSettings';

export type Payload = Record<
  string,
  {
    timestamp: string;
    level: string;
  }
>;
export type PayloadPromise = Promise<Payload>;
export interface SettingsItem {
  timestamp: string;
  historicalPeriod: HistoricalPeriod;
}

export type Settings = Record<string, SettingsItem>;

/**
 * Get latest block level and timestamp
 * @returns latest block level and timestamp
 */
export const fetchBlock = async (settings: Settings): Promise<Payload> => {
  const [[recordId, data]] = Object.entries(settings);
  const level: string = await fetchBlockLevel(data.timestamp);
  const timestamp: string = await fetchBlockTimestamp(level);

  const payload: Payload = {
    [recordId]: {
      timestamp,
      level,
    },
  };

  return payload;
};

/**
 * Get latest block level
 * @param {string} timestamp - ISO timestamp
 * @returns latest block level
 */
export const fetchBlockLevel = async (timestamp: string): Promise<string> => {
  const response = await fetch(`https://api.tzkt.io/v1/blocks/${timestamp}`);
  if (!response.ok) throw new Error(response.statusText);
  // returns block count (which starts from 1), but we need level (which starts from 0)
  const data = (await response.json()) as {
    level: string;
  };

  return data.level;
};

/**
 * Get latest block level
 * @param {string} level - block level
 * @returns latest block level
 */
export const fetchBlockTimestamp = async (level: string): Promise<string> => {
  const response = await fetch(
    `https://api.tzkt.io/v1/blocks/?level=${level}&select=timestamp`
  );
  if (!response.ok) throw new Error(response.statusText);
  const timestamp: string = ((await response.json()) as string[])[0];

  return timestamp;
};
