import type Konva from 'konva';

import type { AppStore } from '@/store';

export default (store: AppStore) => {
  return {
    change: (e: { target: Konva.Transformer }) => {
      const stage = e.target.getStage();
      const nodes = e.target.nodes();

      const handlePanelChange = () => {
        nodes.forEach((node) => {
          console.log(node.getAttr('text'));
        });
      };

      if (nodes.length <= 0) {
        return;
      }

      window.addEventListener('panel:change', handlePanelChange);

      // unbind the last event
      stage?.on('mousedown.selection.change', (e) => {
        if (e.target !== stage && !e.target.getAttr('selection')) {
          return;
        }
        window.removeEventListener('panel:change', handlePanelChange);
        stage.off('mousedown.selection.change');
      });
    },
  };
};
