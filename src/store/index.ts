export { store } from './configureStore';
export type { AppStore, AppDispatch, RootState } from './configureStore';

export {
  toggleActionType,
  toggleLock,
  toggleIsDrawing,
  updateDrag,
  updatePanel,
  updateSelectedShapes,
  selectActionType,
  selectLock,
  selectIsDrawing,
  selectDrag,
  selectPanel,
  selectSelectedShapes,
} from './reducers/app';

export { addShape, updateShape, selectShapes } from './reducers/shape';
