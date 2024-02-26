import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "preline/preline";

//for testing, will be adjusted
function App() {
  return (
    <>
      <div className="mx-auto my-auto h-screen bg-white text-black">
        <Router>
          <Routes>
            <Route index element= {<LandingPage />} />
          </Routes>
        </Router>
      </div>
    </>
  )
};

export default App

