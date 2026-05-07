import React, { useState, useEffect } from 'react';
import '../styles/FraisTable.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function ListeMedicament() {
  const [medicamentList, setMedicamentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  // Charge tous les médicaments au départ — comme FraisTable
  useEffect(() => {
    fetchMedicaments('');
  }, []);

  // Fonction réutilisable : appelée au chargement ET au clic Valider
  const fetchMedicaments = async (recherche) => {
    try {
      setLoading(true);

      // Si recherche vide → liste complète, sinon → filtre API
      const url = recherche
        ? `${API_URL}rechercherMedicament?recherche=${recherche}`
        : `${API_URL}listerMedicament`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMedicamentList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des médicaments:', error);
      setLoading(false);
    }
  };

  // Clic sur Valider — comme le POST Laravel mais en GET API
  const handleRecherche = (e) => {
    e.preventDefault();
    fetchMedicaments(searchTerm);
  };

  // Clic sur Annuler — remet tout à zéro comme le bouton Annuler Laravel
  const handleAnnuler = () => {
    if (window.confirm('Annuler la recherche ?')) {
      setSearchTerm('');
      fetchMedicaments('');
    }
  };

  if (loading) return <div><b>Chargement des médicaments...</b></div>;

  return (
    <div className="frais-table-container">
      <h2>Liste des Médicaments</h2>

      {/* Formulaire de recherche — même structure que ta vue Laravel */}
      <div className="col-md-12 card card-body bg-light">
        <form onSubmit={handleRecherche}>

          <div className="form-group">
            <label className="col-md-9">Rechercher médicaments</label>
            <div className="col-md-6">
              <input
                type="text"
                name="recherchemedicament"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group mt-3"> {/* Ajout de mt-3 pour un petit espacement en haut */}
            {/* Bouton Valider */}
            <button type="submit" className="btn btn-primary me-2 shadow-sm" style={{ width: '150px' }}>
              Valider
            </button>

            {/* Bouton Annuler */}
            <button
              type="button"
              className="btn btn-secondary shadow-sm"
              onClick={handleAnnuler}
              style={{ width: '150px' }}
            >                        
              Annuler
            </button>
          </div>

        </form>
      </div>

      {/* Tableau des résultats */}
      <table className="frais-table">
        <thead>
          <tr>
            <th>Famille</th>
            <th>Dépôt légal</th>
            <th>Nom commercial</th>
            <th>Effets</th>
            <th>Contre-indication</th>
            <th>Prix échantillon</th>
            <th>Formulation</th>
          </tr>
        </thead>
        <tbody>
          {medicamentList.map((med) => (
            <tr key={med.id_medicament}>
              <td>{med.lib_famille}</td>
              <td>{med.depot_legal}</td>
              <td>{med.nom_commercial}</td>
              <td>{med.effets}</td>
              <td>{med.contre_indication}</td>
              <td>{med.prix_echantillon} €</td>
              <td>
                <button
                  onClick={() => navigate(`/listerFormulation/${med.id_medicament}`)}
                  className="edit-button"
                >
                  Voir formulations
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListeMedicament;