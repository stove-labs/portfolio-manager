import { useMemo } from 'react';
import { useStoreContext } from '../../../store/useStore';
import { ActiveAccount, WalletState } from './useWalletStore';

export const useSelectWallet = (): WalletState => {
  const [state] = useStoreContext();

  return useMemo(() => state.wallet, [state]);
};

export const useSelectActiveAccount = (): ActiveAccount | undefined => {
  const wallet = useSelectWallet();
  return useMemo(() => wallet.activeAccount, [wallet]);
};

export const useSelectActiveAccountAddress = (): string | undefined => {
  const activeAccount = useSelectActiveAccount();
  return useMemo(() => activeAccount?.address, [activeAccount]);
};
