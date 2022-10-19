export interface Token {
  id: string;
  name: string;
  symbol: string;
  contract: {
    address: string;
  };
  metadata: {
    decimals: string;
  };
  pool?: {
    address: string;
  };
}

export const tokens: Record<string, Token> = {
  '0': {
    id: '0',
    name: 'Tezos',
    symbol: 'XTZ',
    contract: {
      address: '0',
    },
    metadata: {
      decimals: '6',
    },
  },
  '42290944933889': {
    id: '42290944933889',
    name: 'Kolibri USD',
    symbol: 'kUSD',
    contract: {
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
    },
    metadata: {
      decimals: '18',
    },
    pool: {
      address: 'KT1K4EwTpbvYN9agJdjpyJm4ZZdhpUNKB3F6',
    },
  },
  '74079757402113': {
    id: '74079757402113',
    name: 'Quipuswap',
    symbol: 'QUIPU',
    contract: {
      address: 'KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb',
    },
    metadata: {
      decimals: '6',
    },
    pool: {
      address: 'KT1X3zxdTzPB9DgVzA3ad6dgZe9JEamoaeRy',
    },
  },
  '24975299837953': {
    id: '24975299837953',
    name: 'tzBTC',
    symbol: 'tzBTC',
    contract: {
      address: 'KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn',
    },
    metadata: {
      decimals: '8',
    },
    pool: {
      address: 'KT1WBLrLE2vG8SedBqiSJFm4VVAZZBytJYHc',
    },
  },
};
