import { Line as KonvaLine } from 'react-konva';

export type LineProps = React.ComponentProps<typeof KonvaLine>;

const Line: React.FC<LineProps> = (props) => {
  return <KonvaLine {...props} />;
};

export default Line;
