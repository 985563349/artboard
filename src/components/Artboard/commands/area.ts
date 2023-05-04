import type { Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { KonvaEventObject } from 'konva/lib/Node';

import { toggleIsDrawing, addShape, updateShape } from '@/store';
import type { RootState } from '@/store';

import { createAreaShape } from '../creates';

export default (rootState: RootState, dispatch: Dispatch<AnyAction>) => {
  const { app, shape } = rootState;
  const { isDrawing } = app;
  const shapes = shape.present;

  return {
    click: (e: KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      const point = e.target.getStage()?.getPointerPosition();

      if (clickedOnEmpty && point) {
        const { x, y } = point;
        let shape = shapes.at(-1);

        if (isDrawing === false || shape?.type !== 'area') {
          dispatch(toggleIsDrawing(true));
          dispatch(addShape(createAreaShape([x, y])));
        } else {
          dispatch(
            updateShape({
              id: shape.id,
              attrs: { points: shape.points.concat([x, y]) },
            })
          );
        }
      }
    },
  };
};
