import type { ComponentProps, FC } from 'react';
import { Text as KonvaText } from 'react-konva';

export type TextProps = ComponentProps<typeof KonvaText>;

const Text: FC<TextProps> = (props) => {
  return <KonvaText {...props} />;
};

export default Text;
