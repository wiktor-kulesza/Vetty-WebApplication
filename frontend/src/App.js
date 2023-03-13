import Home from './home';
import Navbar from './navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ModifyPet from './modifyPet';
import AddPet from './addPet';
import Pet from './pet';
import Login from './auth/login';
import RouteGuard from './route_guard';
import Signup from './auth/signup';

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar/>
          <div className="content">
            <Routes>
              <Route path="/add/pet" element={<AddPet/>}/>
              <Route element={<RouteGuard/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/forum" element={<Home/>}/>
              </Route>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/modify/pets/:petId" element={<ModifyPet/>}/>
              <Route path="/pet/:id" element={<Pet/>}/>
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
