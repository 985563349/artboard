import type Konva from 'konva';

import { addShape } from '@/store';
import type { AppStore } from '@/store';

import { createRulerShape } from '../creates';

export default (store: AppStore) => {
  const dispatch = store.dispatch;

  return {
    pointerdown: (e: Konva.KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      const point = e.target.getStage()?.getPointerPosition();

      if (clickedOnEmpty && point) {
        const { x, y } = point;
        // Create an anchor
        const points = [x - 60, y, x + 60, y];
        dispatch(addShape(createRulerShape(points)));
      }
    },
  };
};
