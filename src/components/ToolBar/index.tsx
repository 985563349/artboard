import { ActionIcon, Card, Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { Capture, Lock, LockOpen, Settings } from 'tabler-icons-react';

import { toggleLock } from '@/store';
import type { AppDispatch, RootState } from '@/store';
import './index.css';

const ToolBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lock = useSelector((state: RootState) => state.app.lock);

  return (
    <div className="toolbar">
      <Card shadow="sm" p="lg" radius="lg">
        <Group direction="column">
          <ActionIcon variant="hover">
            <Capture size={24} />
          </ActionIcon>

          <ActionIcon
            variant="hover"
            onClick={() => {
              dispatch(toggleLock(!lock));
            }}
          >
            {lock ? <Lock /> : <LockOpen />}
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
