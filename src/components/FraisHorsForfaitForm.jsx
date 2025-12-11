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
            await axios.post(
                `${API_URL}fraisHF/ajout`,
                {
                    id_frais: idFrais,
                    date,
                    libelle,
                    montant,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate(`/frais/${idFrais}/hors-forfait`);
        } catch (err) {
            setError("Impossible d'enregistrer le frais hors forfait.");
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
