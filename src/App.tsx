import ToolBar from '@/components/ToolBar';
import ActionBar from '@/components/ActionBar';
import Artboard from '@/components/Artboard';
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
