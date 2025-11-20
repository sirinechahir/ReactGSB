import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FraisForm.css';
import axios from 'axios';
import { API_URL, getCurrentUser } from '../services/authService';

function FraisForm() {
  const [idFrais, setIdFrais] = useState(null);
  const [anneeMois, setAnneeMois] = useState('');
  const [nbJustificatifs, setNbJustificatifs] = useState('');
  const [montant, setMontant] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

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
        montant: parseFloat(montant),
        id_visiteur: getCurrentUser()['id_visiteur'],
      };

      const response = await axios.post(`${API_URL}frais/ajout`, fraisData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Réponse API:', response.data);

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
      <h2>Saisir un frais</h2>

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

        <button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
}

export default FraisForm;