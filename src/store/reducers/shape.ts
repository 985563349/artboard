import { createSlice, createAction, isAnyOf } from '@reduxjs/toolkit';
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(addShape, INCOGNITO_addShape), (state, action) => {
        state.push(action.payload);
      })
      .addMatcher(isAnyOf(updateShape, INCOGNITO_updateShape), (state, action) => {
        const { id, shape } = action.payload;
        state.splice(state.findIndex((item) => item.id === id) >>> 0, 1, shape);
      });
  },
});

export const addShape = createAction<ShapeState>('addShape');
export const INCOGNITO_addShape = createAction<ShapeState>('INCOGNITO_addShape');
export const updateShape = createAction<{ id: string; shape: ShapeState }>('updateShape');
export const INCOGNITO_updateShape = createAction<{ id: string; shape: ShapeState }>(
  'INCOGNITO_updateShape'
);

export const selectShapes = (state: RootState) => state.shape.present;

export default shapeSlice.reducer;
