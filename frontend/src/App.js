import Home from './home';
import Navbar from './navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ModifyPet from './modifyPet';

function App() {
  return (
      <Router>
        <div className="App">
          <Navbar/>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route path="/create" element={<Home/>}/>
              <Route path="/forum" element={<Home/>}/>
              <Route path="/login" element={<Home/>}/>
              <Route path="/register" element={<Home/>}/>
              <Route path="/modify/pets/:petId" element={<ModifyPet/>}/>
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
