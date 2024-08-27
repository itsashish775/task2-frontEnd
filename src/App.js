import './App.css';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CreateAccount from './components/CreateAccount';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Profile from './components/Profile';
import Listing from './components/Listing';

function App() {
  return (
    <div className="App">

      <BrowserRouter basename="/">
        <nav style={{
          backgroundColor: '#282c34',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '1.5rem' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
          </div>
          <div>
            <Link to="/login" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Login</Link>
            <Link to="/profile" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Profile</Link>
            <Link to="/listing" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Listing</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<CreateAccount />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/listing" element={<Listing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
