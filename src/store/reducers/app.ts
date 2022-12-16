import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ActionTypes } from '@/constants/action-types';
import type { RootState } from '../configureStore';

export interface AppState {
  actionType: ActionTypes | null;
  lock: boolean;
  isDrawing: boolean;
  drag: {
    draggable: boolean;
    x: number;
    y: number;
  };
}

const initialState: AppState = {
  actionType: null,
  lock: false,
  isDrawing: false,
  drag: {
    draggable: false,
    x: 0,
    y: 0,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleActionType: (state, action: PayloadAction<ActionTypes | null>) => {
      state.actionType = action.payload;
    },
    toggleLock: (state, action: PayloadAction<boolean>) => {
      state.lock = action.payload;
    },
    toggleIsDrawing: (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload;
    },
    updateDrag: (state, action: PayloadAction<AppState['drag']>) => {
      state.drag = action.payload;
    },
  },
});

export const { toggleActionType, toggleLock, toggleIsDrawing, updateDrag } = appSlice.actions;

export const selectActionType = (state: RootState) => state.app.actionType;
export const selectLock = (state: RootState) => state.app.lock;
export const selectIsDrawing = (state: RootState) => state.app.isDrawing;
export const selectDrag = (state: RootState) => state.app.drag;

export default appSlice.reducer;
