import type Konva from 'konva';

import { toggleIsDrawing, addShape, updateShape } from '@/store';
import type { AppStore } from '@/store';

import { createSimpleLineShape } from '../helpers/shape.helpers';

export default (store: AppStore) => {
  return {
    pointerdown: (e: Konva.KonvaEventObject<MouseEvent>) => {
      const dispatch = store.dispatch;
      const { app, shape } = store.getState();
      const shapes = shape.present;

      const { isDrawing } = app;
      const clickedOnEmpty = e.target === e.target.getStage();
      const point = e.target.getStage()?.getPointerPosition();

      if (!clickedOnEmpty || !point) return;

      const { x, y } = point;
      const currentShape = shapes.at(-1);

      if (isDrawing && currentShape?.type === 'simpleLine') {
        dispatch(
          updateShape({
            id: currentShape.id,
            attrs: { points: currentShape.points.concat([x, y]) },
          })
        );
      } else {
        dispatch(toggleIsDrawing(true));
        dispatch(addShape(createSimpleLineShape([x, y])));
      }
    },

    keydown: (e: React.KeyboardEvent<HTMLDivElement>) => {
      const dispatch = store.dispatch;

      if (['Escape'].includes(e.key)) {
        dispatch(toggleIsDrawing(false));
      }
    },
  };
};
