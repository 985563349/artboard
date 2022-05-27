import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ActionTypes } from '@/constants/action-types';
import type { RootState } from '../configureStore';

export interface AppState {
  actionType?: ActionTypes;
  lock: boolean;
  isDrawing: boolean;
}

const initialState: AppState = {
  actionType: ActionTypes.pick,
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

export const selectActionType = (state: RootState) => state.app.actionType;
export const selectLock = (state: RootState) => state.app.lock;
export const selectIsDrawing = (state: RootState) => state.app.isDrawing;

export default appSlice.reducer;
