import { Button, Input } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useStoreContext } from '../../../../store/useStore';
import { Settings } from '../Settings/Settings';
import {
  Token,
  TokenBalance,
  TokenBalanceHistorical,
} from '../TokenBalanceWidget/store/useTokenBalanceWidgetStore';
import { useDispatchUniqueContext } from '../../providers/DispatchUniqueProvider';
import { WidgetsLayoutState } from './store/useWidgetsLayoutStore';
import { WidgetsLayout as WidgetsLayoutComponent } from './../../components/WidgetsLayout/WidgetsLayout';

export const WidgetsLayout: React.FC = () => {
  const [state, dispatch] = useStoreContext();
  const { flushDispatchQueue } = useDispatchUniqueContext();

  useEffect(() => {
    flushDispatchQueue();
  }, []);

  const address = 'address';
  const historicalLevel = 2_600_000;

  useEffect(() => {
    dispatch({
      type: 'LOAD_TOKENS',
    });

    fetch(`https://api.tzkt.io/v1/tokens`)
      .then(async (response) => await response.json())
      .then((responseData) => {
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
        dispatch({ type: 'LOAD_TOKENS_FAILURE', payload: error });
      });
  }, []);

  useEffect(() => {
    dispatch({
      type: 'LOAD_TOKENS_BALANCE',
    });

    fetch(
      `https://api.tzkt.io/v1/tokens/balances?account=${
        state.wallet?.activeAccount?.address ??
        'tz1PWtaLXKiHXhXGvpuS8w4sVveNRKedTRSe'
      }`
    )
      .then(async (response) => await response.json())
      .then((responseData) => {
        const data: TokenBalance[] = responseData.map(
          (item: { token: { id: number }; balance: string }): TokenBalance => {
            return {
              id: `${item.token.id}`,
              balance: item.balance,
            };
          }
        );

        dispatch({ type: 'LOAD_TOKENS_BALANCE_SUCCESS', payload: { data } });
      })
      .catch((error) => {
        dispatch({ type: 'LOAD_TOKENS_BALANCE_FAILURE', payload: error });
      });
  }, [state.wallet?.activeAccount?.address]);

  useEffect(() => {
    dispatch({
      type: 'LOAD_TOKENS_BALANCE_HISTORICAL',
    });

    fetch(
      `https://api.tzkt.io/v1/tokens/historical_balances/${historicalLevel}?account=${
        state.wallet?.activeAccount?.address ??
        'tz1PWtaLXKiHXhXGvpuS8w4sVveNRKedTRSe'
      }`
    )
      .then(async (response) => await response.json())
      .then((responseData) => {
        const data: TokenBalanceHistorical[] = responseData.map(
          (item: {
            token: { id: number };
            balance: string;
          }): TokenBalanceHistorical => {
            return {
              id: `${item.token.id}`,
              balanceHistorical: item.balance,
            };
          }
        );

        dispatch({
          type: 'LOAD_TOKENS_BALANCE_HISTORICAL_SUCCESS',
          payload: { data },
        });
      })
      .catch((error) => {
        dispatch({
          type: 'LOAD_TOKENS_BALANCE_HISTORICAL_FAILURE',
          payload: error,
        });
      });
  }, [state.wallet?.activeAccount?.address]);

  useEffect(() => {
    window.localStorage.setItem('STATE_LAYOUT', JSON.stringify(state.settings));
  }, [state.settings]);

  const downloadSettings = (): void => {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(state.settings)], {
      type: 'text/plain',
    });
    a.href = URL.createObjectURL(file);
    a.download = `${address}-portfolio-dashboard-settings.json`;
    a.click();
  };

  const restoreSettings = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files?.[0]) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (e) => {
        const data = JSON.parse(
          e.target?.result?.toString() ?? ''
        ) as WidgetsLayoutState;
        if (!('widgets' in data && 'layout' in data)) return;

        if (data) {
          dispatch({
            type: 'SET_LAYOUT',
            payload: { layout: data.layout, widgets: data.widgets },
          });
        }
      };
    }
  };

  return (
    <>
      <Button onClick={() => downloadSettings()}>Download Settings</Button>
      <Input type={'file'} onChange={(e) => restoreSettings(e)}></Input>
      <Settings />
      <WidgetsLayoutComponent
        layout={state.settings.layout}
        widgets={state.settings.widgets}
        onLayoutChange={(layout) =>
          dispatch({ type: 'UPDATE_LAYOUT', payload: { layout } })
        }
        onWidgetRemove={(id) =>
          dispatch({ type: 'REMOVE_WIDGET', payload: { id } })
        }
      />
    </>
  );
};
