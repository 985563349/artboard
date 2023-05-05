import type { Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { KonvaEventObject } from 'konva/lib/Node';

import { addShape, toggleIsDrawing, updateShape } from '@/store';
import type { RootState } from '@/store';
import { createTextShape } from '../creates';

export default (rootState: RootState, dispatch: Dispatch<AnyAction>) => {
  const { isDrawing, panel } = rootState.app;

  return {
    click: (e: KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      const clickedOnText = e.target.getAttrs().type === 'text';
      const point = clickedOnText ? e.target.getAttrs() : e.target.getStage()?.getPointerPosition();

      if (isDrawing) {
        dispatch(toggleIsDrawing(false));
        return;
      }

      if ((clickedOnEmpty || clickedOnText) && point) {
        dispatch(toggleIsDrawing(true));

        const { x, y } = point;
        const input = document.createElement('input');

        input.style.cssText = `
          position: absolute;
          left: ${x}px;
          top: ${y}px;
          font-size: ${panel.fontSize}px;
          margin: 0;
          padding: 0;
          outline: none;
          color: ${panel.stroke};
          border: none;
          background: none;
        `;

        // if the current click is text, it is considered an editing operation
        if (clickedOnText) {
          input.value = e.target.getAttr('text');
          e.target.visible(false);
        }

        input.onkeydown = ({ key }) => {
          if (key === 'Escape') {
            input.blur();
          }
        };

        input.onblur = ({ target }) => {
          const text = (target as HTMLInputElement).value;

          if (clickedOnText) {
            e.target.visible(true);
            dispatch(updateShape({ id: e.target.getAttr('id'), attrs: { text } }));
          } else if (text.trim().length) {
            dispatch(
              addShape(
                createTextShape({ x, y, text, fill: panel.stroke, fontSize: panel.fontSize })
              )
            );
          }

          input.remove();
        };

        document.body.appendChild(input);
        input.focus();
        input.setSelectionRange(0, input.value.length);
      }
    },
  };
};
