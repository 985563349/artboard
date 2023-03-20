import type { Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { KonvaEventObject } from 'konva/lib/Node';

import { addShape } from '@/store';
import type { RootState } from '@/store';

import { createRulerShape } from '../creates';

export default (rootState: RootState, dispatch: Dispatch<AnyAction>) => {
  return {
    click: (e: KonvaEventObject<MouseEvent>) => {
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
