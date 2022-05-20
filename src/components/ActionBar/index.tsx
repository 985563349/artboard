import { ActionIcon, Card, Divider, Group } from '@mantine/core';
import {
  ArrowBackUp,
  ArrowForwardUp,
  Crop,
  ColorPicker,
  Eraser,
  HandMove,
  LetterT,
  Photo,
  Ruler2,
  Scribble,
  Shape,
  Timeline,
} from 'tabler-icons-react';
import './index.css';

const ActionBar = () => {
  return (
    <div className="action-bar">
      <Card shadow="sm" p="lg" radius="lg" style={{ display: 'flex' }}>
        <Group>
          <ActionIcon variant="hover">
            <Scribble size={24} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <LetterT size={24} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <Timeline size={24} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <Shape size={24} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <Photo size={24} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <Crop size={24} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <Ruler2 size={24} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <Eraser size={24} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <ColorPicker size={24} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <HandMove size={24} />
          </ActionIcon>
        </Group>

        <Divider style={{ margin: '0 16px', borderRadius: 10 }} size={2} orientation="vertical" />

        <Group>
          <ActionIcon variant="hover">
            <ArrowBackUp size={24} />
          </ActionIcon>

          <ActionIcon variant="hover">
            <ArrowForwardUp size={24} />
          </ActionIcon>
        </Group>
      </Card>
    </div>
  );
};

export default ActionBar;
