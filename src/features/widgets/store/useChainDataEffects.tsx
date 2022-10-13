import { useCallback } from 'react';
import { Effect } from '../../../store/useStore';

export interface TokenBalanceResponse {
  token: { id: string };
  balance: string;
}

export const useChainDataEffects = (): Effect => {
  return useCallback<Effect>((state, action, dispatch) => {
    switch (action.type) {
      case 'LOAD_TOKENS_BALANCE': {
        return (async () => {
          fetch(
            `https://api.tzkt.io/v1/tokens/balances?token.id=${
              action.payload.id
            }&account=${
              state.wallet?.activeAccount?.address ?? ''
            }&metadata.decimals.ge=1`
          )
            .then(async (response) => {
              if (!response.ok) throw new Error(response.statusText);

              return (await response.json()) as TokenBalanceResponse[];
            })
            .then((responseData) => {
              console.log(responseData);

              const data = responseData.map((data) => {
                return {
                  id: `${data.token.id}`,
                  balance: data.balance,
                };
              })['0'];

              dispatch({
                type: 'LOAD_TOKENS_BALANCE_SUCCESS',
                payload: { ...data },
              });
            })
            .catch((error) => {
              dispatch({
                type: 'LOAD_TOKENS_BALANCE_FAILURE',
                payload: {
                  id: action.payload.id,
                  error,
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
            }?token.id=${action.payload.id}&account=${
              state.wallet?.activeAccount?.address ?? ''
            }&metadata.decimals.ge=1`
          )
            .then(async (response) => {
              if (!response.ok) throw new Error(response.statusText);

              return (await response.json()) as TokenBalanceResponse[];
            })
            .then((responseData) => {
              const data = responseData.map((data) => {
                return {
                  id: `${data.token.id}`,
                  level: action.payload.level,
                  balanceHistorical: data.balance,
                };
              })['0'];

              dispatch({
                type: 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS',
                payload: { ...data },
              });
            })
            .catch((error) => {
              dispatch({
                type: 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE',
                payload: {
                  id: action.payload.id,
                  level: action.payload.level,
                  error,
                },
              });
            });
        })();
      }
    }
  }, []);
};
