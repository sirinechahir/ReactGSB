import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../styles/FraisHorsForfait.css";

function FraisHorsForfaitForm({ idFrais, frais }) {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [date, setDate] = useState("");
    const [libelle, setLibelle] = useState("");
    const [montant, setMontant] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (frais) {
            setDate(frais.date_fraishorsforfait || "");
            setLibelle(frais.lib_fraishorsforfait || "");
            setMontant(frais.montant_fraishorsforfait || "");
        }
    }, [frais]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token non défini, veuillez vous reconnecter.");
            }

            const fraisHFData = {
                date,
                libelle,
                montant: parseFloat(montant),
            };

            if (frais) {
                // Cas modification
                fraisHFData["id_fraisHF"] = frais.id_fraishorsforfait;

                const response = await axios.post(
                    `${API_URL}fraisHF/modif`,
                    fraisHFData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log("Modification réussie:", response.data);
            } else {
                // Cas ajout
                fraisHFData["id_frais"] = idFrais;

                const response = await axios.post(
                    `${API_URL}fraisHF/ajout`,
                    fraisHFData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log("Ajout réussi:", response.data);
            }

            navigate(`/frais/${idFrais}/hors-forfait`);
        } catch (err) {
            console.error("Erreur:", err);
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
            <h2>{frais ? "Modifier le frais hors forfait" : "Saisir un frais hors forfait"}</h2>

            {error && <div className="error-message">{error}</div>}

            <form className="frais-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Ex: 2023-10-01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="libelle">Libellé</label>
                    <input
                        type="text"
                        id="libelle"
                        value={libelle}
                        onChange={(e) => setLibelle(e.target.value)}
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

                <Link className="frais-hors-forfait-link" to={`/frais/${idFrais}/hors-forfait`}>
                    Retour à la liste
                </Link>

                <button type="submit" disabled={loading}>
                    {loading ? "Enregistrement..." : frais ? "Mettre à jour" : "Ajouter"}
                </button>
            </form>
        </div>
    );
}

export default FraisHorsForfaitForm;
