import {useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/FraisForm.css';
import '../styles/FraisHorsForfait.css';
import axios from 'axios';
import { API_URL, getCurrentUser } from '../services/authService';

function FraisForm({frais}) {
  const [idFrais, setIdFrais] = useState(null);
  const [anneeMois, setAnneeMois] = useState('');
  const [nbJustificatifs, setNbJustificatifs] = useState(0);
  const [montant, setMontant] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Pré-remplir le formulaire si on modifie un frais existant 
  useEffect(() => { 
    if (frais) { 
      setIdFrais(frais.id_frais); 
      setMontant(frais.montantvalide || ''); 
      // TODO : compléter en affectant la valeur à anneeMois et nbJustificatifs 
      setAnneeMois(frais.anneemois || '');
      setNbJustificatifs(frais.nbjustificatifs || '');
      } 
    }, [frais]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token non défini, veuillez vous reconnecter.');
      }

      const fraisData = {
        anneemois: anneeMois,
        nbjustificatifs: parseInt(nbJustificatifs, 10),
      };

      if (frais){
        fraisData["id_frais"]=idFrais;
        fraisData["montantvalide"] = parseFloat(montant);

        const response = await axios.post(
          `${API_URL}frais/modif`,
          fraisData,
          { headers: { Authorization: `Bearer ${token}` }}
        );
        console.log(response)
      } else {
        fraisData["id_visiteur"] = getCurrentUser()['id_visiteur'];

        const response = await axios.post(`${API_URL}frais/ajout`, fraisData, {
          headers: {Authorization : `Bearer ${token}` },
        });
        console.log(response)
      }

      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Erreur lors de l'enregistrement"
      );
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="frais-form-container">
      <h2>{frais ? 'Modifier le frais ' : 'Saisir un frais'}</h2>

      {error && <div className="error-message">{error}</div>}

      <form className="frais-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="anneeMois">Année/Mois</label>
          <input
            type="text"
            id="anneeMois"
            value={anneeMois}
            onChange={(e) => setAnneeMois(e.target.value)}
            placeholder="Ex: 202310"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="nbJustificatifs">Nombre de justificatifs</label>
          <input
            type="number"
            id="nbJustificatifs"
            value={nbJustificatifs}
            onChange={(e) => setNbJustificatifs(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="montant">Montant</label>
          <input
            type="number"
            step="0.01"
            id="montant"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            required
          />
        </div>

        <Link className="frais-hors-forfait-link" to={`/frais/${idFrais}/hors-forfait`}>Frais hors forfait</Link>

        <button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : (frais ? 'Mettre à jour': 'Ajouter')}
        </button>
      </form>
    </div>
  );
}

export default FraisForm;