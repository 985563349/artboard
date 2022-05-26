import { useRef, useEffect, cloneElement, forwardRef } from 'react';
import { Transformer as NativeTransformer } from 'react-konva';
import { Portal } from 'react-konva-utils';
import type { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import type { Node, NodeConfig } from 'konva/lib/Node';

export type Transformer = {
  selected?: boolean;
  portal?: string;
  children: JSX.Element;
};

const Transformer = (props: Transformer) => {
  const { selected, portal, children } = props;

  const shapeRef = useRef<Node>(null);
  const trRef = useRef<TransformerType>(null);

  useEffect(() => {
    if (selected) {
      trRef.current?.nodes([shapeRef.current!]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [selected]);

  const Shape = forwardRef<Node, NodeConfig>((extraProps, ref) =>
    cloneElement(children, { ...extraProps, ref })
  );

  return (
    <>
      <Shape ref={shapeRef} />
      {selected && (
        <Portal selector={portal} enabled={selected}>
          <NativeTransformer ref={trRef} />
        </Portal>
      )}
    </>
  );
};

export default Transformer;
