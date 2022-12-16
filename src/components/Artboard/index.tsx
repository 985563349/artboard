import { useDispatch, useSelector } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { useWindowSize } from 'react-use';

import { updateShape, RootState } from '@/store';
import * as events from './events';
import useShapeEvents from './hooks/useShapeEvents';

import { Line, Text, SimpleLine, Area, Ruler, Eraser } from '@/components/Artboard/shapes';

import './index.css';

const Artboard: React.FC = () => {
  const { width, height } = useWindowSize();

  const dispatch = useDispatch();
  const rootState = useSelector((state: RootState) => state);
  const lock = rootState.app.lock;
  const shapes = rootState.shape.present;

  const trigger = useShapeEvents(events, { lock, providers: [rootState, dispatch] });

  return (
    <div className="artboard" tabIndex={1} onKeyDown={trigger}>
      <Stage
        width={width}
        height={height}
        style={{ background: '#fff' }}
        onClick={trigger}
        onMouseDown={trigger}
        onMouseMove={trigger}
        onMouseUp={trigger}
      >
        {/* shapes layer */}
        <Layer name="shapes-layer">
          {shapes.map((shape) => {
            switch (shape.type) {
              case 'line':
                return <Line key={shape.id} {...shape} />;

              case 'text':
                return (
                  <Text
                    {...shape}
                    key={shape.id}
                    onDragEnd={(e) => {
                      const { x, y } = e.target.getPosition();
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, x, y } }));
                    }}
                  />
                );

              case 'simpleLine':
                return (
                  <SimpleLine
                    {...shape}
                    key={shape.id}
                    onAnchorDragMove={(point, i) => {
                      const points = [...shape.points];
                      points.splice(i * 2, 2, ...point);
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, points } }));
                    }}
                    onAnchorDragEnd={(point, i) => {
                      const points = [...shape.points];
                      points.splice(i * 2, 2, ...point);
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, points } }));
                    }}
                  />
                );

              case 'area':
                return (
                  <Area
                    {...shape}
                    key={shape.id}
                    onAnchorDragMove={(point, i) => {
                      const points = [...shape.points];
                      points.splice(i * 2, 2, ...point);
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, points } }));
                    }}
                    onAnchorDragEnd={(point, i) => {
                      const points = [...shape.points];
                      points.splice(i * 2, 2, ...point);
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, points } }));
                    }}
                  />
                );

              case 'ruler':
                return (
                  <Ruler
                    {...shape}
                    key={shape.id}
                    onAnchorDragMove={(point, i) => {
                      const points = [...shape.points];
                      points.splice(i * 2, 2, ...point);
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, points } }));
                    }}
                    onAnchorDragEnd={(point, i) => {
                      const points = [...shape.points];
                      points.splice(i * 2, 2, ...point);
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, points } }));
                    }}
                  />
                );

              case 'eraser':
                return <Eraser key={shape.id} {...shape} />;

              default:
                return null;
            }
          })}
        </Layer>

        {/* Transformer layer */}
        <Layer name="transformer-layer" />
      </Stage>
    </div>
  );
};

export default Artboard;
