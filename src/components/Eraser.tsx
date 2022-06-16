import type { ComponentProps, FC } from 'react';
import { Line } from 'react-konva';

export type EraserProps = ComponentProps<typeof Line>;

const Eraser: FC<EraserProps> = (props) => {
  return <Line {...props} />;
};

export default Eraser;
