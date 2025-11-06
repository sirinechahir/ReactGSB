import './App.css';
import {BrowserRouter} from 'react-router-dom'
import {Routes} from 'react-router-dom'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';



function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
  
    </BrowserRouter>
  );
}

export default App;
