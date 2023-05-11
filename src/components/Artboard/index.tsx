import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { Stage, Layer } from 'react-konva';
import { camelCase } from 'lodash';

import { ActionTypes } from '@/constants/action-types';
import {
  updateShape,
  selectActionType,
  selectLock,
  selectDrag,
  selectShapes,
  store,
} from '@/store';

import useMachine from './hooks/useMachine';
import * as commands from './commands';
import { SelectionRect } from './extensions';

import { Line, Text, SimpleLine, Area, Ruler, Eraser } from './shapes';

import './index.css';

const Artboard: React.FC = () => {
  const { width, height } = useWindowSize();

  const dispatch = useDispatch();

  const actionType = useSelector(selectActionType);
  const lock = useSelector(selectLock);
  const drag = useSelector(selectDrag);
  const shapes = useSelector(selectShapes);

  const state = camelCase(actionType);
  const trigger = useMachine(state, commands, {
    lock: lock || drag.draggable,
    providers: [store],
  });

  return (
    <div className="artboard" tabIndex={1} onKeyDown={trigger}>
      <Stage
        width={width}
        height={height}
        style={{ background: '#fff' }}
        onPointerDown={trigger}
        onPointerMove={trigger}
        onPointerUp={trigger}
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
                      dispatch(updateShape({ id: shape.id, attrs: { x, y } }));
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
                      dispatch(updateShape({ id: shape.id, attrs: { x, y } }));
                    }}
                    onAnchorDragEnd={(points) => {
                      dispatch(updateShape({ id: shape.id, attrs: { points } }));
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
                      dispatch(updateShape({ id: shape.id, attrs: { x, y } }));
                    }}
                    onAnchorDragEnd={(points) => {
                      dispatch(updateShape({ id: shape.id, attrs: { points } }));
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
                      dispatch(updateShape({ id: shape.id, attrs: { x, y } }));
                    }}
                    onAnchorDragEnd={(points) => {
                      dispatch(updateShape({ id: shape.id, attrs: { points } }));
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
            <SelectionRect onChange={trigger} onDragEnd={trigger} />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Artboard;
