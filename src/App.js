import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'; 
import FraisAdd from './pages/FraisAdd';
import FraisEdit from './components/FraisEdit';
import FraisHorsForfait from './pages/FraisHorsForfait';
import FraisHorsForfaitAdd from './pages/FraisHorsForfaitAdd';
import FraisHorsForfaitEdit from './pages/FraisHorsForfaitEdit';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/frais/ajouter" element={<FraisAdd />} />
          <Route path="/frais/modifier/:id" element={<FraisEdit />} />
          <Route path="/frais/:id/hors-forfait" element={<FraisHorsForfait />} /> 
          <Route path="/frais/:id/hors-forfait/ajouter" element={<FraisHorsForfaitAdd />} />
          <Route path="/frais/:id/hors-forfait/modifier/:idHF" element={<FraisHorsForfaitEdit />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;




