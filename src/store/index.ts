export { store } from './configureStore';
export type { RootState, AppDispatch } from './configureStore';

export {
  toggleActionType,
  toggleLock,
  toggleIsDrawing,
  selectActionType,
  selectLock,
  selectIsDrawing,
} from './reducers/app';

export { addShape, updateShape, selectShapes } from './reducers/shape';
