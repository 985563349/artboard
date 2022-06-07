import { useRef, useEffect } from 'react';
import type { ComponentProps, FC } from 'react';
import { Circle, Group, Line, Transformer } from 'react-konva';
import { Line as LineType } from 'konva/lib/shapes/Line';
import type { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { Portal } from 'react-konva-utils';
import { chunk } from 'lodash';

export type SimpleLineProps = ComponentProps<typeof Line> & {
  selected?: boolean;
  onAnchorDragMove?: (point: number[], index: number) => void;
  onAnchorDragEnd?: (points: number[], index: number) => void;
};

const SimpleLine: FC<SimpleLineProps> = (props) => {
  const { points, strokeWidth, selected, onAnchorDragMove, onAnchorDragEnd } = props;
  const anchors = chunk(points, 2);

  const shapeRef = useRef<LineType>(null);
  const trRef = useRef<TransformerType>(null);

  useEffect(() => {
    if (selected && shapeRef.current) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [selected]);

  return (
    <Group draggable>
      <Line {...props} ref={shapeRef} />

      {anchors.map(([x, y], i) => (
        <Circle
          key={i}
          x={x}
          y={y}
          radius={strokeWidth}
          stroke="#666"
          fill="#ddd"
          strokeWidth={2}
          draggable
          onDragMove={(e) => {
            const { x, y } = e.target.getPosition();
            onAnchorDragMove?.([x, y], i);
          }}
          onDragEnd={(e) => {
            const { x, y } = e.target.getPosition();
            onAnchorDragEnd?.([x, y], i);
          }}
        />
      ))}

      {selected && (
        <Portal selector=".transformer-layer" enabled={selected}>
          <Transformer ref={trRef} />
        </Portal>
      )}
    </Group>
  );
};

export default SimpleLine;
