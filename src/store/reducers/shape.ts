import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../configureStore';

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
    updateShape: (state, action: PayloadAction<{ id: string; attrs: Partial<ShapeState> }>) => {
      const { id, attrs } = action.payload;
      const index = state.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.splice(index, 1, { ...state[index], ...attrs } as ShapeState);
      }
    },
  },
});

export const { addShape, updateShape } = shapeSlice.actions;

export const selectShapes = (state: RootState) => state.shape.present;

export default shapeSlice.reducer;
