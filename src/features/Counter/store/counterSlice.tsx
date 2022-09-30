import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

export interface CounterState {
  value: number;
}

export const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootState): CounterState['value'] =>
  state.counter.value;

export default counterSlice.reducer;
