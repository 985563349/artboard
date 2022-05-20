import { ActionIcon, Card, Group } from '@mantine/core';
import { Capture, Lock, Settings } from 'tabler-icons-react';
import './index.css';

const ToolBar = () => {
  return (
    <div className="toolbar">
      <Card shadow="sm" p="lg" radius="lg">
        <Group direction="column">
          <ActionIcon variant="hover">
            <Capture size={24} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <Lock size={24} />
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
