import { useEffect, useRef } from 'react';
import type Konva from 'konva';
import { Group, Rect, Transformer } from 'react-konva';

import { shallowEqual } from '@/utils';

export type SelectionReactProps = React.ComponentProps<typeof Transformer> & {
  onChange?: (event: { type: string; target: Konva.Transformer }) => void;
};

const SelectionRect: React.FC<SelectionReactProps> = ({ onChange, ...transformerProps }) => {
  const selectionRectRef = useRef<Konva.Rect>(null);
  const selection = useRef({ visible: false, x1: 0, y1: 0, x2: 0, y2: 0 });
  const trRef = useRef<Konva.Transformer>(null);
  const globalKonva = (window as any).Konva;

  const setTransformerNodes = (nodes: Konva.Node[]) => {
    if (trRef.current) {
      trRef.current.nodes(nodes);
      // mock event object
      onChange?.({ type: 'change', target: trRef.current });
    }
  };

  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // do nothing if we mousedown on any shape
    const stage = e.target?.getStage();

    if (e.target !== stage) {
      return;
    }
    e.evt.preventDefault();

    const pos = stage.getPointerPosition()!;

    selection.current.visible = true;
    selection.current.x1 = pos.x;
    selection.current.y1 = pos.y;
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;

    selectionRectRef.current?.visible(true);
    selectionRectRef.current?.width(0);
    selectionRectRef.current?.height(0);
  };

  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // do nothing if we didn't start selection
    if (!selectionRectRef.current?.visible()) {
      return;
    }
    e.evt.preventDefault();

    const stage = e.target.getStage()!;
    const pos = stage.getPointerPosition()!;
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;

    const node = selectionRectRef.current;

    node.setAttrs({
      visible: selection.current.visible,
      x: Math.min(selection.current.x1, selection.current.x2),
      y: Math.min(selection.current.y1, selection.current.y2),
      width: Math.abs(selection.current.x1 - selection.current.x2),
      height: Math.abs(selection.current.y1 - selection.current.y2),
    });
  };

  const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // do nothing if we didn't start selection
    if (!selectionRectRef.current?.visible()) {
      return;
    }
    e.evt.preventDefault();
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      selectionRectRef.current?.visible(false);
    });

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
    if (shallowEqual(trNodes, elements) === false) {
      setTransformerNodes(elements);
    }
  };

  const onClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
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
    stage?.on('mousedown', onMouseDown);
    stage?.on('mousemove', onMouseMove);
    stage?.on('mouseup', onMouseUp);
    stage?.on('click', onClick);

    return () => {
      stage?.off('mousedown', onMouseDown);
      stage?.off('mousemove', onMouseMove);
      stage?.off('mouseup', onMouseUp);
      stage?.off('click', onClick);
    };
  }, [onMouseDown, onMouseMove, onMouseUp, onClick]);

  return (
    <Group>
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
        {...transformerProps}
      />
    </Group>
  );
};

export default SelectionRect;
