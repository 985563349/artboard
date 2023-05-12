import type Konva from 'konva';

import { ActionTypes } from '@/constants/action-types';
import { AppStore, updateShape } from '@/store';

export default (store: AppStore) => {
  const dispatch = store.dispatch;

  return {
    change: (e: { target: Konva.Transformer }) => {
      const stage = e.target.getStage();
      const nodes = e.target.nodes();

      if (!nodes.length) {
        return;
      }

      const handlePanelChange = ({ detail }: CustomEvent) => {
        // listen panel operation, update shape.
        const { fontSize, stroke } = detail;

        const payload = nodes
          .map((node) => {
            const attrs = node.getAttrs();
            if (attrs.type === 'text') {
              return { id: attrs.id, attrs: { fontSize, fill: stroke } };
            }
            // TODO: more type
          })
          .filter((node) => node != null);

        dispatch(updateShape(payload as any));
      };

      const handlePointerDown = ({ evt, target }: any) => {
        const metaPressed = evt.shiftKey || evt.ctrlKey || evt.metaKey;
        const isSelected = nodes.includes(target);

        if (isSelected && !metaPressed) {
          return;
        }

        if (target !== stage && !target.getAttr('selection')) {
          return;
        }

        cleanup();
      };

      const handleStateChange = () => {
        const state = store.getState();
        const { actionType } = state.app;
        const shapes = state.shape.present;

        if (actionType !== ActionTypes.selection) {
          cleanup();
          return;
        }

        // selected nodes have been removed
        if (nodes.some((node) => shapes.every((shape) => node.attrs.id !== shape.id))) {
          e.target.nodes([]);
          cleanup();
        }
      };

      const cleanup = () => {
        unsubscribe();
        window.removeEventListener('panel:change', handlePanelChange as EventListener);
        stage?.off('pointerdown.selection.change');
      };

      const unsubscribe = store.subscribe(handleStateChange);
      window.addEventListener('panel:change', handlePanelChange as EventListener);
      stage?.on('pointerdown.selection.change', handlePointerDown);
    },

    dragend: (e: { target: Konva.Transformer }) => {
      const nodes = e.target.nodes();

      const payload = nodes
        .map((node) => {
          const attrs = node.getAttrs();
          if (attrs.type === 'text') {
            return { id: attrs.id, attrs: { x: attrs.x, y: attrs.y } };
          }
          // TODO: more type
        })
        .filter((node) => node != null);

      dispatch(updateShape(payload as any));
    },
  };
};
