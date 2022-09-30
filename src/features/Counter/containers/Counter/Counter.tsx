import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  decrement,
  incrementByAmount,
  selectCount,
} from '../../store/counterSlice';
import { Counter as CounterComponent } from './../../components/Counter/Counter';
export const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return (
    <CounterComponent
      count={count}
      onDecrement={() => dispatch(decrement())}
      onIncrement={(amount) => dispatch(incrementByAmount(amount))}
    />
  );
};
