import type { ComponentProps, FC } from 'react';
import { Line as KonvaLine } from 'react-konva';

export type LineProps = ComponentProps<typeof KonvaLine>;

const Line: FC<LineProps> = (props) => {
  return <KonvaLine {...props} />;
};

export default Line;
