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

export type ShapeState = {
  selectedShapeKey?: string;
  shapes: ShapeType[];
};

const initialState: ShapeState = {
  selectedShapeKey: undefined,
  shapes: [],
};

export const shapeSlice = createSlice({
  name: 'shape',
  initialState,
  reducers: {
    addShape: (state, action: PayloadAction<ShapeType>) => {
      state.shapes.push(action.payload);
    },
    updateShape: (state, action: PayloadAction<{ id: string; shape: ShapeType }>) => {
      const { id, shape } = action.payload;
      state.shapes.splice(state.shapes.findIndex((item) => item.id === id) >>> 0, 1, shape);
    },
    selectShape: (state, action: PayloadAction<string>) => {
      state.selectedShapeKey = action.payload;
    },
    unselectShape: (state) => {
      state.selectedShapeKey = undefined;
    },
  },
});

export const { addShape, updateShape, selectShape, unselectShape } = shapeSlice.actions;

export const selectShapes = (state: RootState) => state.shape.present.shapes;
export const selectSelectedShapeKey = (state: RootState) => state.shape.present.selectedShapeKey;

export default shapeSlice.reducer;
