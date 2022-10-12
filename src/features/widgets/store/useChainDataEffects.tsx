import { useCallback } from 'react';
import { Effect } from '../../../store/useStore';
import { Token } from './useChainDataStore';

export const useChainDataEffects = (): Effect => {
  return useCallback<Effect>((state, action, dispatch) => {
    switch (action.type) {
      case 'LOAD_TOKENS': {
        return (async () => {
          fetch(
            `https://api.tzkt.io/v1/tokens?limit=1000&account=${
              state.wallet?.activeAccount?.address ?? ''
            }&metadata.decimals.ge=1`
          )
            .then(async (response) => await response.json())
            .then((responseData) => {
              if (responseData.code !== undefined) throw responseData;

              const data: Token[] = responseData.map(
                (item: { id: number; contract: any; metadata: any }): Token => {
                  return {
                    id: `${item.id}`,
                    contract: item.contract,
                    metadata: item.metadata,
                  };
                }
              );

              dispatch({ type: 'LOAD_TOKENS_SUCCESS', payload: { data } });
            })
            .catch((error) => {
              dispatch({
                type: 'LOAD_TOKENS_FAILURE',
                payload: {
                  error: `${error?.code as string}: ${JSON.stringify(
                    error?.errors ?? {}
                  )}`,
                },
              });
            });
        })();
      }

      case 'LOAD_TOKENS_BALANCE': {
        return (async () => {
          fetch(
            `https://api.tzkt.io/v1/tokens/balances?token.id=${
              action.payload.tokenId
            }&account=${
              state.wallet?.activeAccount?.address ?? ''
            }&metadata.decimals.ge=1`
          )
            .then(async (response) => await response.json())
            .then((responseData) => {
              const data: { tokenId: string; balance: string } =
                responseData.map(
                  (item: { token: { id: number }; balance: string }) => {
                    return {
                      tokenId: `${item.token.id}`,
                      balance: item.balance,
                    };
                  }
                )['0'];

              dispatch({
                type: 'LOAD_TOKENS_BALANCE_SUCCESS',
                payload: { ...data },
              });
            })
            .catch((error) => {
              dispatch({
                type: 'LOAD_TOKENS_BALANCE_FAILURE',
                payload: {
                  tokenId: action.payload.tokenId,
                  error: `${error?.code as string}: ${JSON.stringify(
                    error?.errors ?? {}
                  )}`,
                },
              });
            });
        })();
      }

      case 'LOAD_TOKENS_BALANCE_HISTORICAL': {
        return (async () => {
          fetch(
            `https://api.tzkt.io/v1/tokens/historical_balances/${
              action.payload.level
            }?token.id=${action.payload.tokenId}&account=${
              state.wallet?.activeAccount?.address ?? ''
            }&metadata.decimals.ge=1`
          )
            .then(async (response) => await response.json())
            .then((responseData) => {
              if (responseData.code !== undefined) throw responseData;
              const data = responseData.map(
                (item: { token: { id: number }; balance: string }) => {
                  return {
                    tokenId: `${item.token.id}`,
                    level: action.payload.level,
                    balanceHistorical: item.balance,
                  };
                }
              )['0'];

              dispatch({
                type: 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS',
                payload: { ...data },
              });
            })
            .catch((error) => {
              dispatch({
                type: 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE',
                payload: {
                  tokenId: action.payload.tokenId,
                  level: action.payload.level,
                  error: `${error?.code as string}: ${JSON.stringify(
                    error?.errors ?? {}
                  )}`,
                },
              });
            });
        })();
      }
    }
  }, []);
};
