import "./HexaMetricsVisualizer.css";
import * as d3 from "d3";
import { useGetUserPerformancesData } from "../../hooks/useGetUserPerformancesData";
import { GenericChart } from "../GenericChart/GenericChart";
import {
  createPolygon,
  createText,
  getLinearScale,
} from "../../utils/d3-utils";

/**
 * Permet d'obtenir un tableau contenant la liste des coordonées des points d'un hexagone.
 * @param {number} x - La coordonnée x du centre de l'hexagone.
 * @param {number} y - La coordonnée y du centre de l'hexagone.
 * @param {number} radius - Le rayon de l'hexagone.
 * @returns {Array} Un tableau contenant les coordonnées des points de l'hexagone.
 */
function getHexagonPoints(x, y, radius) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + Math.PI / 2;
    const px = x + radius * Math.cos(angle);
    const py = y + radius * Math.sin(angle);
    points.push([px, py]);
  }
  return points;
}

function renderChart(svgElement, data) {
  if (!svgElement) return;
  const svgRect = svgElement.getBoundingClientRect();
  const svgWidth = svgRect.width;
  const svgHeight = svgRect.height;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  let hexagonRadius = svgWidth * 0.35;

  const svg = d3.select(svgElement);

  for (let i = 0; i < 5; i++) {
    const hexagonPointList = getHexagonPoints(centerX, centerY, hexagonRadius);

    createPolygon(svg, {
      points: hexagonPointList,
      fill: "none",
      stroke: "white",
      "stroke-width": 1,
      opacity: 0.05,
    });

    hexagonRadius -= 20;
  }

  const outerHexagonPointList = getHexagonPoints(
    centerX,
    centerY,
    svgWidth * 0.35,
  );

  ["Endurance", "Energie", "Cardio", "Intensité", "Vitesse", "Force"].forEach(
    (d, i) => {
      const [labelX, labelY] = outerHexagonPointList[i];

      const directionX = labelX - centerX;
      const directionY = labelY - centerY;

      const vectorLength = Math.sqrt(directionX ** 2 + directionY ** 2);

      const moveFactor = i === 0 || i === 3 ? 15 : 25;
      const newX = labelX + (directionX / vectorLength) * moveFactor;
      const newY = labelY + (directionY / vectorLength) * moveFactor;

      createText(svg, d, {
        x: newX,
        y: newY,
        dy: 5,
        "text-anchor": "middle",
        fill: "white",
        "font-size": 12,
        "font-weight": 500,
      });
    },
  );

  svg
    .selectAll("polygon")
    .transition()

    .duration(600)
    .delay((d, i) => 2500 + i * 200)
    .attr("opacity", 1);

  const skillValueList = data.data.reverse().map((v) => v.value);

  const valueScale = getLinearScale(
    [0, d3.max(skillValueList) + 25],
    [0, svgWidth * 0.35],
  );

  const dataPolygonPoints = skillValueList.map((value, i) => {
    const [x, y] = outerHexagonPointList[i];

    const directionX = x - centerX;
    const directionY = y - centerY;
    const vectorLength = Math.sqrt(directionX ** 2 + directionY ** 2);
    const scaleFactor = valueScale(value) / vectorLength;
    return [
      centerX + directionX * scaleFactor,
      centerY + directionY * scaleFactor,
    ];
  });

  createPolygon(svg, {
    points: getHexagonPoints(centerX, centerY, 100),
    fill: "rgba(1, 0, 0, 0.5)",
    stroke: "none",
  })
    .transition()
    .duration(1200)
    .ease(d3.easeBounceOut)
    .delay(3800)
    .attr("fill", "rgba(255, 0, 0, 0.7)")
    .attr("points", dataPolygonPoints);
}

export default function HexaMetricsVisualizer({ userId }) {
  const render = {
    fn: renderChart,
    fnAdditionalArgs: [],
  };

  return <GenericChart userId={userId} fetchData={useGetUserPerformancesData} render={render} chartClassName="HexaMetricsVisualizer"/>;
}
