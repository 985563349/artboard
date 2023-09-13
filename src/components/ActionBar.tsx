import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { ActionIcon, Card, Divider, Flex, Group, useMantineTheme } from '@mantine/core';
import {
  ArrowBackUp,
  ArrowForwardUp,
  Crop,
  Eraser,
  LetterT,
  Location,
  Photo,
  Ruler2,
  Scribble,
  Shape,
  Timeline,
} from 'tabler-icons-react';

import { selectActionType, toggleActionType } from '@/store';
import type { AppDispatch, RootState } from '@/store';

import { ActionTypes } from '@/constants/action-types';

const options = [
  { type: ActionTypes.selection, icon: Location, keyCode: 1 },
  { type: ActionTypes.line, icon: Scribble, keyCode: 2 },
  { type: ActionTypes.text, icon: LetterT, keyCode: 3 },
  { type: ActionTypes.simpleLine, icon: Timeline, keyCode: 4 },
  { type: ActionTypes.area, icon: Shape, keyCode: 5 },
  { type: ActionTypes.capture, icon: Crop, keyCode: 6 },
  { type: ActionTypes.ruler, icon: Ruler2, keyCode: 7 },
  { type: ActionTypes.eraser, icon: Eraser, keyCode: 8 },
  { type: ActionTypes.image, icon: Photo },
];

export type ActionBarProps = {
  className?: string;
};

const ActionBar: React.FC<ActionBarProps> = ({ className }) => {
  const theme = useMantineTheme();

  const dispatch = useDispatch<AppDispatch>();
  const actionType = useSelector(selectActionType);

  const actionTypeRef = useRef(actionType);
  actionTypeRef.current = actionType;

  const canUndo = useSelector((state: RootState) => state.shape.past.length > 0);
  const canRedo = useSelector((state: RootState) => state.shape.future.length > 0);

  const handlePointerDown = (type: ActionTypes) => {
    if (type === actionType) return;

    if (type === ActionTypes.image) {
      // TODO: open image
      console.log('open image');
    }

    dispatch(toggleActionType(type));
  };

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if ((e.target as Element)?.nodeName === 'INPUT') return;

      const type = options.find(({ keyCode }) => keyCode?.toString() === e.key)?.type;

      if (type == null || type === actionTypeRef.current) return;

      dispatch(toggleActionType(type));
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, []);

  return (
    <Flex className={className}>
      <Card shadow="sm" p="lg" radius="lg" withBorder>
        <Flex>
          <Group noWrap>
            {options.map(({ type, icon: Icon }) => (
              <ActionIcon key={type} onPointerDown={() => handlePointerDown(type)}>
                <Icon color={actionType === type ? theme.colors.red[7] : undefined} />
              </ActionIcon>
            ))}
          </Group>

          <Divider style={{ margin: '0 16px', borderRadius: 10 }} size={2} orientation="vertical" />

          <Group noWrap>
            <ActionIcon disabled={!canUndo} onPointerDown={() => dispatch(ActionCreators.undo())}>
              <ArrowBackUp size={24} />
            </ActionIcon>

            <ActionIcon disabled={!canRedo} onPointerDown={() => dispatch(ActionCreators.redo())}>
              <ArrowForwardUp size={24} />
            </ActionIcon>
          </Group>
        </Flex>
      </Card>
    </Flex>
  );
};

export default ActionBar;