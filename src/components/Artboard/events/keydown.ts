import type { Dispatch, AnyAction } from '@reduxjs/toolkit';

import { ActionTypes } from '@/constants/action-types';
import { toggleIsDrawing } from '@/store';
import type { RootState } from '@/store';

const keydown = (
  e: React.KeyboardEvent<HTMLDivElement>,
  rootState: RootState,
  dispatch: Dispatch<AnyAction>
) => {
  const { app } = rootState;
  const { actionType } = app;

  const commands: Partial<Record<ActionTypes, VoidFunction>> = {
    [ActionTypes.simpleLine]: () => {
      if (['Enter', 'Escape'].includes(e.key)) {
        dispatch(toggleIsDrawing(false));
      }
    },
  };

  if (actionType) {
    commands[actionType]?.();
  }
};

export default keydown;
