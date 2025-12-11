import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logoutUser } = useAuth(); 
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="liens">
                    <span className="navbar-gsb">GSB Frais</span>
                    <Link to="/" className="lien">Accueil</Link>
                    {user && (
                        <Link to="/dashboard" className="lien">
                            Tableau de bord
                        </Link>
                    )}
                    <Link to="/frais/ajouter" className="lien">Frais Ajouter</Link>
                </div>
                <div className="auth">
                    {user ? (
                        <button onClick={logoutUser} type="deco" className="lien">
                            Déconnexion
                        </button>
                    ) : (
                        <Link to="/login" className="lien">
                            Connexion
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
