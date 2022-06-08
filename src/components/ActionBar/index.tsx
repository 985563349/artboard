import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { ActionIcon, Card, Divider, Group, useMantineTheme } from '@mantine/core';
import {
  ArrowBackUp,
  ArrowForwardUp,
  Click,
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
import { selectActionType, toggleActionType } from '@/store';
import type { AppDispatch, RootState } from '@/store';
import './index.css';

const columns = [
  { type: ActionTypes.pick, icon: Click },
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
        <Group>
          {columns.map(({ type, icon: Icon }) => (
            <ActionIcon key={type} onClick={() => handleClick(type)}>
              <Icon color={actionType === type ? theme.colors.red[7] : theme.colors.gray[7]} />
            </ActionIcon>
          ))}
        </Group>

        <Divider style={{ margin: '0 16px', borderRadius: 10 }} size={2} orientation="vertical" />

        <Group>
          <ActionIcon
            variant="hover"
            disabled={!canUndo}
            onClick={() => dispatch(ActionCreators.undo())}
          >
            <ArrowBackUp size={24} />
          </ActionIcon>

          <ActionIcon
            variant="hover"
            disabled={!canRedo}
            onClick={() => dispatch(ActionCreators.redo())}
          >
            <ArrowForwardUp size={24} />
          </ActionIcon>
        </Group>
      </Card>
    </div>
  );
};

export default ActionBar;
