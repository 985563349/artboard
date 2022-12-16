import { Text as KonvaText } from 'react-konva';

export type TextProps = React.ComponentProps<typeof KonvaText>;

const Text: React.FC<TextProps> = (props: TextProps) => {
  return <KonvaText {...props} />;
};

export default Text;
