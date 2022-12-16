import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDraggable from 'react-draggable';

import { selectDrag, updateDrag } from '@/store';

export type DraggableProps = {
  children: React.ReactNode;
};

const Draggable: React.FC<DraggableProps> = ({ children }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();
  const drag = useSelector(selectDrag);
  const { draggable, ...position } = drag;

  return (
    <ReactDraggable
      disabled={!draggable}
      nodeRef={nodeRef}
      position={position}
      onStop={(_, { x, y }) => {
        dispatch(updateDrag({ ...drag, x, y }));
      }}
    >
      <div ref={nodeRef}>{children}</div>
    </ReactDraggable>
  );
};

export default Draggable;
