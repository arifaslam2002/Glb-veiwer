import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Viewer from './Pages/Viewer'

const App = () => {
  return (
   <Router >
    <Routes >
      <Route path="/" element={<Home />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/viewer" element={<Viewer />}/>
    </Routes>
   </Router>
  )
}

export default App
