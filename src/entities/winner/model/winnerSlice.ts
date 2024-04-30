import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/appStore';
import { SortOrderType, WinnerType } from './types';

const initialState: WinnerType = {
  currentWinnerPage: 1,
  sortAndOrder: { sort: null, order: null },
};

export const winnerSlice = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    setWinnerCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentWinnerPage = action.payload;
    },
    sortWinners: (state, action: PayloadAction<SortOrderType>) => {
      state.sortAndOrder = action.payload;
    },
  },
});
export const selectedCurrentWinnerPage = (state: RootState) => state.winner.currentWinnerPage;
export const selectedOrder = (state: RootState) => state.winner.sortAndOrder;
export const { setWinnerCurrentPage, sortWinners } = winnerSlice.actions;
