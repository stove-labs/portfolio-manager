import { useEffect, useMemo, useState } from 'react';
import {
  EntityWithID,
  useStoreEvictContext,
} from '../../../store/providers/StoreEvictProvider';
import { WithStatus } from '../../chain/blocks/store/useBlocksStore';
// TODO: don't save last known in useState, but select it directly from the store instead
/**
 * Hook that returns the last 'known' data, where known means the
 * data has done fetching (SUCCESS | ERROR).
 *
 * It also marks data to be kept during the eviction process, this means that
 * it will persist at most 2 records - known and currently selected.
 *
 * If the currently selected entity isn't done loading, return the last known entity.
 * @param selected
 * @returns
 */
export const useLastKnown = <T extends EntityWithID>(
  selected: WithStatus<T> | undefined,
  resetKnown?: any
): {
  known: WithStatus<T> | undefined;
  selected: WithStatus<T> | undefined;
} => {
  const { keep } = useStoreEvictContext();
  const [known, setKnown] = useState<WithStatus<T> | undefined>();

  // each time 'resetKnown' changes, reset known
  useEffect(() => {
    setKnown(undefined);
  }, [resetKnown]);

  useEffect(() => {
    if (!known) return setKnown(selected);
    if (selected?.status === 'SUCCESS' || selected?.status === 'ERROR') {
      setKnown(selected);
    }
  }, [selected, known]);

  return useMemo(() => {
    return { known: keep(known), selected: keep(selected) };
  }, [known, selected]);
};
