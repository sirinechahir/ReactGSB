import {Link} from 'react-router-dom';
import '../styles/Navbar.css';


function Navbar(){
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="liens">
                    <span className="navbar-gsb">GSB Frais </span>
                    <Link to="/" className="lien">Accueil</Link>
                    <Link to="/dashboard" className="lien">Tableau de bord</Link>
                </div>
                <div className="auth">
                    <Link to="" className="lien">Déconnexion</Link>
                    <Link to="/login" className="lien">Connexion</Link>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;