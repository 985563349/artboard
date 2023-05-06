import Artboard from '@/components/Artboard';
import ActionBar from '@/components/ActionBar';
import Draggable from '@/components/Draggable';
import Panel from '@/components/Panel';
import ToolBar from '@/components/ToolBar';

import './App.css';

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
