import { FC, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { useWindowSize } from 'react-use';
import type { KonvaEventObject } from 'konva/lib/Node';
import './index.css';

import { ActionTypes } from '@/constants/action-types';
import {
  selectLock,
  selectIsDrawing,
  selectActionType,
  selectShapes,
  toggleIsDrawing,
  addShape,
  INCOGNITO_addShape,
  updateShape,
  INCOGNITO_updateShape,
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
        dispatch(INCOGNITO_addShape(createLineShape([x, y])));
      }
    },
    [ActionTypes.eraser]: (e) => {
      const point = e.target?.getStage()?.getPointerPosition();
      if (point) {
        const { x, y } = point;
        dispatch(toggleIsDrawing(true));
        dispatch(INCOGNITO_addShape(createEraserShape([x, y])));
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
            INCOGNITO_updateShape({
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
            INCOGNITO_updateShape({
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
                  onDragEnd={(e) => {
                    const { x, y } = e.target.getPosition();
                    dispatch(updateShape({ id: shape.id, shape: { ...shape, x, y } }));
                  }}
                />
              );
            }

            if (shape.type === 'simpleLine') {
              return (
                <SimpleLine
                  key={shape.id}
                  {...shape}
                  onAnchorDragMove={(point, i) => {
                    const points = [...shape.points];
                    points.splice(i * 2, 2, ...point);
                    dispatch(INCOGNITO_updateShape({ id: shape.id, shape: { ...shape, points } }));
                  }}
                  onAnchorDragEnd={(point, i) => {
                    const points = [...shape.points];
                    points.splice(i * 2, 2, ...point);
                    dispatch(updateShape({ id: shape.id, shape: { ...shape, points } }));
                  }}
                />
              );
            }

            if (shape.type === 'area') {
              return (
                <Area
                  key={shape.id}
                  {...shape}
                  onAnchorDragMove={(point, i) => {
                    const points = [...shape.points];
                    points.splice(i * 2, 2, ...point);
                    dispatch(INCOGNITO_updateShape({ id: shape.id, shape: { ...shape, points } }));
                  }}
                  onAnchorDragEnd={(point, i) => {
                    const points = [...shape.points];
                    points.splice(i * 2, 2, ...point);
                    dispatch(updateShape({ id: shape.id, shape: { ...shape, points } }));
                  }}
                />
              );
            }

            if (shape.type === 'ruler') {
              return (
                <Ruler
                  key={shape.id}
                  {...shape}
                  onAnchorDragMove={(point, i) => {
                    const points = [...shape.points];
                    points.splice(i * 2, 2, ...point);
                    dispatch(INCOGNITO_updateShape({ id: shape.id, shape: { ...shape, points } }));
                  }}
                  onAnchorDragEnd={(point, i) => {
                    const points = [...shape.points];
                    points.splice(i * 2, 2, ...point);
                    dispatch(updateShape({ id: shape.id, shape: { ...shape, points } }));
                  }}
                />
              );
            }

            if (shape.type === 'eraser') {
              return <Eraser key={shape.id} {...shape} />;
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
