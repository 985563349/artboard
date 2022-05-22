import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
    toggleShape: () => {},
  },
});

export const { addShape, toggleShape } = shapeSlice.actions;

export default shapeSlice.reducer;
