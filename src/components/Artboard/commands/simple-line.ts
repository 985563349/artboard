import type { Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { KonvaEventObject } from 'konva/lib/Node';

import { toggleIsDrawing, addShape, updateShape } from '@/store';
import type { RootState } from '@/store';
import { createSimpleLineShape } from '../creates';

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

    keydown: (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (['Escape'].includes(e.key)) {
        dispatch(toggleIsDrawing(false));
      }
    },
  };
};
