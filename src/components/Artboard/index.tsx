import { Stage, Layer, Text } from 'react-konva';
import { useWindowSize } from 'react-use';
import './index.css';

const Artboard = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="artboard">
      <Stage width={width} height={height} draggable>
        {/* draw layer */}
        <Layer name="draw-layer">
          <Text text="WJ LOVE LYG" x={width / 2} y={height / 2} fill="#F86B6B" fontSize={32} />
        </Layer>

        {/* Transformer layer */}
        <Layer name="transformer-layer" />
      </Stage>
    </div>
  );
};

export default Artboard;
