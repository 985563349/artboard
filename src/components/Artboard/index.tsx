import { useDispatch, useSelector } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { useWindowSize } from 'react-use';
import type { KonvaEventObject } from 'konva/lib/Node';
import './index.css';

import { ActionTypes } from '@/constants/action-types';
import { addShape } from '@/store';
import type { RootState } from '@/store';
import { createRuleShape, createTextShape } from './helpers';
import { Text } from './components';

const Artboard = () => {
  const { width, height } = useWindowSize();

  const dispatch = useDispatch();
  const lock = useSelector((state: RootState) => state.app.lock);
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

  return (
    <div className="artboard">
      <Stage
        width={width}
        height={height}
        onClick={(e) => {
          if (lock === false && actionType) {
            clickExecuteCommands[actionType]?.(e);
          }
        }}
      >
        {/* draw layer */}
        <Layer name="draw-layer">
          {shapes.map((shape) => {
            if (shape.type === 'text') {
              return <Text key={shape.id} {...shape} />;
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
