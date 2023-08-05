import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { NavBar } from './common/NavBar';
import { Profile } from './components/Profile';
import { Joke } from './components/Joke';
import { Kitsu } from './components/Kitsu';
import { Logout } from './common/Logout';

function App() {
  return (
    <div className="">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/joke' element={<Joke />} />
          <Route path='/kitsu' element={<Kitsu />} />
          <Route path='/logout' element={<Logout/>}/>
          <Route path='*' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
