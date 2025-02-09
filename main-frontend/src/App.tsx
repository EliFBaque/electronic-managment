// @ts-ignore
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./features/sidebar/Sidebar";


const App: React.FC = () => {
  return (
    <Router>
      <div className="">
        {/* Sidebar a la izquierda */}
        <Sidebar />
      </div>
    </Router>
  );
};

export default App;