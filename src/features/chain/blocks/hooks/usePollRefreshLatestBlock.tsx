import { useCallback, useEffect, useState } from 'react';
import { useStoreContext } from '../../../../store/useStore';

export type OnBeforeIntervalCallback = (intervalCount: number) => void;
// refresh interval in ms
export const REFRESH_INTERVAL = 10000;
export const usePollRefreshLatestBlock = (
  onBeforeInterval?: OnBeforeIntervalCallback
): void => {
  const [, dispatch] = useStoreContext();
  const [intervalCount, setIntervalCount] = useState<number>(0);
  const loadLatestBlock = useCallback(() => {
    dispatch({
      type: 'LOAD_LATEST_BLOCK',
    });
  }, []);

  useEffect(() => {
    loadLatestBlock();
  }, []);

  const handleInterval = useCallback(() => {
    if (onBeforeInterval) onBeforeInterval(intervalCount);
    loadLatestBlock();
    setIntervalCount((intervalCount) => intervalCount + 1);
  }, [onBeforeInterval, intervalCount]);

  useEffect(() => {
    const intervalId = setInterval(handleInterval, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);
};
