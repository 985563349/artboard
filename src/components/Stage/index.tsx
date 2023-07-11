import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { Stage as KonvaStage, Layer } from 'react-konva';
import type Konva from 'konva';

import { Line, Text, SimpleLine, Area, Ruler, Eraser } from './shapes';

export type StageProps = React.ComponentProps<typeof KonvaStage> & {
  shapes: Array<any>;
};

const Stage: React.FC<StageProps & { ref: React.ForwardedRef<Konva.Stage> }> = forwardRef(
  (props, ref) => {
    const { shapes, ...konvaStageProps } = props;

    const internalRef = useRef<Konva.Stage>(null);

    useImperativeHandle<Konva.Stage | null, Konva.Stage | null>(ref, () => internalRef.current);

    return (
      <div
        tabIndex={1}
        style={{ outline: 'none' }}
        onKeyUp={(evt) => {
          internalRef.current?.fire('keyup', { evt });
        }}
        onKeyDown={(evt) => {
          internalRef.current?.fire('keydown', { evt });
        }}
      >
        <KonvaStage {...konvaStageProps} ref={internalRef}>
          {/* shapes layer */}
          <Layer name="shapes-layer">
            {shapes.map((shape) => {
              switch (shape.type) {
                case 'line':
                  return <Line key={shape.id} {...shape} />;

                case 'text':
                  return <Text {...shape} key={shape.id} />;

                case 'simpleLine':
                  return (
                    <SimpleLine
                      {...shape}
                      key={shape.id}
                      draggable
                      onDragEnd={(e) => {
                        // const { x, y } = e.target.getPosition();
                        // dispatch(updateShape({ id: shape.id, attrs: { x, y } }));
                      }}
                      onAnchorDragEnd={(points) => {
                        // dispatch(updateShape({ id: shape.id, attrs: { points } }));
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
                        // dispatch(updateShape({ id: shape.id, attrs: { x, y } }));
                      }}
                      onAnchorDragEnd={(points) => {
                        // dispatch(updateShape({ id: shape.id, attrs: { points } }));
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
                        // const { x, y } = e.target.getPosition();
                        // dispatch(updateShape({ id: shape.id, attrs: { x, y } }));
                      }}
                      onAnchorDragEnd={(points) => {
                        // dispatch(updateShape({ id: shape.id, attrs: { points } }));
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
        </KonvaStage>
      </div>
    );
  }
);

export default memo(Stage);
