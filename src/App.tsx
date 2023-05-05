import Artboard from '@/components/Artboard';
import ActionBar from '@/components/ActionBar';
import ToolBar from '@/components/ToolBar';
import Draggable from './components/Draggable';

import './App.css';
import Panel from './components/Panel';

function App() {
  return (
    <div className="App">
      <ToolBar />

      <Draggable>
        <Artboard />
      </Draggable>

      <ActionBar />
      <Panel />
    </div>
  );
}

export default App;
