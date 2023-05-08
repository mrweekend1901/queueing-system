import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Device from './pages/Device';
import Service from './pages/Service';
import Number from './pages/Number';
import Report from './pages/Report';
import Setting from './pages/Setting';
import Login from './pages/Login';
import Forgetpass from './pages/Forgetpass';
import Newpass from './pages/Newpass';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgetpass" element={<Forgetpass />} />
          <Route path="/newpass" element={<Newpass />} />
          <Route path="/home" element={<Home />} />
          <Route path="/device" element={<Device />} />
          <Route path="/service" element={<Service />} />
          <Route path="/number" element={<Number />} />
          <Route path="/report" element={<Report />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
