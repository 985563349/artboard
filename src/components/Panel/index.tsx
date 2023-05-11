import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, ColorInput, Input, Slider } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useUpdateRef } from '@/hooks';
import { selectPanel, updatePanel } from '@/store';
import type { AppDispatch } from '@/store';

const swatches = [
  '#25262b',
  '#868e96',
  '#ff4400',
  '#e64980',
  '#be4bdb',
  '#7950f2',
  '#4c6ef5',
  '#228be6',
  '#15aabf',
  '#12b886',
  '#40c057',
  '#82c91e',
  '#fab005',
];

type PanelFormDataType = {
  stroke: string;
  background: string;
  opacity: number;
  strokeWidth: number;
  fontSize: number;
};

const Panel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const panel = useSelector(selectPanel);

  const form = useForm<PanelFormDataType>();
  const formValues = useUpdateRef(form.values);

  // sync form values from store
  useEffect(() => {
    form.setValues({ ...panel });
  }, [panel]);

  const getInputProps = (path: keyof PanelFormDataType) => {
    // hack: form.onValuesChange
    const inputProps = form.getInputProps(path);
    return {
      ...inputProps,
      onChangeEnd: () => {
        setTimeout(() => {
          // sync form values to store
          dispatch(updatePanel(formValues.current));
          // notification panel updates
          window.dispatchEvent(new CustomEvent('panel:change', { detail: formValues.current }));
        });
      },
    };
  };

  return (
    <div
      className="panel"
      onPointerEnter={() => {
        window.dispatchEvent(new Event('panel:enter'));
      }}
      onPointerLeave={() => {
        window.dispatchEvent(new Event('panel:leave'));
      }}
    >
      <Card shadow="sm" p="lg" radius="lg" withBorder>
        <Box maw={320} mx="auto">
          <form>
            <ColorInput label="Stroke" swatches={swatches} {...getInputProps('stroke')} />

            <ColorInput
              label="Background"
              mt="md"
              swatches={swatches}
              {...getInputProps('background')}
            />

            <Input.Wrapper label="Opacity" mt="md">
              <Slider {...getInputProps('opacity')} />
            </Input.Wrapper>

            <Input.Wrapper label="Stroke Width" mt="md">
              <Slider {...getInputProps('strokeWidth')} />
            </Input.Wrapper>

            <Input.Wrapper label="Font Size" mt="md">
              <Slider {...getInputProps('fontSize')} />
            </Input.Wrapper>
          </form>
        </Box>
      </Card>
    </div>
  );
};

export default Panel;
