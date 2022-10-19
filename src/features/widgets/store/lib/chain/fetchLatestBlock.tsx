export interface Payload {
  level: string;
  timestamp: string;
}
export type PayloadPromise = Promise<Payload>;

/**
 * Get latest block level and timestamp
 * @returns latest block level and timestamp
 */
export const fetchLatestBlock = async (): Promise<Payload> => {
  const level: string = await fetchLatestBlockLevel();
  const timestamp: string = await fetchBlockTimestamp(level);

  const payload: Payload = {
    timestamp,
    level,
  };

  return payload;
};

/**
 * Get latest block level
 * @returns latest block level
 */
export const fetchLatestBlockLevel = async (): Promise<string> => {
  const response = await fetch(`https://api.tzkt.io/v1/blocks/count`);
  if (!response.ok) throw new Error(response.statusText);
  // returns block count (which starts from 1), but we need level (which starts from 0)
  const level: string = String(((await response.json()) as number) - 1);

  return level;
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
