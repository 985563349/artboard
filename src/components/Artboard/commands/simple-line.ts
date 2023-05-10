import type Konva from 'konva';

import { toggleIsDrawing, addShape, updateShape } from '@/store';
import type { AppStore } from '@/store';

import { createSimpleLineShape } from '../creates';

export default (store: AppStore) => {
  const dispatch = store.dispatch;

  const { app, shape } = store.getState();
  const { isDrawing } = app;
  const shapes = shape.present;

  return {
    click: (e: Konva.KonvaEventObject<MouseEvent>) => {
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
              attrs: { points: shape.points.concat([x, y]) },
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
