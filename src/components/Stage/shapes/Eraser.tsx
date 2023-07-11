import { Line } from 'react-konva';

export type EraserProps = React.ComponentProps<typeof Line>;

const Eraser: React.FC<EraserProps> = (props) => {
  return <Line {...props} />;
};

export default Eraser;
