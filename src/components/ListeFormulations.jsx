import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../services/authService';

function ListeFormulations() {
    const { id } = useParams(); 
    const [formulations, setFormulations] = useState([]);
    const [med, setMed] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const navigate = useNavigate();

    // Fonction pour charger les données
    const fetchFormulations = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}listerFormulations/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // On récupère les données selon la structure de ton API Laravel
            setFormulations(response.data.fiches || []);
            setMed(response.data.medicament);
        } catch (error) {
            console.error("Erreur lors de la récupération:", error);
        } finally {
            setLoading(false);
        }
    }, [id, token]);

    useEffect(() => {
        fetchFormulations();
    }, [fetchFormulations]);

    // Fonction de suppression
    const handleDelete = async (idPres) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette formulation ?")) {
            try {
                await axios.delete(`${API_URL}supprimerFormulation/${id}/${idPres}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // On recharge la liste immédiatement après suppression
                fetchFormulations();
            } catch (error) {
                alert("Erreur lors de la suppression.");
            }
        }
    };

    if (loading) return <div className="container mt-4"><h3>Chargement...</h3></div>;
    if (!med) return <div className="container mt-4"><h3>Médicament introuvable.</h3></div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Liste des formulations : {med.nom_commercial}</h1>
            
            {/* Ajout de table-bordered pour afficher le tableau comme sur la photo */}
  <table className="table table-bordered table-striped mt-3">
    <thead className="table-light">
        <tr>
            <th className="border">Quantité formuler</th>
            <th className="border">Présentation</th>
            <th className="border text-center">Modifier</th>
            <th className="border text-center">Supprimer</th>
        </tr>
    </thead>
    <tbody>
        {formulations.length > 0 ? (
            formulations.map((f, index) => (
                <tr key={`${f.id_presentation}-${index}`}>
                    <td className="border">{f.qte_formuler}</td>
                    <td className="border">{f.lib_presentation}</td>
                    <td className="border text-center">
                        <button 
                            className="btn btn-link p-0" 
                            style={{ textDecoration: 'none' }}
                            onClick={() => navigate(`/editerFormulation/${id}/${f.id_presentation}`, { state: f })}
                        >
                            Modifier
                        </button>
                    </td>
                    <td className="border text-center">
                        <button 
                            className="btn btn-link text-danger p-0" 
                            style={{ textDecoration: 'none' }}
                            onClick={() => handleDelete(f.id_presentation)}
                        >
                            Supprimer
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="4" className="text-center border">Aucune formulation trouvée.</td>
            </tr>
        )}
    </tbody>
</table>

            <div className="mt-4">
                <button className="btn btn-primary me-2" onClick={() => navigate(`/ajouterFormulation/${id}`)}>
                    Ajouter
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/listerMedicament')}>
                    Retour
                </button>
            </div>
        </div>
    );
}

export default ListeFormulations;