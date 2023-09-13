import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import type Konva from 'konva';

import { selectActionType, selectLock, selectDrag, selectShapes, store, updateDrag } from '@/store';
import type { AppDispatch } from '@/store';

import Stage from '@/components/Stage';
import ActionBar from '@/components/ActionBar';
import Toolbar from '@/components/Toolbar';
import Panel from '@/components/Panel';

import useMachine from '@/hooks/useMachine';
import * as machines from '@/machines';

import { ActionTypes } from '@/constants/action-types';

import './App.css';
import Stats from './components/Stats';

function App() {
  const { width, height } = useWindowSize();

  const dispatch = useDispatch<AppDispatch>();
  const actionType = useSelector(selectActionType);
  const lock = useSelector(selectLock);
  const drag = useSelector(selectDrag);
  const shapes = useSelector(selectShapes);

  const stageRef = useRef<Konva.Stage>(null);

  const trigger = useMachine(actionType, machines, {
    lock: lock || drag.draggable,
    providers: [store],
  });

  const allowSelect = actionType === ActionTypes.selection && !lock && !drag.draggable;

  return (
    <div className="artboard">
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        style={{ background: '#fff' }}
        shapes={shapes}
        {...drag}
        onDragEnd={(e) => {
          e.cancelBubble = true;
          dispatch(updateDrag(e.target.getPosition()));
        }}
        allowSelect={allowSelect}
        onSelect={console.log}
        onPointerDown={trigger}
        onPointermove={trigger}
        onPointerup={trigger}
        onKeyup={trigger}
        onKeydown={trigger}
      />

      <Toolbar className="toolbar" />

      <ActionBar className="action-bar" />

      <Panel className="panel" />

      <Stats />
    </div>
  );
}

export default App;
