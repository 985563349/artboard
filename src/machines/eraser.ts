import type Konva from 'konva';

import { toggleIsDrawing, addShape, updateShape } from '@/store';
import type { AppStore } from '@/store';

import { createEraserShape } from '../helpers/shape.helpers';

export default (store: AppStore) => {
  return {
    pointerdown: (e: Konva.KonvaEventObject<MouseEvent>) => {
      const dispatch = store.dispatch;

      const clickedOnEmpty = e.target === e.target.getStage();
      const point = e.target?.getStage()?.getRelativePointerPosition();

      if (!clickedOnEmpty || !point) return;

      const { x, y } = point;
      dispatch(toggleIsDrawing(true));
      dispatch(addShape(createEraserShape([x, y])));
    },

    pointermove: (e: Konva.KonvaEventObject<MouseEvent>) => {
      const dispatch = store.dispatch;
      const { app, shape } = store.getState();
      const shapes = shape.present;

      const { isDrawing } = app;
      const point = e.target.getStage()?.getRelativePointerPosition();

      if (!isDrawing || !point) return;

      const currentShape = shapes.at(-1);

      if (currentShape?.type !== 'eraser') return;

      dispatch(
        updateShape({
          id: currentShape.id,
          attrs: { points: currentShape.points.concat([point.x, point.y]) },
        })
      );
    },

    pointerup: (e: Konva.KonvaEventObject<MouseEvent>) => {
      const dispatch = store.dispatch;
      const { shape } = store.getState();
      const shapes = shape.present;

      const currentShape = shapes.at(-1);

      // draw end generation history
      if (currentShape?.type === 'eraser') {
        dispatch(updateShape({ id: currentShape.id, attrs: { ...currentShape } }));
      }
      dispatch(toggleIsDrawing(false));
    },
  };
};
