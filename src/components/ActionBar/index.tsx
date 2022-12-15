import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { ActionIcon, Card, Divider, Group, useMantineTheme } from '@mantine/core';
import {
  ArrowBackUp,
  ArrowForwardUp,
  Crop,
  ColorPicker,
  Eraser,
  LetterT,
  Photo,
  Ruler2,
  Scribble,
  Shape,
  Timeline,
} from 'tabler-icons-react';

import { selectActionType, toggleActionType } from '@/store';
import type { AppDispatch, RootState } from '@/store';
import { ActionTypes } from '@/constants/action-types';

import './index.css';

const options = [
  { type: ActionTypes.line, icon: Scribble },
  { type: ActionTypes.text, icon: LetterT },
  { type: ActionTypes.simpleLine, icon: Timeline },
  { type: ActionTypes.area, icon: Shape },
  { type: ActionTypes.image, icon: Photo },
  { type: ActionTypes.capture, icon: Crop },
  { type: ActionTypes.ruler, icon: Ruler2 },
  { type: ActionTypes.eraser, icon: Eraser },
  { type: ActionTypes.colorPicker, icon: ColorPicker },
];

const ActionBar = () => {
  const theme = useMantineTheme();

  const dispatch = useDispatch<AppDispatch>();
  const actionType = useSelector(selectActionType);
  const canUndo = useSelector((state: RootState) => state.shape.past.length > 0);
  const canRedo = useSelector((state: RootState) => state.shape.future.length > 0);

  const handleClick = (type: ActionTypes) => {
    if (type === ActionTypes.image) {
      // TODO: open image
      console.log('open image');
    } else {
      dispatch(toggleActionType(type !== actionType ? type : null));
    }
  };

  return (
    <div className="action-bar">
      <Card style={{ display: 'flex' }} shadow="sm" p="lg" radius="lg" withBorder>
        <Group noWrap>
          {options.map(({ type, icon: Icon }) => (
            <ActionIcon key={type} onClick={() => handleClick(type)}>
              <Icon color={actionType === type ? theme.colors.red[7] : undefined} />
            </ActionIcon>
          ))}
        </Group>

        <Divider style={{ margin: '0 16px', borderRadius: 10 }} size={2} orientation="vertical" />

        <Group noWrap>
          <ActionIcon disabled={!canUndo} onClick={() => dispatch(ActionCreators.undo())}>
            <ArrowBackUp size={24} />
          </ActionIcon>

          <ActionIcon disabled={!canRedo} onClick={() => dispatch(ActionCreators.redo())}>
            <ArrowForwardUp size={24} />
          </ActionIcon>
        </Group>
      </Card>
    </div>
  );
};

export default ActionBar;
