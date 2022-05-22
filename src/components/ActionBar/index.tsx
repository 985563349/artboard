import { useDispatch, useSelector } from 'react-redux';
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

import { ActionTypes } from '@/constants/action-types';
import { toggleActionType } from '@/store';
import type { AppDispatch, RootState } from '@/store';
import './index.css';

const columns = [
  { type: ActionTypes.line, icon: Scribble },
  { type: ActionTypes.text, icon: LetterT },
  { type: ActionTypes.simpleLine, icon: Timeline },
  { type: ActionTypes.area, icon: Shape },
  { type: ActionTypes.image, icon: Photo },
  { type: ActionTypes.capture, icon: Crop },
  { type: ActionTypes.rule, icon: Ruler2 },
  { type: ActionTypes.eraser, icon: Eraser },
  { type: ActionTypes.colorPicker, icon: ColorPicker },
  { type: ActionTypes.move, icon: HandMove },
];

const ActionBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const actionType = useSelector((state: RootState) => state.app.actionType);

  const handleClick = (type: ActionTypes) => {
    if (type === ActionTypes.image) {
      // TODO: open image
      console.log('open image');
    } else {
      dispatch(toggleActionType(type !== actionType ? type : undefined));
    }
  };

  return (
    <div className="action-bar">
      <Card shadow="sm" p="lg" radius="lg" style={{ display: 'flex' }}>
        <Group>
          {columns.map(({ type, icon: Icon }) => (
            <ActionIcon key={type} onClick={() => handleClick(type)}>
              <Icon color={actionType === type ? '#f40' : '#495057'} />
            </ActionIcon>
          ))}
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
