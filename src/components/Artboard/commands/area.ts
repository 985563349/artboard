import type konva from 'konva';

import { toggleIsDrawing, addShape, updateShape } from '@/store';
import type { AppStore } from '@/store';

import { createAreaShape } from '../creates';

export default (store: AppStore) => {
  const dispatch = store.dispatch;

  const { app, shape } = store.getState();
  const { isDrawing } = app;
  const shapes = shape.present;

  return {
    click: (e: konva.KonvaEventObject<MouseEvent>) => {
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
