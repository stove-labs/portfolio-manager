import constate from 'constate';
import { useCallback, useRef } from 'react';
import { NotVoid, uniqBy } from 'lodash';
import { Action, useStoreContext } from '../../../store/useStore';

export interface DispatchUniqueHook {
  addToDispatchQueue: (action: Action) => void;
  flushDispatchQueue: () => NotVoid;
}

export const actionUniqBy = (action: Action): string => JSON.stringify(action);

export const useDispatchUnique = (): DispatchUniqueHook => {
  const actions = useRef<Action[]>();
  const [, dispatch] = useStoreContext();

  const addToDispatchQueue = useCallback((action: Action) => {
    const newActions = [...(actions.current ?? []), action];
    actions.current = uniqBy(newActions, actionUniqBy);
  }, []);

  const flushDispatchQueue = useCallback(() => {
    if (!actions.current?.length) return;
    actions.current?.forEach(dispatch);
    // clear actions
    actions.current = [];
  }, [actions]);

  return {
    addToDispatchQueue,
    flushDispatchQueue,
  };
};

export const [DispatchUniqueProvider, useDispatchUniqueContext] =
  constate(useDispatchUnique);
