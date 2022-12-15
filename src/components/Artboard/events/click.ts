import type { Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { KonvaEventObject } from 'konva/lib/Node';

import { ActionTypes } from '@/constants/action-types';
import { toggleIsDrawing, addShape, updateShape } from '@/store';
import type { RootState } from '@/store';
import {
  createTextShape,
  createSimpleLineShape,
  createAreaShape,
  createRulerShape,
} from '../creates';

const click = (
  e: KonvaEventObject<MouseEvent>,
  rootState: RootState,
  dispatch: Dispatch<AnyAction>
) => {
  const { app, shape } = rootState;
  const { isDrawing, actionType } = app;
  const shapes = shape.present;

  const commands: Partial<Record<ActionTypes, VoidFunction>> = {
    [ActionTypes.text]: () => {
      const point = e.target.getStage()?.getPointerPosition();

      if (point) {
        const { x, y } = point;
        dispatch(addShape(createTextShape(x, y)));
      }
    },

    [ActionTypes.simpleLine]: () => {
      const point = e.target.getStage()?.getPointerPosition();

      if (point) {
        const { x, y } = point;
        let shape = shapes.at(-1);

        if (isDrawing === false || shape?.type !== 'simpleLine') {
          dispatch(toggleIsDrawing(true));
          dispatch(addShape(createSimpleLineShape([x, y])));
        } else {
          dispatch(
            updateShape({
              id: shape.id,
              shape: { ...shape, points: shape.points.concat([x, y]) },
            })
          );
        }
      }
    },

    [ActionTypes.area]: () => {
      const point = e.target.getStage()?.getPointerPosition();

      if (point) {
        const { x, y } = point;
        let shape = shapes.at(-1);

        if (isDrawing === false || shape?.type !== 'area') {
          dispatch(toggleIsDrawing(true));
          dispatch(addShape(createAreaShape([x, y])));
        } else {
          dispatch(
            updateShape({
              id: shape.id,
              shape: { ...shape, points: shape.points.concat([x, y]) },
            })
          );
        }
      }
    },

    [ActionTypes.ruler]: () => {
      const point = e.target.getStage()?.getPointerPosition();

      if (point) {
        const { x, y } = point;
        // Create an anchor
        const points = [x - 60, y, x + 60, y];
        dispatch(addShape(createRulerShape(points)));
      }
    },
  };

  const clickedOnEmpty = e.target === e.target.getStage();

  if (clickedOnEmpty && actionType) {
    commands[actionType]?.();
  }
};

export default click;
