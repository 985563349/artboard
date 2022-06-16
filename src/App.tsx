import ToolBar from '@/layout/ToolBar';
import ActionBar from '@/layout/ActionBar';
import Artboard from '@/layout/Artboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Artboard />
      <ToolBar />
      <ActionBar />
    </div>
  );
}

export default App;
