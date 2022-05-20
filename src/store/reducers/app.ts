import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ActionTypes } from '../../constants/action-types';

export interface AppState {
  actionType: ActionTypes;
}

const initialState: AppState = {
  actionType: ActionTypes.line,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleActionType: (state, action: PayloadAction<ActionTypes>) => {
      state.actionType = action.payload;
    },
  },
});

export const { toggleActionType } = appSlice.actions;

export default appSlice.reducer;
