import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, ColorInput, Input, Slider } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { useUpdateEffect } from 'react-use';

import { selectActionType, selectPanel, updatePanel } from '@/store';
import type { AppDispatch } from '@/store';
import { ActionTypes } from '@/constants/action-types';

const excludeActionTypes = [
  ActionTypes.selection,
  ActionTypes.capture,
  ActionTypes.ruler,
  ActionTypes.image,
];

const Panel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const panel = useSelector(selectPanel);
  const actionType = useSelector(selectActionType);

  const form = useForm({ initialValues: { ...panel } });
  const [debouncedFormValues] = useDebouncedValue(form.values, 200);

  useUpdateEffect(() => {
    dispatch(updatePanel({ ...debouncedFormValues }));
  }, [debouncedFormValues]);

  if (excludeActionTypes.includes(actionType)) {
    return null;
  }

  return (
    <div className="panel">
      <Card shadow="sm" p="lg" radius="lg" withBorder>
        <Box maw={320} mx="auto">
          <form>
            <ColorInput label="Stroke" {...form.getInputProps('stroke')} />

            <ColorInput label="Background" mt="md" {...form.getInputProps('background')} />

            <Input.Wrapper label="Opacity" mt="md">
              <Slider {...form.getInputProps('opacity')} />
            </Input.Wrapper>

            <Input.Wrapper label="Stroke Width" mt="md">
              <Slider {...form.getInputProps('strokeWidth')} />
            </Input.Wrapper>

            <Input.Wrapper label="Font Size" mt="md">
              <Slider {...form.getInputProps('fontSize')} />
            </Input.Wrapper>
          </form>
        </Box>
      </Card>
    </div>
  );
};

export default Panel;
