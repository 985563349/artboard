import { FC, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useWindowSize } from 'react-use';
import Draggable from 'react-draggable';
import './index.css';

import { ActionTypes } from '@/constants/action-types';
import {
  selectLock,
  selectIsDrawing,
  selectActionType,
  selectShapes,
  toggleIsDrawing,
  addShape,
  updateShape,
} from '@/store';
import {
  createLineShape,
  createTextShape,
  createSimpleLineShape,
  createAreaShape,
  createRulerShape,
  createEraserShape,
} from './helpers';
import { Line, Text, SimpleLine, Area, Ruler, Eraser } from './components';

const Artboard: FC = () => {
  const { width, height } = useWindowSize();

  const dispatch = useDispatch();
  const lock = useSelector(selectLock);
  const isDrawing = useSelector(selectIsDrawing);
  const actionType = useSelector(selectActionType);
  const shapes = useSelector(selectShapes);

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
    [ActionTypes.simpleLine]: (e) => {
      const point = e.target.getStage()?.getPointerPosition();
      if (point) {
        const { x, y } = point;
        let shape = shapes.at(-1);
        if (isDrawing === false || shape?.type !== 'simpleLine') {
          dispatch(toggleIsDrawing(true));
          dispatch(addShape(createSimpleLineShape([x, y])));
        } else {
          dispatch(
            updateShape({
              id: shape.id,
              shape: { ...shape, points: shape.points.concat([x, y]) },
            })
          );
        }
      }
    },
    [ActionTypes.area]: (e) => {
      const point = e.target.getStage()?.getPointerPosition();
      if (point) {
        const { x, y } = point;
        let shape = shapes.at(-1);
        if (isDrawing === false || shape?.type !== 'area') {
          dispatch(toggleIsDrawing(true));
          dispatch(addShape(createAreaShape([x, y])));
        } else {
          dispatch(
            updateShape({
              id: shape.id,
              shape: { ...shape, points: shape.points.concat([x, y]) },
            })
          );
        }
      }
    },
    [ActionTypes.ruler]: (e) => {
      const point = e.target.getStage()?.getPointerPosition();
      if (point) {
        const { x, y } = point;
        // Create an anchor
        const points = [x - 60, y, x + 60, y];
        dispatch(addShape(createRulerShape(points)));
      }
    },
  };

  const mouseDownExecuteCommands: Partial<
    Record<ActionTypes, (e: KonvaEventObject<MouseEvent>) => void>
  > = {
    [ActionTypes.line]: (e) => {
      const point = e.target?.getStage()?.getPointerPosition();
      if (point) {
        const { x, y } = point;
        dispatch(toggleIsDrawing(true));
        dispatch(addShape(createLineShape([x, y])));
      }
    },
    [ActionTypes.eraser]: (e) => {
      const point = e.target?.getStage()?.getPointerPosition();
      if (point) {
        const { x, y } = point;
        dispatch(toggleIsDrawing(true));
        dispatch(addShape(createEraserShape([x, y])));
      }
    },
  };

  const mouseMoveExecuteCommands: Partial<
    Record<ActionTypes, (e: KonvaEventObject<MouseEvent>) => void>
  > = {
    [ActionTypes.line]: (e) => {
      if (isDrawing === false) return;
      const point = e.target.getStage()?.getPointerPosition();
      if (point) {
        let shape = shapes.at(-1);
        if (shape?.type === 'line') {
          dispatch(
            updateShape({
              id: shape.id,
              shape: { ...shape, points: shape.points.concat([point.x, point.y]) },
            })
          );
        }
      }
    },
    [ActionTypes.eraser]: (e) => {
      if (isDrawing === false) return;
      const point = e.target.getStage()?.getPointerPosition();
      if (point) {
        let shape = shapes.at(-1);
        if (shape?.type === 'eraser') {
          dispatch(
            updateShape({
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
      let shape = shapes.at(-1);
      // draw end generation history
      if (shape?.type === 'line') {
        dispatch(updateShape({ id: shape.id, shape: { ...shape } }));
      }
      dispatch(toggleIsDrawing(false));
    },
    [ActionTypes.eraser]: (e) => {
      let shape = shapes.at(-1);
      // draw end generation history
      if (shape?.type === 'eraser') {
        dispatch(updateShape({ id: shape.id, shape: { ...shape } }));
      }
      dispatch(toggleIsDrawing(false));
    },
  };

  const keydownExecuteCommands: Partial<
    Record<ActionTypes, (e: KeyboardEvent<HTMLDivElement>) => void>
  > = {
    [ActionTypes.simpleLine]: (e) => {
      if (['Enter', 'Escape'].includes(e.key)) {
        dispatch(toggleIsDrawing(false));
      }
    },
  };

  return (
    <div
      className="artboard"
      tabIndex={1}
      onKeyDown={(e) => {
        if (lock === false && actionType) {
          keydownExecuteCommands[actionType]?.(e);
        }
      }}
    >
      <Draggable disabled={actionType !== ActionTypes.move}>
        <div>
          <Stage
            width={width}
            height={height}
            style={{ background: '#fff' }}
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
      </Draggable>
    </div>
  );
};

export default Artboard;
