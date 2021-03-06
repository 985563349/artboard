import { ActionIcon, Card, Group, useMantineTheme } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Capture, HandMove, Lock, LockOpen, Settings } from 'tabler-icons-react';

import { selectDraggable, selectLock, toggleDraggable, toggleLock } from '@/store';
import type { AppDispatch } from '@/store';
import './index.css';

const ToolBar = () => {
  const theme = useMantineTheme();

  const dispatch = useDispatch<AppDispatch>();
  const lock = useSelector(selectLock);
  const draggable = useSelector(selectDraggable);

  return (
    <div className="toolbar">
      <Card shadow="sm" p="lg" radius="lg" withBorder>
        <Group direction="column">
          <ActionIcon variant="hover">
            <Capture size={24} />
          </ActionIcon>

          <ActionIcon variant="hover" onClick={() => dispatch(toggleLock(!lock))}>
            {lock ? <Lock color={theme.colors.red[7]} /> : <LockOpen />}
          </ActionIcon>

          <ActionIcon variant="hover" onClick={() => dispatch(toggleDraggable(!draggable))}>
            <HandMove size={24} color={draggable ? theme.colors.red[7] : theme.colors.gray[7]} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <Settings size={24} />
          </ActionIcon>
        </Group>
      </Card>
    </div>
  );
};

export default ToolBar;
