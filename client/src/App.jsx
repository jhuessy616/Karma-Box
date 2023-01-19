
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import './app.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
    </div>
  );
}

export default App;
