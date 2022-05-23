import { useDispatch, useSelector } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { useWindowSize } from 'react-use';
import type { KonvaEventObject } from 'konva/lib/Node';
import './index.css';

import { ActionTypes } from '@/constants/action-types';
import { addShape, toggleShape, toggleIsDrawing } from '@/store';
import type { RootState } from '@/store';
import { createLineShape, createRuleShape, createTextShape } from './helpers';
import { Line, Text } from './components';

const Artboard = () => {
  const { width, height } = useWindowSize();

  const dispatch = useDispatch();
  const lock = useSelector((state: RootState) => state.app.lock);
  const isDrawing = useSelector((state: RootState) => state.app.isDrawing);
  const actionType = useSelector((state: RootState) => state.app.actionType);
  const shapes = useSelector((state: RootState) => state.shape);

  const clickExecuteCommands: Partial<
    Record<ActionTypes, (e: KonvaEventObject<MouseEvent>) => void>
  > = {
    [ActionTypes.text]: (e) => {
      const point = e.target.getStage()?.getPointerPosition();
      if (point) {
        const { x, y } = point;
        dispatch(addShape(createTextShape(x, y)));
      }
    },
    [ActionTypes.simpleLine]: () => {
      console.log('add simple line');
    },
    [ActionTypes.area]: () => {
      console.log('add area');
    },
    [ActionTypes.rule]: (e) => {
      const point = e.target.getStage()?.getPointerPosition();
      if (point) {
        const { x, y } = point;
        dispatch(addShape(createRuleShape(x, y)));
      }
    },
  };

  const mouseDownExecuteCommands: Partial<
    Record<ActionTypes, (e: KonvaEventObject<MouseEvent>) => void>
  > = {
    [ActionTypes.line]: (e) => {
      dispatch(toggleIsDrawing(true));
      const point = e.target?.getStage()?.getPointerPosition();
      if (point) {
        const { x, y } = point;
        dispatch(addShape(createLineShape([x, y])));
      }
    },
  };

  const mouseMoveExecuteCommands: Partial<
    Record<ActionTypes, (e: KonvaEventObject<MouseEvent>) => void>
  > = {
    [ActionTypes.line]: (e) => {
      if (!isDrawing) return;
      const stage = e.target.getStage();
      const point = stage?.getPointerPosition();
      if (point) {
        let shape = shapes.at(-1);
        if (shape?.type === 'line') {
          dispatch(
            toggleShape({
              id: shape.id,
              shape: { ...shape, points: shape.points.concat([point.x, point.y]) },
            })
          );
        }
      }
    },
  };

  const mouseUpExecuteCommands: Partial<
    Record<ActionTypes, (e: KonvaEventObject<MouseEvent>) => void>
  > = {
    [ActionTypes.line]: (e) => {
      dispatch(toggleIsDrawing(false));
    },
  };

  return (
    <div className="artboard">
      <Stage
        width={width}
        height={height}
        onClick={(e) => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty && lock === false && actionType) {
            clickExecuteCommands[actionType]?.(e);
          }
        }}
        onMouseDown={(e) => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty && lock === false && actionType) {
            mouseDownExecuteCommands[actionType]?.(e);
          }
        }}
        onMouseMove={(e) => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty && lock === false && actionType) {
            mouseMoveExecuteCommands[actionType]?.(e);
          }
        }}
        onMouseUp={(e) => {
          if (lock === false && actionType) {
            mouseUpExecuteCommands[actionType]?.(e);
          }
        }}
      >
        {/* draw layer */}
        <Layer name="draw-layer">
          {shapes.map((shape) => {
            if (shape.type === 'line') {
              return <Line key={shape.id} {...shape} />;
            }

            if (shape.type === 'text') {
              return (
                <Text
                  key={shape.id}
                  {...shape}
                  draggable
                  onDragStart={() => {
                    console.log('drag start');
                  }}
                  onDragEnd={(e) => {
                    const { x, y } = e.target.getPosition();
                    dispatch(toggleShape({ id: shape.id, shape: { ...shape, x, y } }));
                  }}
                />
              );
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
