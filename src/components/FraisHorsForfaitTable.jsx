import { useNavigate } from "react-router-dom";

function FraisHorsForfaitTable({ idFrais, fraisHorsForfaitList, total, handleDelete }) {
    const navigate = useNavigate();

    return (
        <div className="frais-hors--container">
            <table className="frais-hors-forfait-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Montant</th>
                        <th>Libellé</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {fraisHorsForfaitList.map((f) => (
                        <tr key={f.id_frais}>
                            <td>{f.date_fraishorsforfait}</td>
                            <td>{f.montant_fraishorsforfait}</td>
                            <td>{f.lib_fraishorsforfait}</td>
                            <td>
                                <button onClick={() => navigate(`/frais/${f.id_frais}/hors-forfait/modifier/${f.id_fraishorsforfait}`)}
                                    className="edit-button" >
                                    Modifier
                                </button>
                                <button onClick={() => handleDelete(f.id_fraishorsforfait)}
                                    className="delete-button"
                                >
                                    Supprimer
                                </button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="total">
                Total : {total} €
            </div>
            <br />
            <button onClick={() => navigate(`/frais/${idFrais}/hors-forfait/ajouter`)}
                className="button" >
                Ajouter
            </button>
            <button onClick={() => navigate(`/frais/modifier/${idFrais}`)}
                className="return-button" >
                Retour
            </button>

        </div>
    );
}

export default FraisHorsForfaitTable;
