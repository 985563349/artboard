import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../configureStore';

export type ShapeType =
  | Shape.Text
  | Shape.Line
  | Shape.SimpleLine
  | Shape.Area
  | Shape.Image
  | Shape.Rule
  | Shape.Eraser;

export type ShapeState = ShapeType[];

const initialState: ShapeState = [];

export const shapeSlice = createSlice({
  name: 'shape',
  initialState,
  reducers: {
    addShape: (state, action: PayloadAction<ShapeType>) => {
      state.push(action.payload);
    },
    updateShape: (state, action: PayloadAction<{ id: string; shape: ShapeType }>) => {
      const { id, shape } = action.payload;
      state.splice(state.findIndex((item) => item.id === id) >>> 0, 1, shape);
    },
  },
});

export const { addShape, updateShape } = shapeSlice.actions;

export const selectShapes = (state: RootState) => state.shape.present;

export default shapeSlice.reducer;
