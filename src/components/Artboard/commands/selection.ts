import type Konva from 'konva';

import type { AppStore } from '@/store';

export default (store: AppStore) => {
  return {
    change: (e: { target: Konva.Transformer }) => {
      const stage = e.target.getStage();
      const nodes = e.target.nodes();

      if (nodes.length <= 0) {
        return;
      }

      const handlePanelChange = () => {
        nodes.forEach((node) => {
          console.log(node.getAttr('text'));
        });
      };

      window.addEventListener('panel:change', handlePanelChange);

      // unbind last event
      stage?.on('pointerdown.selection.change', (e) => {
        if (e.target !== stage && !e.target.getAttr('selection')) {
          return;
        }
        window.removeEventListener('panel:change', handlePanelChange);
        stage.off('pointerdown.selection.change');
      });
    },
  };
};
