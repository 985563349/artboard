import { forwardRef, useImperativeHandle, useRef } from 'react';
import type Konva from 'konva';
import { Stage as KonvaStage, Layer } from 'react-konva';

import { Line, Text, SimpleLine, Area, Ruler, Eraser } from './shapes';
import { SelectionRect } from './extensions';
import type { SelectionRectProps } from './extensions';

export type StageProps = React.ComponentProps<typeof KonvaStage> &
  Pick<SelectionRectProps, 'onSelect'> & {
    shapes?: Array<any>;
    allowSelect?: boolean;
  };

const Stage: React.FC<StageProps & { ref: React.ForwardedRef<Konva.Stage> }> = forwardRef(
  (props, ref) => {
    const { shapes, allowSelect, onSelect, ...konvaStageProps } = props;

    const stageRef = useRef<Konva.Stage>(null);

    useImperativeHandle<Konva.Stage | null, Konva.Stage | null>(ref, () => stageRef.current);

    return (
      <div
        tabIndex={1}
        style={{ outline: 'none' }}
        onKeyUp={(evt) => {
          stageRef.current?.fire('keyup', { evt });
        }}
        onKeyDown={(evt) => {
          stageRef.current?.fire('keydown', { evt });
        }}
      >
        <KonvaStage {...konvaStageProps} ref={stageRef}>
          {/* shapes layer */}
          <Layer name="shapes-layer">
            {shapes?.map((shape) => {
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

            {allowSelect ? <SelectionRect onSelect={onSelect} /> : null}
          </Layer>
        </KonvaStage>
      </div>
    );
  }
);

export default Stage;
