import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ActionTypes } from '@/constants/action-types';

export interface AppState {
  actionType?: ActionTypes;
  lock: boolean;
  isDrawing: boolean;
}

const initialState: AppState = {
  actionType: ActionTypes.line,
  lock: false,
  isDrawing: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleLock: (state, action: PayloadAction<boolean>) => {
      state.lock = action.payload;
    },
    toggleIsDrawing: (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload;
    },
    toggleActionType: (state, action: PayloadAction<ActionTypes | undefined>) => {
      state.actionType = action.payload;
    },
  },
});

export const { toggleLock, toggleIsDrawing, toggleActionType } = appSlice.actions;

export default appSlice.reducer;
