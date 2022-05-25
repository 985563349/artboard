export { store } from './configureStore';
export type { RootState, AppDispatch } from './configureStore';

export {
  toggleLock,
  toggleIsDrawing,
  toggleActionType,
  selectActionType,
  selectLock,
  selectIsDrawing,
} from './reducers/app';

export {
  addShape,
  INCOGNITO_addShape,
  updateShape,
  INCOGNITO_updateShape,
  selectShapes,
} from './reducers/shape';
