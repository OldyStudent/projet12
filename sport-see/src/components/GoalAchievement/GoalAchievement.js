import "./GoalAchievement.css";
import { useEffect, useRef } from "react";

import * as d3 from "d3";
import {
  createCircle,
  createGroup,
  createPath,
  createText,
} from "../../utils/d3-utils";

function renderChart(svgElement, percentage) {
  if (!svgElement) return;
  const svgRect = svgElement.getBoundingClientRect();
  const svgWidth = svgRect.width;
  const svgHeight = svgRect.height;
  const svg = d3.select(svgElement);

  const circleRadius = 80;

  createCircle(svg, {
    cx: svgWidth / 2,
    cy: svgHeight / 2,
    r: circleRadius,
    fill: "white",
  });

  // Ajout du texte au milieu du cercle
  const textGroup = createGroup(svg, {
    transform: `translate(${svgWidth / 2}, ${svgHeight / 2 - 20})`,
  });

  // Ajouter le premier élément de texte (le pourcentage)
  const percentageText = createText(textGroup, `0%`, {
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-size": "26px",
    "font-weight": "bold",
    fill: "#282D30",
  });

  percentageText
    .transition()
    .delay(4800)
    .duration(2000)
    .ease(d3.easeCubicOut)
    .tween("text", function () {
      const finalPercentage = parseFloat(percentage * 100);
      const interpolator = d3.interpolate(0, finalPercentage);
      return function (t) {
        const currentValue = interpolator(t);
        this.textContent = Math.round(currentValue) + "%";
      };
    });

  // Ajout du reste du texte
  const subTextProperties = {
    "text-anchor": "middle",
    "dominant-baseline": "middle",
    "font-weight": "500",
    "font-size": "16px",
    fill: "#74798C",
  };
  createText(textGroup, "de votre", {
    ...subTextProperties,
    dy: "28px",
  });

  createText(textGroup, "objectif", {
    ...subTextProperties,
    dy: "48px",
    fill: "#74798C",
  });

  // Génération du trait arrondi rouge
  const TWO_PI = 2 * Math.PI;
  const arc = d3
    .arc()
    .innerRadius(circleRadius)
    .outerRadius(circleRadius + 10)
    .startAngle(TWO_PI)
    .endAngle(TWO_PI)
    .cornerRadius(5);

  const arcPath = createPath(
    svg,
    {},
    {
      d: arc,
      fill: "red",
      stroke: "none",
      transform: `translate(${svgWidth / 2}, ${svgHeight / 2})`,
    },
  );

  arcPath
    .transition()
    .delay(4800)
    .duration(2000)
    .ease(d3.easeCubicOut)
    .attrTween("d", function () {
      const interpolator = d3.interpolate(0, percentage);
      return function (t) {
        const currentValue = interpolator(t); // Valeur courante du pourcentage
        const currentArc = d3
          .arc()
          .innerRadius(circleRadius - 5)
          .outerRadius(circleRadius + 5)
          .startAngle(TWO_PI * (1 - currentValue))
          .endAngle(TWO_PI)
          .cornerRadius(5);
        return currentArc();
      };
    });
}

export default function GoalAchievement({ percentage }) {
  const svgRef = useRef();

  useEffect(() => {
    renderChart(svgRef.current, percentage);
  }, [percentage]);

  return <svg className="GoalAchievement" ref={svgRef}></svg>;
}
