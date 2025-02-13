import { lazy } from "react";
const Hero = lazy(() => import("./components/Hero"));
import "./App.css";


function App() {
  return (
    <div className="app-container">
      <Hero />
    </div>
  );
}

export default App;



