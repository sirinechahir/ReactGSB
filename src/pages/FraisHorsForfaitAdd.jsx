import { useParams } from "react-router-dom";
import FraisHorsForfaitForm from "../components/FraisHorsForfaitForm";

function FraisHorsForfaitAdd() {
  // 1. Récupérer l'id depuis l'URL
  const { id } = useParams();

  return (
    <div className="page-frais-hors-forfait-add">
      <h1>Ajouter un frais hors forfait</h1>

      {/* 2. Afficher le composant enfant en lui passant l'id */}
      <FraisHorsForfaitForm idFrais={id} />
    </div>
  );
}

export default FraisHorsForfaitAdd;
