import type Konva from 'konva';

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
          })
          .filter((node) => node != null);

        dispatch(updateShape(payload as any));
      };

      window.addEventListener('panel:change', handlePanelChange as EventListener);

      // unbind last event
      stage?.on('pointerdown.selection.change', ({ evt, target }) => {
        const metaPressed = evt.shiftKey || evt.ctrlKey || evt.metaKey;
        const isSelected = nodes.includes(target);

        if (isSelected && !metaPressed) {
          return;
        }

        if (target !== stage && !target.getAttr('selection')) {
          return;
        }

        window.removeEventListener('panel:change', handlePanelChange as EventListener);
        stage.off('pointerdown.selection.change');
      });
    },
  };
};
