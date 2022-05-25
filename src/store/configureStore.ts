import { configureStore } from '@reduxjs/toolkit';
import undoable, { excludeAction } from 'redux-undo';
import appReducer from './reducers/app';
import shapeReducer, { INCOGNITO_addShape, INCOGNITO_updateShape } from './reducers/shape';

export const store = configureStore({
  reducer: {
    app: appReducer,
    shape: undoable(shapeReducer, {
      filter: excludeAction([INCOGNITO_addShape.type, INCOGNITO_updateShape.type]),
    }),
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
