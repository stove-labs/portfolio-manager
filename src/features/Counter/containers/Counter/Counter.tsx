import React from 'react';
import { useStoreContext } from '../../../../store/useStore';
import { Counter as CounterComponent } from './../../components/Counter/Counter';
export const Counter: React.FC = () => {
  const [state, dispatch] = useStoreContext();

  return (
    <CounterComponent
      count={state.counter.count}
      onDecrement={() => dispatch({ type: 'DECREMENT' })}
      onIncrement={(amount) =>
        dispatch({ type: 'INCREMENT_BY', payload: { amount } })
      }
      onIncrementAsync={(amount) =>
        dispatch({ type: 'INCREMENT_BY_ASYNC', payload: { amount } })
      }
    />
  );
};
