import "./GenericChart.css";
import { useEffect, useRef } from "react";

/**
 * Composant générique pour afficher un graphique svg en utilisant d3.js.
 * @param {string} props.userId - Identifiant de l'utilisateur pour récupérer les données.
 * @param {function} props.fetchData - Fonction (hook) pour récupérer les données..
 * @param {Object} props.render - Un objet contenant la fonction de rendu du graphique et ses arguments.
 * @param {Array} [props.dependenciesToUpdate=[]] - Tableau facultatif des dépendances pour déclencher des mises à jour.
 * @param {string} props.chartClassName - Le nom de classe pour le graphique.
 * @returns {JSX.Element} Élément JSX représentant le graphique générique.
 */

export function GenericChart({userId, fetchData, render, dependenciesToUpdate = [], chartClassName}) {
  const {isLoading, error, data} = fetchData(userId);
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;
    render.fn(svgRef.current, data, ...render.fnAdditionalArgs);
  }, [userId, data, ...dependenciesToUpdate]);

  if (isLoading) {
    return <div className="GenericChart">Loading...</div>;
  }

  if (error) {
    return (
      <div className="GenericChart">
        😵 Oups! Erreur lors du chargement des données.
      </div>
    );
  }

  return <svg className={`GenericChart ${chartClassName}`} ref={svgRef}></svg>;
}
