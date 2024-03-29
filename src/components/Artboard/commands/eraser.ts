import type Konva from 'konva';

import { toggleIsDrawing, addShape, updateShape } from '@/store';
import type { AppStore } from '@/store';

import { createEraserShape } from '../creates';

export default (store: AppStore) => {
  const dispatch = store.dispatch;

  const { app, shape } = store.getState();
  const { isDrawing } = app;
  const shapes = shape.present;

  return {
    pointerdown: (e: Konva.KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      const point = e.target?.getStage()?.getPointerPosition();

      if (clickedOnEmpty && point) {
        const { x, y } = point;
        dispatch(toggleIsDrawing(true));
        dispatch(addShape(createEraserShape([x, y])));
      }
    },

    pointermove: (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (!isDrawing) return;
      const point = e.target.getStage()?.getPointerPosition();

      if (point) {
        let shape = shapes.at(-1);
        if (shape?.type === 'eraser') {
          dispatch(
            updateShape({
              id: shape.id,
              attrs: { points: shape.points.concat([point.x, point.y]) },
            })
          );
        }
      }
    },

    pointerup: (e: Konva.KonvaEventObject<MouseEvent>) => {
      let shape = shapes.at(-1);
      // draw end generation history
      if (shape?.type === 'eraser') {
        dispatch(updateShape({ id: shape.id, attrs: { ...shape } }));
      }
      dispatch(toggleIsDrawing(false));
    },
  };
};
