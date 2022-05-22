import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ActionTypes } from '@/constants/action-types';

export interface AppState {
  actionType?: ActionTypes;
  lock: boolean;
}

const initialState: AppState = {
  actionType: ActionTypes.line,
  lock: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleActionType: (state, action: PayloadAction<ActionTypes | undefined>) => {
      state.actionType = action.payload;
    },
    toggleLock: (state, action: PayloadAction<boolean>) => {
      state.lock = action.payload;
    },
  },
});

export const { toggleActionType, toggleLock } = appSlice.actions;

export default appSlice.reducer;
