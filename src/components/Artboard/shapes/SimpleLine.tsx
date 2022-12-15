import { Circle, Group, Line } from 'react-konva';
import { chunk } from 'lodash';

export type SimpleLineProps = React.ComponentProps<typeof Line> & {
  onAnchorDragMove?: (point: number[], index: number) => void;
  onAnchorDragEnd?: (points: number[], index: number) => void;
};

const SimpleLine: React.FC<SimpleLineProps> = (props) => {
  const { points, strokeWidth, onAnchorDragMove, onAnchorDragEnd } = props;
  const anchors = chunk(points, 2);

  return (
    <Group draggable>
      <Line {...props} />

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
    </Group>
  );
};

export default SimpleLine;
