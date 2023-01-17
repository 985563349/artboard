import { useEffect, useRef } from 'react';
import type Konva from 'konva';
import { Rect, Transformer } from 'react-konva';

import { shallowEqual } from '@/utils';

export type SelectionReactProps = {
  onChange?: (elements: Konva.Node[]) => void;
};

const SelectionRect: React.FC<SelectionReactProps> = ({ onChange }) => {
  const selectionRectRef = useRef<Konva.Rect>(null);
  const selection = useRef({ visible: false, x1: 0, y1: 0, x2: 0, y2: 0 });
  const trRef = useRef<Konva.Transformer>(null);
  const globalKonva = (window as any).Konva;

  useEffect(() => {
    const stage = selectionRectRef.current?.getStage();
    stage?.on('mousedown', onMouseDown);
    stage?.on('mousemove', onMouseMove);
    stage?.on('mouseup', onMouseUp);

    return () => {
      stage?.off('mousedown', onMouseDown);
      stage?.on('mousemove', onMouseMove);
      stage?.on('mouseup', onMouseUp);
    };
  }, []);

  const updateSelectionRect = () => {
    const node = selectionRectRef.current;
    node?.setAttrs({
      visible: selection.current.visible,
      x: Math.min(selection.current.x1, selection.current.x2),
      y: Math.min(selection.current.y1, selection.current.y2),
      width: Math.abs(selection.current.x1 - selection.current.x2),
      height: Math.abs(selection.current.y1 - selection.current.y2),
      fill: 'rgba(0, 161, 255, 0.3)',
    });
    node?.getLayer()?.batchDraw();
  };

  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const isElement = e.target.findAncestor('.elements-container');
    const isTransformer = e.target.findAncestor('Transformer');
    if (isElement || isTransformer) {
      return;
    }
    const pos = e.target?.getStage()?.getPointerPosition()!;
    selection.current.visible = true;
    selection.current.x1 = pos.x;
    selection.current.y1 = pos.y;
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;
    updateSelectionRect();
  };

  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!selection.current.visible) {
      return;
    }
    const pos = e.target?.getStage()?.getPointerPosition()!;
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;
    updateSelectionRect();
  };

  const onMouseUp = () => {
    if (!selection.current.visible) {
      return;
    }
    const layer = selectionRectRef.current?.getLayer();
    const selBox = selectionRectRef.current?.getClientRect();
    const elements: Konva.Node[] = [];

    layer?.find((elementNode: Konva.Node) => {
      const elBox = elementNode.getClientRect();
      if (elementNode.getAttr('selection') && globalKonva.Util.haveIntersection(selBox, elBox)) {
        elements.push(elementNode);
      }
    });

    selection.current.visible = false;
    // disable click event
    globalKonva.listenClickTap = false;

    // shallow comparison of data before and after selection
    const trNodes = trRef.current?.getNodes();
    if (shallowEqual(trNodes, elements) === false) {
      trRef.current?.nodes(elements);
      onChange?.(elements);
    }
    updateSelectionRect();
  };

  return (
    <>
      <Rect fill="rgba(0,0,255,0.5)" ref={selectionRectRef} />

      <Transformer
        ref={trRef}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    </>
  );
};

export default SelectionRect;
