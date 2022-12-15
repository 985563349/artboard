import type { Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { KonvaEventObject } from 'konva/lib/Node';

import { ActionTypes } from '@/constants/action-types';
import { updateShape } from '@/store';
import type { RootState } from '@/store';

const mousemove = (
  e: KonvaEventObject<MouseEvent>,
  rootState: RootState,
  dispatch: Dispatch<AnyAction>
) => {
  const { app, shape } = rootState;
  const { isDrawing, actionType } = app;
  const shapes = shape.present;

  const commands: Partial<Record<ActionTypes, VoidFunction>> = {
    [ActionTypes.line]: () => {
      if (isDrawing === false) return;
      const point = e.target.getStage()?.getPointerPosition();
      if (point) {
        let shape = shapes.at(-1);
        if (shape?.type === 'line') {
          dispatch(
            updateShape({
              id: shape.id,
              shape: { ...shape, points: shape.points.concat([point.x, point.y]) },
            })
          );
        }
      }
    },

    [ActionTypes.eraser]: () => {
      if (isDrawing === false) return;
      const point = e.target.getStage()?.getPointerPosition();
      if (point) {
        let shape = shapes.at(-1);
        if (shape?.type === 'eraser') {
          dispatch(
            updateShape({
              id: shape.id,
              shape: { ...shape, points: shape.points.concat([point.x, point.y]) },
            })
          );
        }
      }
    },
  };

  const clickedOnEmpty = e.target === e.target.getStage();

  if (clickedOnEmpty && actionType) {
    commands[actionType]?.();
  }
};

export default mousemove;
