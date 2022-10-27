import constate from 'constate';
import { DAppClient } from '@airgap/beacon-sdk';
import { useState } from 'react';
import { useDappClient } from '../../Wallet/hooks/useDappClient';

export interface Dependencies {
  dAppClient: DAppClient;
}

export type WithDependencies<T = {}> = { dependencies: Dependencies } & T;

export const useDependencies = (): {
  dependencies: Dependencies;
  setDependencies: React.Dispatch<React.SetStateAction<Dependencies>>;
} => {
  const [dependencies, setDependencies] = useState<Dependencies>({
    dAppClient: useDappClient(),
  });
  // TODO: add loading status for dependencies

  return { dependencies, setDependencies };
};

export const [DependencyProvider, useDependencyContext] =
  constate(useDependencies);
