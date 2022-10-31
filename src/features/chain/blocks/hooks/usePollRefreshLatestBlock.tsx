import { useCallback, useEffect, useState } from 'react';
import { useStoreContext } from '../../../../store/useStore';
import { loadLatestBlock as loadLatestBlockAction } from '../store/useBlocksActions';

export interface UsePollRefreshLatestBlockReturn {
  countdown: number;
}
export type OnBeforeIntervalCallback = (intervalCount: number) => void;
// refresh interval in ms
export const REFRESH_INTERVAL = 30 * 1000 * 9999;
export const COUNTDOWN_INTERVAL = 1000;
export const usePollRefreshLatestBlock = (
  onBeforeInterval?: OnBeforeIntervalCallback
): UsePollRefreshLatestBlockReturn => {
  const [, dispatch] = useStoreContext();
  const [intervalCount, setIntervalCount] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(REFRESH_INTERVAL);
  const loadLatestBlock = useCallback(() => {
    dispatch(loadLatestBlockAction());
  }, []);

  useEffect(() => {
    loadLatestBlock();
  }, []);

  const handleInterval = useCallback(() => {
    // trigger a callback before running the interval logic
    if (onBeforeInterval) onBeforeInterval(intervalCount);
    // load latest block as part of the interval logic
    loadLatestBlock();
    // keep track of interval count for callback purposes
    setIntervalCount((intervalCount) => intervalCount + 1);
    // reset countdown
    setCountdown(REFRESH_INTERVAL);
  }, [onBeforeInterval, intervalCount]);

  const handleCountdownTick = useCallback(() => {
    setCountdown((countdown) => {
      // if it reaches 0 thenreset it
      if (countdown === 0) return REFRESH_INTERVAL;
      // if it's still running, decrease it by one tick
      return countdown - COUNTDOWN_INTERVAL;
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(handleInterval, REFRESH_INTERVAL);
    const countdownId = setInterval(handleCountdownTick, COUNTDOWN_INTERVAL);
    return () => {
      clearInterval(intervalId);
      clearInterval(countdownId);
    };
  }, [handleInterval]);

  return { countdown };
};
