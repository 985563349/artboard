import type { ComponentProps, FC } from 'react';
import { Text as KonvaText } from 'react-konva';
import Transformer from './Transformer';

export type TextProps = ComponentProps<typeof KonvaText>;

const Text: FC<TextProps> = (props) => {
  return (
    <Transformer selected>
      <KonvaText {...props} />
    </Transformer>
  );
};

export default Text;
