import config from './../../../../config/config/environment';

export type ID = string;
export type Level = string;
// should be used as ISO string
export type Timestamp = string;

export interface Block {
  id: ID;
  level: Level;
  timestamp: Timestamp;
}

export const GET_BLOCKS_URL = `${config.API_URL}/v1/blocks`;

export interface LoadBlockAtIdentifierResponse {
  level: string;
  timestamp: string;
}

// universal identifier for a block used by the api
// could be Timestamp or Level in our case
export type BlockIdentifier = Timestamp | Level;

/**
 *
 * @param identifier
 * @returns
 */
export const fetchBlockAtIdentifier = async (
  identifier: BlockIdentifier
): Promise<Block> => {
  const response = await fetch(GET_BLOCKS_URL + `/${identifier}`);
  if (!response.ok) throw new Error(await response.text());
  const body =
    await (response.json() as Promise<LoadBlockAtIdentifierResponse>);

  const block: Block = {
    id: body.level,
    level: body.level,
    // convert ISO datetime to UNIX timestamp
    timestamp: new Date(body.timestamp).getTime().toString(),
  };
  return block;
};

export const GET_LATEST_BLOCK_COUNT_URL = GET_BLOCKS_URL + `/count`;

/**
 * Fetches the current block count (NOT LEVEL, level is count - 1)
 * @returns Promise<string>
 */
export const fetchBlockCount = async (): Promise<string> => {
  // load the block count
  const response = await fetch(GET_LATEST_BLOCK_COUNT_URL);
  if (!response.ok) throw new Error(await response.text());
  const body = await response.text();
  const count = body.toString();
  return count;
};

/**
 * Loads the latest available block from the API
 * @returns Promise<Block>
 */
export const fetchLatestBlock = async (): Promise<Block> => {
  const count = await fetchBlockCount();
  const level = `${Number(count) - 1}`;
  // load the block from the level loaded previously
  const block = await fetchBlockAtIdentifier(level);
  return block;
};
