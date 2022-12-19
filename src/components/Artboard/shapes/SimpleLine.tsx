import { useEffect, useState } from 'react';
import { Circle, Group, Line } from 'react-konva';
import { chunk, clone } from 'lodash';

export type SimpleLineProps = React.ComponentProps<typeof Line> & {
  points?: number[];
  onAnchorDragMove?: (points: number[]) => void;
  onAnchorDragEnd?: (points: number[]) => void;
};

const SimpleLine: React.FC<SimpleLineProps> = ({
  id,
  name,
  draggable,
  x,
  y,
  strokeWidth,
  onDragEnd,
  onAnchorDragMove,
  onAnchorDragEnd,
  ...shapeProps
}) => {
  const [points, setPoints] = useState(shapeProps.points);

  useEffect(() => {
    if ('points' in shapeProps) {
      setPoints(shapeProps.points);
    }
  }, [shapeProps.points]);

  const anchors = chunk(points, 2);

  return (
    <Group id={id} name={name} draggable={draggable} x={x} y={y} onDragEnd={onDragEnd}>
      <Line {...shapeProps} points={points} strokeWidth={strokeWidth} />

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
            e.cancelBubble = true;

            const { x, y } = e.target.getPosition();
            const newPoints = clone(points!);

            newPoints.splice(i * 2, 2, x, y);
            setPoints(newPoints);
            onAnchorDragMove?.(newPoints);
          }}
          onDragEnd={(e) => {
            e.cancelBubble = true;
            onAnchorDragEnd?.(points!);
          }}
        />
      ))}
    </Group>
  );
};

export default SimpleLine;
