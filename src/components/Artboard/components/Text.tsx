import type { FC } from 'react';
import { Text as KonvaText } from 'react-konva';
import type { TextConfig } from 'konva/lib/shapes/Text';

export type TextProps = TextConfig;

const Text: FC<TextProps> = (props) => {
  return <KonvaText {...props} />;
};

export default Text;
