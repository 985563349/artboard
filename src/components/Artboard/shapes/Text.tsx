import { Group, Text as KonvaText } from 'react-konva';

export type TextProps = React.ComponentProps<typeof KonvaText> & {
  editor?: boolean;
  onTextChange?: (text: string) => void;
};

const Text: React.FC<TextProps> = (props: TextProps) => {
  return (
    <Group draggable>
      <KonvaText {...props} />
    </Group>
  );
};

export default Text;
