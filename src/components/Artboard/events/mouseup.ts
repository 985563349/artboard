import type { Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { KonvaEventObject } from 'konva/lib/Node';

import { ActionTypes } from '@/constants/action-types';
import { toggleIsDrawing, updateShape } from '@/store';
import type { RootState } from '@/store';

const mouseup = (
  e: KonvaEventObject<MouseEvent>,
  rootState: RootState,
  dispatch: Dispatch<AnyAction>
) => {
  const { app, shape } = rootState;
  const { actionType } = app;
  const shapes = shape.present;

  const commands: Partial<Record<ActionTypes, VoidFunction>> = {
    [ActionTypes.line]: () => {
      let shape = shapes.at(-1);
      // draw end generation history
      if (shape?.type === 'line') {
        dispatch(updateShape({ id: shape.id, shape: { ...shape } }));
      }
      dispatch(toggleIsDrawing(false));
    },

    [ActionTypes.eraser]: () => {
      let shape = shapes.at(-1);
      // draw end generation history
      if (shape?.type === 'eraser') {
        dispatch(updateShape({ id: shape.id, shape: { ...shape } }));
      }
      dispatch(toggleIsDrawing(false));
    },
  };

  if (actionType) {
    commands[actionType]?.();
  }
};

export default mouseup;
