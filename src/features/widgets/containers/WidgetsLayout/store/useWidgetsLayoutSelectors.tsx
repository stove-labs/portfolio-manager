import { useMemo } from 'react';
import { useStoreContext } from '../../../../../store/useStore';
import { WidgetsLayoutState } from './useWidgetsLayoutStore';

export const useSelectWidgetsLayout = (): WidgetsLayoutState => {
  const [state] = useStoreContext();
  return useMemo(() => state.settings, [state]);
};
