import Artboard from '@/components/Artboard';
import ActionBar from '@/components/ActionBar';
import ToolBar from '@/components/ToolBar';
import Draggable from './components/Draggable';

import './App.css';

function App() {
  return (
    <div className="App">
      <Draggable>
        <Artboard />
      </Draggable>

      <ToolBar />
      <ActionBar />
    </div>
  );
}

export default App;
