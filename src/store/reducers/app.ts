import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ActionTypes } from '@/constants/action-types';
import type { RootState } from '../configureStore';

export interface AppState {
  actionType: ActionTypes | null;
  lock: boolean;
  draggable: boolean;
  isDrawing: boolean;
}

const initialState: AppState = {
  actionType: null,
  lock: false,
  draggable: false,
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
    toggleDraggable: (state, action: PayloadAction<boolean>) => {
      state.draggable = action.payload;
    },
    toggleActionType: (state, action: PayloadAction<ActionTypes | null>) => {
      state.actionType = action.payload;
    },
  },
});

export const { toggleLock, toggleDraggable, toggleIsDrawing, toggleActionType } = appSlice.actions;

export const selectActionType = (state: RootState) => state.app.actionType;
export const selectDraggable = (state: RootState) => state.app.draggable;
export const selectLock = (state: RootState) => state.app.lock;
export const selectIsDrawing = (state: RootState) => state.app.isDrawing;

export default appSlice.reducer;
