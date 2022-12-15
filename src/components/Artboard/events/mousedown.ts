import type { Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { KonvaEventObject } from 'konva/lib/Node';

import { ActionTypes } from '@/constants/action-types';
import { toggleIsDrawing, addShape } from '@/store';
import type { RootState } from '@/store';
import { createLineShape, createEraserShape } from '../creates';

const mousedown = (
  e: KonvaEventObject<MouseEvent>,
  rootState: RootState,
  dispatch: Dispatch<AnyAction>
) => {
  const { app } = rootState;
  const { actionType } = app;

  const commands: Partial<Record<ActionTypes, VoidFunction>> = {
    [ActionTypes.line]: () => {
      const point = e.target?.getStage()?.getPointerPosition();

      if (point) {
        const { x, y } = point;
        dispatch(toggleIsDrawing(true));
        dispatch(addShape(createLineShape([x, y])));
      }
    },

    [ActionTypes.eraser]: () => {
      const point = e.target?.getStage()?.getPointerPosition();

      if (point) {
        const { x, y } = point;
        dispatch(toggleIsDrawing(true));
        dispatch(addShape(createEraserShape([x, y])));
      }
    },
  };

  const clickedOnEmpty = e.target === e.target.getStage();

  if (clickedOnEmpty && actionType) {
    commands[actionType]?.();
  }
};

export default mousedown;
