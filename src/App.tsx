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
          <Route path="/queueing-system" element={<Login />} />
          <Route path="/queueing-system/forgetpass" element={<Forgetpass />} />
          <Route path="/queueing-system/newpass" element={<Newpass />} />
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
          <Route path="/queueing-system/home" element={<Home />} />
          <Route path="/queueing-system/dashboard" element={<Dashboard />} />
          <Route path="/queueing-system/device" element={<Device />} />
          <Route path="/queueing-system/service" element={<Service />} />
          <Route path="/queueing-system/number" element={<NumberPage />} />
          <Route path="/queueing-system/report" element={<Report />} />
          <Route path="/queueing-system/setting/settingrole" element={<SettingRole />} />
          <Route path="/queueing-system/setting/settinguser" element={<SettingUser />} />
          <Route path="/queueing-system/setting/history" element={<HistoryPage />} />
          <Route path="/queueing-system/setting/settingrole/addrole" element={<Addrole />} />
          <Route path="/queueing-system/setting/settinguser/adduser" element={<AddUser />} />
          <Route path="/queueing-system/setting/settingrole/updaterole" element={<UpdateRole />} />
          <Route path="/queueing-system/setting/settinguser/updateuser" element={<UpdateUser />} />
          <Route path="/queueing-system/setting" element={<Setting />} />
          <Route path="/queueing-system/device/adddevice" element={<Adddevice />} />
          <Route path="/queueing-system/device/updatedevice" element={<UpdateDevice />} />
          <Route path="/queueing-system/service/addservice" element={<Addservice />} />
          <Route path="/queueing-system/service/detailservice" element={<DetailService />} />
          <Route path="/queueing-system/service/updateservice" element={<UpdateService />} />
          <Route path="/queueing-system/number/addnumber" element={<Addnumber />} />
          <Route path="/queueing-system/number/detailnumber" element={<DetailNumber />} />
          <Route path="/queueing-system/device/detaildevice" element={<DetailDevice />} />
        </Routes>
      </Sidebar>
    </>
  );
}
export default App;
