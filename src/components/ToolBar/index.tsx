import { ActionIcon, Card, Flex, useMantineTheme } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Capture, HandMove, Lock, LockOpen, Settings } from 'tabler-icons-react';

import { selectDrag, selectLock, toggleLock, updateDrag } from '@/store';
import type { AppDispatch } from '@/store';

import './index.css';

const ToolBar: React.FC = () => {
  const theme = useMantineTheme();

  const dispatch = useDispatch<AppDispatch>();
  const lock = useSelector(selectLock);
  const drag = useSelector(selectDrag);

  return (
    <div className="toolbar">
      <Card shadow="sm" p="lg" radius="lg" withBorder>
        <Flex direction="column" gap="lg">
          <ActionIcon>
            <Capture size={24} onClick={() => dispatch(updateDrag({ ...drag, x: 0, y: 0 }))} />
          </ActionIcon>

          <ActionIcon onClick={() => dispatch(toggleLock(!lock))}>
            {lock ? <Lock color={theme.colors.red[7]} /> : <LockOpen />}
          </ActionIcon>

          <ActionIcon onClick={() => dispatch(updateDrag({ ...drag, draggable: !drag.draggable }))}>
            <HandMove size={24} color={drag.draggable ? theme.colors.red[7] : undefined} />
          </ActionIcon>

          <ActionIcon>
            <Settings size={24} />
          </ActionIcon>
        </Flex>
      </Card>
    </div>
  );
};

export default ToolBar;
