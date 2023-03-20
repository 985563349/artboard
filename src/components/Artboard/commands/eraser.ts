import type { Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { KonvaEventObject } from 'konva/lib/Node';

import { toggleIsDrawing, addShape, updateShape } from '@/store';
import type { RootState } from '@/store';
import { createEraserShape } from '../creates';

export default (rootState: RootState, dispatch: Dispatch<AnyAction>) => {
  const { app, shape } = rootState;
  const { isDrawing } = app;
  const shapes = shape.present;

  return {
    mousedown: (e: KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      const point = e.target?.getStage()?.getPointerPosition();

      if (clickedOnEmpty && point) {
        const { x, y } = point;
        dispatch(toggleIsDrawing(true));
        dispatch(addShape(createEraserShape([x, y])));
      }
    },

    mousemove: (e: KonvaEventObject<MouseEvent>) => {
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

    mouseup: (e: KonvaEventObject<MouseEvent>) => {
      let shape = shapes.at(-1);
      // draw end generation history
      if (shape?.type === 'eraser') {
        dispatch(updateShape({ id: shape.id, shape: { ...shape } }));
      }
      dispatch(toggleIsDrawing(false));
    },
  };
};
