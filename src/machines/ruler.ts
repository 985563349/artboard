import type Konva from 'konva';

import { addShape } from '@/store';
import type { AppStore } from '@/store';

import { createRulerShape } from '../creates';

export default (store: AppStore) => {
  return {
    pointerdown: (e: Konva.KonvaEventObject<MouseEvent>) => {
      const dispatch = store.dispatch;

      const clickedOnEmpty = e.target === e.target.getStage();
      const point = e.target.getStage()?.getPointerPosition();

      if (!clickedOnEmpty || !point) return;

      // Create an anchor
      const { x, y } = point;
      const points = [x - 60, y, x + 60, y];
      dispatch(addShape(createRulerShape(points)));
    },
  };
};