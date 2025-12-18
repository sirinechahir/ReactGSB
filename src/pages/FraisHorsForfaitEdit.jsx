import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../services/authService';
import FraisHorsForfaitForm from '../components/FraisHorsForfaitForm';


function FraisHorsForfaitEdit() {
  const { id, idHF } = useParams(); 
  const [frais, setFrais] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchFrais = async () => {     
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}fraisHF/${idHF}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFrais(response.data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFrais();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (!frais) return <div>Frais non trouvé</div>;


  return (<FraisHorsForfaitForm idFrais={id} idHF={idHF} frais={frais} />);
}

export default FraisHorsForfaitEdit;