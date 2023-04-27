import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Device from './pages/Device';
import Service from './pages/Service';
import Number from './pages/Number';
import Report from './pages/Report';
import Setting from './pages/Setting';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
