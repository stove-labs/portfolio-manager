import constate from 'constate';
import { WritableDraft } from 'immer/dist/internal';
import { uniq } from 'lodash';
import { useCallback, useState } from 'react';
import { ID } from '../../features/chain/blocks/lib/blocks';
import { WithStatus } from '../../features/chain/blocks/store/useBlocksStore';
import { useStoreContext } from '../useStore';

export interface EntityWithID {
  id: ID;
}

export type Keep = <T extends EntityWithID>(
  entities: WithStatus<T> | undefined
) => WithStatus<T> | undefined;
export type Evict = () => void;

/**
 * Deletes keys from a record, if their ID isn't included in 'keepIDs'
 * @param entities
 * @param keepIDs
 * @returns entities
 */
export const evictEntities = <
  T extends WritableDraft<Record<ID, WithStatus<any>>>
>(
  entities: T,
  keepIDs: ID[]
): T => {
  Object.keys(entities).forEach((id) => {
    const keep = keepIDs.includes(id);
    // todo don't delete if loading
    const entity = entities[id];
    const isLoading = entity.status === 'LOADING';
    if (!keep && !isLoading) {
      delete entities[id];
    }
  });

  return entities;
};

/**
 * Hook used to keep track of entities of interest, stored as keepIDs.
 * This allows us to maintain a reference array of IDs that are being actively
 * used/consumed by the app. Which in returns allows us to evict/discard entities that aren't actively used by the app's selectors at the moment.
 * @returns { keep: Keep, evict: Evict }
 */
export const useStoreEvict = (): {
  keep: Keep;
  evict: Evict;
} => {
  const [, dispatch] = useStoreContext();
  const [, setKeepIDs] = useState<ID[]>([]);

  // marks an entity to be persisted/kept
  const keep = useCallback<Keep>(
    <T extends EntityWithID>(entity: WithStatus<T> | undefined) => {
      if (entity?.data && entity.data && entity.data.id) {
        // TODO: fix empty string fallback
        setTimeout(() => {
          setKeepIDs((keepIds) =>
            uniq(keepIds.concat([entity.data?.id ?? '']))
          );
        });
      }
      return entity;
    },
    []
  );

  /**
   * Triggers an action for each store to evict entities that
   * are not meant to be persisted going forward.
   *
   * Each store must handle it's own 'EVICT' implementation, specifying under which key the entities are stored. See 'evictEntities' for more information.
   */
  const evict = useCallback(() => {
    // evict IDs not included in keepIDs
    setTimeout(() => {
      setKeepIDs((keepIDs) => {
        // let the store know it needs to evict entities
        setTimeout(() => {
          dispatch({
            type: 'EVICT',
            payload: { keepIDs },
          });
        });

        // reset keep IDs
        return [];
      });
    });
  }, []);

  return {
    keep,
    evict,
  };
};

/**
 * Provider and context consumer function for the
 */
export const [StoreEvictProvider, useStoreEvictContext] =
  constate(useStoreEvict);
