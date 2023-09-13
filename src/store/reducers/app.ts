import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ActionTypes } from '@/constants/action-types';
import type { RootState } from '../configureStore';

export interface AppState {
  actionType: ActionTypes;
  lock: boolean;
  isDrawing: boolean;
  drag: {
    draggable: boolean;
    x: number;
    y: number;
  };
  panel: {
    stroke: string;
    background: string;
    opacity: number;
    strokeWidth: number;
    fontSize: number;
  };
}

const initialState: AppState = {
  actionType: ActionTypes.selection,
  lock: false,
  isDrawing: false,
  drag: {
    draggable: false,
    x: 0,
    y: 0,
  },
  panel: {
    stroke: '#ff4400',
    background: '#ff4400',
    opacity: 1,
    strokeWidth: 1,
    fontSize: 32,
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleActionType: (state, action: PayloadAction<ActionTypes>) => {
      state.actionType = action.payload;
    },
    toggleLock: (state, action: PayloadAction<boolean>) => {
      state.lock = action.payload;
    },
    toggleIsDrawing: (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload;
    },
    updateDrag: (state, action: PayloadAction<Partial<AppState['drag']>>) => {
      state.drag = { ...state.drag, ...action.payload };
    },
    updatePanel: (state, action: PayloadAction<Partial<AppState['panel']>>) => {
      state.panel = { ...state.panel, ...action.payload };
    },
  },
});

export const { toggleActionType, toggleLock, toggleIsDrawing, updateDrag, updatePanel } =
  appSlice.actions;

export const selectActionType = (state: RootState) => state.app.actionType;
export const selectLock = (state: RootState) => state.app.lock;
export const selectIsDrawing = (state: RootState) => state.app.isDrawing;
export const selectDrag = (state: RootState) => state.app.drag;
export const selectPanel = (state: RootState) => state.app.panel;

export default appSlice.reducer;
