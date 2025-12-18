import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import FraisHorsForfaitTable from "../components/FraisHorsForfaitTable";
import "../styles/FraisHorsForfait.css";

function FraisHorsForfait() {
    const { id } = useParams();
    const { token } = useAuth();
    const [fraisHorsForfaitList, setFraisHorsForfaitList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchFraisHorsForfaitList = async () => {
            try {
                const response = await axios.get(`${API_URL}fraisHF/liste/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFraisHorsForfaitList(response.data);

                // calcul du total des frais hors forfait 
                let somme = 0;
                response.data.forEach((fraisHorsForfait) => {
                    somme += parseFloat(fraisHorsForfait.montant_fraishorsforfait);
                });
                setTotal(somme);
            } catch (error) {
                console.error("Erreur lors de la récupération des frais hors forfait:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFraisHorsForfaitList();
    }, [id, token]); // Tableau de dépendances rempli = exécute pls fois selon id

    const handleDelete = async (idHF) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce frais hors forfait ?")) return;
        try {
            await axios.delete(`${API_URL}fraisHF/suppr`, {
                data: { id_fraisHF: idHF },
                headers: { Authorization: `Bearer ${token}` },
            });
            setFraisHorsForfaitList(fraisHorsForfaitList.filter((f) => f.id_fraishorsforfait !== idHF));
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    };
    

    if (loading) return <div><b>Chargement des frais hors forfait...</b></div>;




    return (
        <div className="page-frais-hors-forfait">
            <h1>Frais hors forfait</h1>
            <FraisHorsForfaitTable
                idFrais={id}
                fraisHorsForfaitList={fraisHorsForfaitList}
                total={total}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default FraisHorsForfait;
