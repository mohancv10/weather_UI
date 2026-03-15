import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={{margin: "10px"}}>
      <h2>Weather Report Dashboard</h2>
      <Outlet/>
    </div>
  );
}

export default App;
