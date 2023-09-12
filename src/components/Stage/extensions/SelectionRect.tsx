import { useEffect, useRef } from 'react';
import type Konva from 'konva';
import { Group, Rect, Transformer } from 'react-konva';

import { shallowEqual } from '@/utils';

export type SelectionRectProps = React.ComponentProps<typeof Transformer> & {
  onSelect?: (evt: Konva.KonvaEventObject<Event>) => void;
};

const SelectionRect: React.FC<SelectionRectProps> = (props) => {
  const globalKonva = (window as any).Konva;

  const selection = useRef({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const selectionRectRef = useRef<Konva.Rect>(null);

  const trRef = useRef<Konva.Transformer>(null);

  const setTransformerNodes = (nodes: Konva.Node[]) => {
    if (trRef.current) {
      const previousNodes = trRef.current.nodes();
      previousNodes.forEach((node) => node.draggable(false));

      nodes.forEach((node) => node.draggable(true));
      trRef.current.nodes(nodes);

      // delay triggering event (waiting for the native event to end)
      setTimeout(() => {
        trRef.current?.fire('select');
      });
    }
  };

  const onPointerDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // do nothing if we pointerdown on any shape
    const stage = e.target?.getStage();

    if (e.target !== stage) {
      return;
    }

    const pos = stage.getPointerPosition()!;

    selection.current.x1 = pos.x;
    selection.current.y1 = pos.y;
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;

    selectionRectRef.current?.visible(true);
    selectionRectRef.current?.width(0);
    selectionRectRef.current?.height(0);
  };

  const onPointerMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // do nothing if we didn't start selection
    if (!selectionRectRef.current?.visible()) {
      return;
    }

    const stage = e.target.getStage()!;
    const pos = stage.getPointerPosition()!;
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;

    const node = selectionRectRef.current;

    node.setAttrs({
      x: Math.min(selection.current.x1, selection.current.x2),
      y: Math.min(selection.current.y1, selection.current.y2),
      width: Math.abs(selection.current.x1 - selection.current.x2),
      height: Math.abs(selection.current.y1 - selection.current.y2),
    });
  };

  const onPointerUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // do nothing if we didn't start selection
    if (!selectionRectRef.current?.visible()) {
      return;
    }
    selectionRectRef.current?.visible(false);

    const stage = e.target?.getStage()!;
    const selBox = selectionRectRef.current?.getClientRect();
    const elements: Konva.Node[] = [];

    stage?.find((elementNode: Konva.Node) => {
      const elBox = elementNode.getClientRect();
      if (elementNode.getAttr('selection') && globalKonva.Util.haveIntersection(selBox, elBox)) {
        elements.push(elementNode);
      }
    });

    // shallow comparison of data before and after selection
    const trNodes = trRef.current?.getNodes();
    if (!shallowEqual(trNodes, elements)) {
      setTransformerNodes(elements);
    }
  };

  const onPointerDownClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (selectionRectRef.current?.visible()) {
      return;
    }

    const stage = e.target?.getStage();

    if (e.target === stage && trRef.current?.nodes().length) {
      setTransformerNodes([]);
      return;
    }

    if (!e.target.getAttr('selection')) {
      return;
    }

    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = trRef.current?.nodes().includes(e.target);

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      setTransformerNodes([e.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = trRef.current?.nodes().slice()!; // use slice to have new copy of array
      // remove node from array
      nodes?.splice(nodes.indexOf(e.target), 1);
      setTransformerNodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = trRef.current?.nodes().concat([e.target])!;
      setTransformerNodes(nodes);
    }
  };

  useEffect(() => {
    const stage = selectionRectRef.current?.getStage();

    stage?.on('pointerdown', onPointerDown);
    stage?.on('pointermove', onPointerMove);
    stage?.on('pointerup', onPointerUp);
    stage?.on('pointerdown.click', onPointerDownClick);

    return () => {
      stage?.off('pointerdown', onPointerDown);
      stage?.off('pointermove', onPointerMove);
      stage?.off('pointerup', onPointerUp);
      stage?.off('pointerdown.click', onPointerDownClick);
    };
  }, [onPointerDown, onPointerMove, onPointerUp, onPointerDownClick]);

  return (
    <Group>
      <Rect visible={false} fill="rgba(0,0,255,0.2)" ref={selectionRectRef} />

      <Transformer
        ref={trRef}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
        borderStroke="#228be6"
        anchorStroke="#9ca3af"
        anchorCornerRadius={8}
        anchorSize={12}
        shouldOverdrawWholeArea
        {...props}
      />
    </Group>
  );
};

export default SelectionRect;
