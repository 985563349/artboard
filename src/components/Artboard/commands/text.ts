import type { Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { KonvaEventObject } from 'konva/lib/Node';

import { addShape, toggleIsDrawing } from '@/store';
import type { RootState } from '@/store';

import { createTextShape } from '../creates';

export default (rootState: RootState, dispatch: Dispatch<AnyAction>) => {
  const { isDrawing } = rootState.app;

  return {
    click: (e: KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      const point = e.target.getStage()?.getPointerPosition();

      if (isDrawing) {
        dispatch(toggleIsDrawing(false));
        return;
      }

      if (clickedOnEmpty && point) {
        dispatch(toggleIsDrawing(true));

        const { x, y } = point;
        const input = document.createElement('input');

        input.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          font-size: ${32}px;
          margin: 0;
          padding: 0;
          outline: none;
          color: #f40;
          border: none;
          background: none;
        `;

        input.onkeydown = (e) => {
          if (e.key === 'Escape') {
            input.blur();
          }
        };

        input.onblur = (e) => {
          const text = (e.target as HTMLInputElement).value;
          if (text.trim().length) {
            dispatch(addShape(createTextShape(x, y, text)));
          }
          input.remove();
        };

        document.body.appendChild(input);
        input.focus();
      }
    },
  };
};
