import { DAppClient } from '@airgap/beacon-dapp';

export const useDappClient = (): DAppClient => {
  return new DAppClient({ name: 'Portfolio Manager' });
};
