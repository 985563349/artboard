import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export type ShapeState =
  | Shape.Text
  | Shape.Line
  | Shape.SimpleLine
  | Shape.Area
  | Shape.Image
  | Shape.Rule
  | Shape.Eraser;

const initialState: ShapeState[] = [];

export const shapeSlice = createSlice({
  name: 'shape',
  initialState,
  reducers: {
    addShape: (state, action: PayloadAction<ShapeState>) => {
      state.push(action.payload);
    },
    INCOGNITO_addShape(state, action: PayloadAction<ShapeState>) {
      state.push(action.payload);
    },
    updateShape: (state, action: PayloadAction<{ id: string; shape: ShapeState }>) => {
      const { id, shape } = action.payload;
      state.splice(state.findIndex((item) => item.id === id) >>> 0, 1, shape);
    },
    INCOGNITO_updateShape: (state, action: PayloadAction<{ id: string; shape: ShapeState }>) => {
      const { id, shape } = action.payload;
      state.splice(state.findIndex((item) => item.id === id) >>> 0, 1, shape);
    },
  },
});

export const { addShape, INCOGNITO_addShape, updateShape, INCOGNITO_updateShape } =
  shapeSlice.actions;

export const selectShapes = (state: RootState) => state.shape.present;

export default shapeSlice.reducer;
