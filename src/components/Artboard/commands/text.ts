import type Konva from 'konva';

import { addShape, toggleIsDrawing, updatePanel, updateShape } from '@/store';
import type { AppStore } from '@/store';
import { rgbToHex } from '@/utils';

import { createTextShape } from '../creates';

export default (store: AppStore) => {
  const dispatch = store.dispatch;
  const { isDrawing, drag, panel } = store.getState().app;

  return {
    click: (e: Konva.KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      const clickedOnText = e.target.getAttrs().type === 'text';

      const targetAttrs = clickedOnText
        ? e.target.getAttrs()
        : e.target.getStage()?.getPointerPosition();

      if (isDrawing) {
        dispatch(toggleIsDrawing(false));
        return;
      }

      if ((clickedOnEmpty === false && clickedOnText === false) || targetAttrs == null) {
        return;
      }

      // start drawing
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
        const { value: text, style } = target as HTMLInputElement;
        const fill = rgbToHex(style.color)!;
        const fontSize = parseFloat(style.fontSize);

        if (clickedOnText) {
          e.target.visible(true);
          dispatch(updateShape({ id: targetAttrs.id, attrs: { text, fill, fontSize } }));
        } else if (text.trim().length) {
          const textShape = createTextShape({
            x: targetAttrs.x,
            y: targetAttrs.y,
            text,
            fill,
            fontSize,
          });
          dispatch(addShape(textShape));
        }

        window.removeEventListener('panel:enter', handlePanelEnter);
        window.removeEventListener('panel:leave', handlePanelLeave);
        window.removeEventListener('panel:change', handlePanelChanged as EventListener);

        input.remove();
      };

      const handlePanelEnter = () => {
        // panel operation caused out of focus, unbind the blur event.
        input.onblur = null;
      };

      const handlePanelLeave = () => {
        // panel operation caused out of focus, refocus.
        input.onblur = handleBlur;
        input.focus();
      };

      const handlePanelChanged = ({ detail }: CustomEvent) => {
        // listen panel operation, update input style.
        const { fontSize, stroke } = detail;
        input.style.cssText += `
            font-size: ${fontSize}px;
            color: ${stroke};
          `;
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
      window.addEventListener('panel:change', handlePanelChanged as EventListener);

      document.body.appendChild(input);

      input.focus();
      input.select();
    },
  };
};
