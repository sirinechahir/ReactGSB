import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../services/authService';

function FormFormulation() {
    const { id_med, id_pres } = useParams();
    const { state } = useLocation(); // Contient les données si on vient de "Modifier"
    const navigate = useNavigate();
    const { token } = useAuth();

    // On pré-remplit les champs si c'est une modification (state existe)
    const [qte, setQte] = useState(state ? state.qte_formuler : '');
    const [pres, setPres] = useState(state ? state.id_presentation : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            id_medicament: id_med,
            qteformuler: qte,
            presentation: pres,
            id_presentation_old: id_pres || null 
        };

        try {
            await axios.post(`${API_URL}validerFormulation`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Redirection vers la liste après succès
            navigate(`/listerFormulation/${id_med}`);
        } catch (error) {
            alert("Erreur lors de l'enregistrement.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">{id_pres ? 'Modifier une formulation' : 'Ajouter une formulation'}</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label fw-bold">Quantité</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={qte} 
                        onChange={(e) => setQte(e.target.value)} 
                        required 
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold">Présentation : ID (1 à 14)</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        value={pres} 
                        onChange={(e) => setPres(e.target.value)} 
                        required 
                    />
                </div>

                <div className="d-flex">
                    <button type="submit" className="btn btn-primary me-2">
                        Valider
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>
                        Retour
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormFormulation;