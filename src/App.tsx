import Artboard from '@/components/Artboard';
import ActionBar from '@/components/ActionBar';
import ToolBar from '@/components/ToolBar';

import './App.css';

function App() {
  return (
    <div className="App">
      <ToolBar />
      <Artboard />
      <ActionBar />
    </div>
  );
}

export default App;
