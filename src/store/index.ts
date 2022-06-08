export { store } from './configureStore';
export type { RootState, AppDispatch } from './configureStore';

export {
  toggleActionType,
  toggleLock,
  toggleDraggable,
  toggleIsDrawing,
  selectActionType,
  selectDraggable,
  selectLock,
  selectIsDrawing,
} from './reducers/app';

export { addShape, updateShape, selectShapes } from './reducers/shape';
