import { useEffect, useState } from 'react';
import { Affix, Text, rem } from '@mantine/core';

const Stats: React.FC = () => {
  const [state, setState] = useState({ fps: 0 });

  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;

    function calculateFPS() {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;

      frameCount++;

      if (deltaTime >= 1000) {
        setState({ fps: frameCount });
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(calculateFPS);
    }

    calculateFPS();
  }, []);

  return (
    <Affix position={{ top: rem(10), left: rem(10) }}>
      <Text c={state.fps < 30 ? 'red' : 'green'}>FPS: {state.fps}</Text>
    </Affix>
  );
};

export default Stats;
