import type konva from 'konva';

import { toggleIsDrawing, addShape, updateShape } from '@/store';
import type { AppStore } from '@/store';

import { createAreaShape } from '../helpers/shape.helpers';

export default (store: AppStore) => {
  return {
    pointerdown: (e: konva.KonvaEventObject<MouseEvent>) => {
      const dispatch = store.dispatch;
      const { app, shape } = store.getState();
      const shapes = shape.present;

      const { isDrawing } = app;
      const clickedOnEmpty = e.target === e.target.getStage();
      const point = e.target.getStage()?.getRelativePointerPosition();

      if (!clickedOnEmpty || !point) return;

      const { x, y } = point;
      const currentShape = shapes.at(-1);

      if (isDrawing && currentShape?.type === 'area') {
        dispatch(
          updateShape({
            id: currentShape.id,
            attrs: { points: currentShape.points.concat([x, y]) },
          })
        );
      } else {
        dispatch(toggleIsDrawing(true));
        dispatch(addShape(createAreaShape([x, y])));
      }
    },
  };
};
