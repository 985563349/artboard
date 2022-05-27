import { configureStore } from '@reduxjs/toolkit';
import undoable from 'redux-undo';
import appReducer from './reducers/app';
import shapeReducer from './reducers/shape';

export const store = configureStore({
  reducer: {
    app: appReducer,
    shape: undoable(shapeReducer),
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
