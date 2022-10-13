import { useCallback } from 'react';
import { useDependencyContext } from '../../../providers/DependencyProvider';
import { Effect } from '../../../store/useStore';
import { ActiveAccount } from './useWalletStore';

export const useWalletEffects = (): Effect => {
  const { dependencies } = useDependencyContext();

  return useCallback<Effect>(
    (state, action, dispatch) => {
      switch (action.type) {
        case 'CHECK_ACTIVE_ACCOUNT': {
          return (async () => {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlSearchParams.entries());

            const activeAccountFromURL: ActiveAccount | undefined =
              params.address
                ? {
                    address: params.address,
                  }
                : undefined;

            const activeAccount =
              activeAccountFromURL ??
              (await dependencies.dAppClient.getActiveAccount());

            dispatch({
              type: 'SET_ACTIVE_ACCOUNT',
              payload: { activeAccount },
            });
          })().catch(console.error);
        }
        case 'CONNECT_ACTIVE_ACCOUNT': {
          return (async () => {
            let activeAccount =
              await dependencies.dAppClient.getActiveAccount();

            if (activeAccount === null || activeAccount === undefined) {
              await dependencies.dAppClient.requestPermissions();
              activeAccount = await dependencies.dAppClient.getActiveAccount();
            }

            if (activeAccount === null || activeAccount === undefined)
              throw new Error('Error while connecting your account');

            dispatch({
              type: 'SET_ACTIVE_ACCOUNT',
              payload: {
                activeAccount: {
                  address: activeAccount.address,
                },
              },
            });
          })().catch(console.error);
        }
        case 'DISCONNECT_ACTIVE_ACCOUNT': {
          return (async () => {
            await dependencies.dAppClient.clearActiveAccount();
            dispatch({ type: 'SET_ACTIVE_ACCOUNT' });
          })().catch(console.error);
        }
      }
    },
    [dependencies]
  );
};
