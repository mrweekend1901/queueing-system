import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Forgetpass from './pages/Forgetpass';
import Newpass from './pages/Newpass';
import Device from './pages/Device';
import Service from './pages/Service';
import Report from './pages/Report';
import Sidebar from './components/Layout/Sidebar';
import Home from './pages/Home';
import Setting from './pages/Setting';
import Dashboard from './pages/Dashboard';
import DetailRow from './components/Table/DetailRow';
import NumberPage from './pages/Number';
import Adddevice from './components/Table/Addtable/Adddevice';
import Addservice from './components/Table/Addtable/Addservice';
import Addnumber from './components/Table/Addtable/Addnumber';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpass" element={<Forgetpass />} />
          <Route path="/newpass" element={<Newpass />} />
          <Route path="/*" element={<MainContent />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainContent() {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/device" element={<Device />} />
          <Route path="/service" element={<Service />} />
          <Route path="/number" element={<NumberPage />} />
          <Route path="/report" element={<Report />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/detailrow" element={<DetailRow />} />
          <Route path="/adddevice" element={<Adddevice />} />
          <Route path="/addservice" element={<Addservice />} />
          <Route path="/addnumber" element={<Addnumber />} />
        </Routes>
      </Sidebar>
    </>
  );
}
export default App;
