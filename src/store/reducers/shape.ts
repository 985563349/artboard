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
    updateShape: (
      state,
      action: PayloadAction<ArrayOrSingle<{ id: string; attrs: Partial<ShapeState> }>>
    ) => {
      const payload = Array.isArray(action.payload) ? action.payload : [action.payload];
      payload.forEach(({ id, attrs }) => {
        const index = state.findIndex((item) => item.id === id);
        if (index !== -1) {
          state[index] = { ...state[index], ...attrs } as ShapeState;
        }
      });
    },
    deleteShape: (state, action: PayloadAction<ArrayOrSingle<string>>) => {
      const payload = Array.isArray(action.payload) ? action.payload : [action.payload];
      return state.filter((shape) => !payload.includes(shape.id));
    },
  },
});

export const { addShape, updateShape, deleteShape } = shapeSlice.actions;

export const selectShapes = (state: RootState) => state.shape.present;

export default shapeSlice.reducer;
