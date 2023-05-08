import type { Dispatch, AnyAction } from '@reduxjs/toolkit';
import type { KonvaEventObject } from 'konva/lib/Node';

import { addShape, toggleIsDrawing, updatePanel, updateShape } from '@/store';
import type { RootState } from '@/store';
import { createTextShape } from '../creates';

export default (rootState: RootState, dispatch: Dispatch<AnyAction>) => {
  const { isDrawing, drag, panel } = rootState.app;

  return {
    click: (e: KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      const clickedOnText = e.target.getAttrs().type === 'text';

      const targetAttrs = clickedOnText
        ? e.target.getAttrs()
        : e.target.getStage()?.getPointerPosition();

      if (isDrawing) {
        dispatch(toggleIsDrawing(false));
        return;
      }

      if ((clickedOnEmpty || clickedOnText) && targetAttrs) {
        dispatch(toggleIsDrawing(true));

        const input = document.createElement('input');

        input.style.cssText = `
          position: absolute;
          left: ${targetAttrs.x + drag.x}px;
          top: ${targetAttrs.y + drag.y}px;
          font-size: ${clickedOnText ? targetAttrs.fontSize : panel.fontSize}px;
          margin: 0;
          padding: 0;
          outline: none;
          color: ${clickedOnText ? targetAttrs.fill : panel.stroke};
          border: none;
          background: none;
        `;

        // if the current click is text, it is considered an editing operation
        if (clickedOnText) {
          input.value = targetAttrs.text;
          dispatch(updatePanel({ fontSize: targetAttrs.fontSize, stroke: targetAttrs.fill }));
          e.target.visible(false);
        }

        const handleBlur = ({ target }: FocusEvent) => {
          const text = (target as HTMLInputElement).value;

          if (clickedOnText) {
            e.target.visible(true);
            dispatch(updateShape({ id: targetAttrs.id, attrs: { text } }));
          } else if (text.trim().length) {
            dispatch(
              addShape(
                createTextShape({
                  x: targetAttrs.x,
                  y: targetAttrs.y,
                  text,
                  fill: panel.stroke,
                  fontSize: panel.fontSize,
                })
              )
            );
          }

          window.removeEventListener('panel:enter', handlePanelEnter);
          window.removeEventListener('panel:leave', handlePanelLeave);

          input.remove();
        };

        const handlePanelEnter = () => {
          // panel operation caused out of focus, reselected the text.
          input.onblur = () => {
            if (clickedOnText) {
              input.select();
            }
          };
        };

        const handlePanelLeave = () => {
          // panel operation caused out of focus, refocus.
          input.onblur = handleBlur;
          input.focus();
        };

        input.onkeydown = ({ key }) => {
          if (key === 'Escape') {
            input.blur();
            dispatch(toggleIsDrawing(false));
          }
        };

        input.onblur = handleBlur;
        window.addEventListener('panel:enter', handlePanelEnter);
        window.addEventListener('panel:leave', handlePanelLeave);

        document.body.appendChild(input);

        input.focus();
        input.select();
      }
    },
  };
};
