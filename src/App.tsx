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
import NumberPage from './pages/Number';
import Adddevice from './components/Table/Addtable/Adddevice';
import Addservice from './components/Table/Addtable/Addservice';
import Addnumber from './components/Table/Addtable/Addnumber';
import DetailDevice from './components/Table/DetailRow/DetailDevice';
import DetailNumber from './components/Table/DetailRow/DetailNumber';
import DetailService from './components/Table/DetailRow/DetailService';
import UpdateDevice from './components/Table/Updatetable/UpdateDevice';
import UpdateService from './components/Table/Updatetable/UpdateService';
import SettingRole from './pages/Setting/SettingRole';
import Addrole from './components/Table/Addtable/Addrole';
import AddUser from './components/Table/Addtable/Adduser';
import SettingUser from './pages/Setting/SettingUser';
import UpdateRole from './components/Table/Updatetable/UpdateRole';
import UpdateUser from './components/Table/Updatetable/UpdateUser';
import HistoryPage from './pages/Setting/History';

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
          <Route path="/setting/settingrole" element={<SettingRole />} />
          <Route path="/setting/settinguser" element={<SettingUser />} />
          <Route path="/setting/history" element={<HistoryPage />} />
          <Route path="/setting/settingrole/addrole" element={<Addrole />} />
          <Route path="/setting/settinguser/adduser" element={<AddUser />} />
          <Route path="/setting/settingrole/updaterole" element={<UpdateRole />} />
          <Route path="/setting/settinguser/updateuser" element={<UpdateUser />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/device/adddevice" element={<Adddevice />} />
          <Route path="/device/updatedevice" element={<UpdateDevice />} />
          <Route path="/service/addservice" element={<Addservice />} />
          <Route path="/service/detailservice" element={<DetailService />} />
          <Route path="/service/updateservice" element={<UpdateService />} />
          <Route path="/number/addnumber" element={<Addnumber />} />
          <Route path="/number/detailnumber" element={<DetailNumber />} />
          <Route path="/device/detaildevice" element={<DetailDevice />} />
        </Routes>
      </Sidebar>
    </>
  );
}
export default App;
