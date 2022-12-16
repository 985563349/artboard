export { store } from './configureStore';
export type { RootState, AppDispatch } from './configureStore';

export {
  toggleActionType,
  toggleLock,
  toggleIsDrawing,
  updateDrag,
  selectActionType,
  selectLock,
  selectIsDrawing,
  selectDrag,
} from './reducers/app';

export { addShape, updateShape, selectShapes } from './reducers/shape';
