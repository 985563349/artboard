export { store } from './configureStore';
export type { RootState, AppDispatch } from './configureStore';

export { toggleLock, toggleIsDrawing, toggleActionType } from './reducers/app';
export { addShape, toggleShape } from './reducers/shape';
