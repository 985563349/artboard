import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { Stage, Layer } from 'react-konva';
import { camelCase } from 'lodash';

import { ActionTypes } from '@/constants/action-types';
import { updateShape, RootState } from '@/store';

import useMachine from './hooks/useMachine';
import * as commands from './commands';

import { Line, Text, SimpleLine, Area, Ruler, Eraser } from './shapes';
import { SelectionRect } from './extensions';

import './index.css';

const Artboard: React.FC = () => {
  const { width, height } = useWindowSize();

  const dispatch = useDispatch();
  const rootState = useSelector((state: RootState) => state);

  const { actionType, lock } = rootState.app;
  const shapes = rootState.shape.present;

  const state = camelCase(actionType);
  const trigger = useMachine(state, commands, {
    lock,
    providers: [rootState, dispatch],
  });

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
                    draggable
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
                    draggable
                    onDragEnd={(e) => {
                      const { x, y } = e.target.getPosition();
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, x, y } }));
                    }}
                    onAnchorDragEnd={(points) => {
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, points } }));
                    }}
                  />
                );

              case 'area':
                return (
                  <Area
                    {...shape}
                    key={shape.id}
                    draggable
                    onDragEnd={(e) => {
                      const { x, y } = e.target.getPosition();
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, x, y } }));
                    }}
                    onAnchorDragEnd={(points) => {
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, points } }));
                    }}
                  />
                );

              case 'ruler':
                return (
                  <Ruler
                    {...shape}
                    key={shape.id}
                    draggable
                    onDragEnd={(e) => {
                      const { x, y } = e.target.getPosition();
                      dispatch(updateShape({ id: shape.id, shape: { ...shape, x, y } }));
                    }}
                    onAnchorDragEnd={(points) => {
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

          {actionType === ActionTypes.selection && (
            <SelectionRect onChange={(elements) => console.log(elements)} />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Artboard;
