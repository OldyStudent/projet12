import "./GenericChart.css";
import { useEffect, useRef } from "react";

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
