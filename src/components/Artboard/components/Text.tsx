import { useRef, useEffect } from 'react';
import type { ComponentProps, FC } from 'react';
import { Group, Text as KonvaText, Transformer } from 'react-konva';
import type { Text as TextType } from 'konva/lib/shapes/Text';
import type { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import { Portal } from 'react-konva-utils';

export type TextProps = ComponentProps<typeof KonvaText> & {
  selected?: boolean;
  editor?: boolean;
  onTextChange?: (text: string) => void;
};

const Text: FC<TextProps> = (props: TextProps) => {
  const { selected } = props;

  const shapeRef = useRef<TextType>(null);
  const trRef = useRef<TransformerType>(null);

  useEffect(() => {
    if (selected && shapeRef.current) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [selected]);

  return (
    <Group draggable={selected}>
      <KonvaText {...props} ref={shapeRef} />

      {selected && (
        <Portal selector=".transformer-layer" enabled={selected}>
          <Transformer ref={trRef} />
        </Portal>
      )}
    </Group>
  );
};

export default Text;
