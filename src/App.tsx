import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import type Konva from 'konva';

import { selectActionType, selectLock, selectDrag, selectShapes, store } from '@/store';

import Stage from '@/components/Stage';
import ActionBar from '@/components/ActionBar';
import Toolbar from '@/components/Toolbar';
import Panel from '@/components/Panel';

import useMachine from '@/hooks/useMachine';
import * as machines from '@/machines';

import { ActionTypes } from '@/constants/action-types';

import './App.css';

function App() {
  const { width, height } = useWindowSize();

  const actionType = useSelector(selectActionType);
  const lock = useSelector(selectLock);
  const drag = useSelector(selectDrag);
  const shapes = useSelector(selectShapes);

  const stageRef = useRef<Konva.Stage>(null);

  const trigger = useMachine(actionType, machines, {
    lock: lock || drag.draggable,
    providers: [store],
  });

  return (
    <div className="artboard">
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        style={{ background: '#fff' }}
        allowSelect={actionType === ActionTypes.selection}
        onSelect={console.log}
        shapes={shapes}
        onPointerDown={trigger}
        onPointermove={trigger}
        onPointerup={trigger}
        onKeyup={trigger}
        onKeydown={trigger}
      />

      <Toolbar className="toolbar" />

      <ActionBar className="action-bar" />

      <Panel className="panel" />
    </div>
  );
}

export default App;
