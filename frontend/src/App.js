import './styles/style.css';
import Home from './components/home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ModifyPet from './components/modifyPet';
import AddPet from './components/addPet';
import Pet from './components/pet';
import Login from './auth/login';
import RouteGuard from './auth/route_guard';
import Signup from './auth/signup';
import LogoutIfJwtExpired from './auth/logout';
import Verify from './auth/verify';
import AddMedicalHistory from './components/addMedicalHistory';
import CustomNavbar from './components/customNavbar';
import ForumView from './components/forum';
import * as con from './constants/constants';
import Thread from './components/thread';
import ProfileView from './components/profile';

function App() {

  function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.reload();
  }

  return (
      <Router>
        <div className="App">
          <LogoutIfJwtExpired/>
          <CustomNavbar/>
          <div className="content">
            <Routes>
              <Route path={con.ADD_PET} element={<AddPet/>}/>
              <Route path={con.ADD_MEDICAL_HISTORY + ":petId"} element={<AddMedicalHistory/>}/>
              <Route path={con.THREAD + ":threadId"} element={<Thread/>}/>
              <Route element={<RouteGuard/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/forum" element={<ForumView/>}/>
              </Route>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/modify/pets/:petId" element={<ModifyPet/>}/>
              <Route path="/pet/:id" element={<Pet/>}/>
              <Route path="/user/:email" element={<ProfileView/>}/>
            </Routes>
          </div>
          <Verify logOut={logOut}/>
        </div>
      </Router>
  );

}

export default App;
