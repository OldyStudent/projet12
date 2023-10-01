import "./DailyActivity.css";

import * as d3 from "d3";
import { GenericChart } from "../GenericChart/GenericChart";
import { useGetUserActivityData } from "../../hooks/useGetUserActivityData";
import { createGroup, createText, createCircle, createRect, getLinearScale, createLine } from "../../utils/d3-utils";

function getMinMaxAvrValues(data, propertyAccessor, offset = 0) {
  const minValue = d3.min(data, propertyAccessor) - offset;
  const maxValue = d3.max(data, propertyAccessor) + offset;
  const midValue = (maxValue + minValue) * 0.5;
  return [maxValue, midValue, minValue];
}

function renderChart(svgElement, data, barWidth) {
  data = data.sessions.map((session) => ({
    day: +session.day.slice(-2),
    kilogram: session.kilogram,
    calories: session.calories,
  }));

  if (!svgElement) return;
  const svgRect = svgElement.getBoundingClientRect();
  const svgWidth = svgRect.width;
  const svgHeight = svgRect.height;

  const svg = d3.select(svgElement);
  const barWidthHalf = barWidth / 2;
  const offset = svgHeight * 0.25;
  const graphWidth = svgWidth - 100;
  const graphHeight = svgHeight - 83 - offset; // 83 = 50: padding + 33: x-axis size;

  // Creation du contenu de l'entete: titre + légende
  const headerGroup = createGroup(svg, { class: "header-group" });

  createText(headerGroup, "Activité quotidienne", { class: "main-title" });

  const legendGroup = createGroup(headerGroup, {
    class: "legend-group",
    transform: `translate(${svgWidth - 334}, 0)`,
  });

  createCircle(legendGroup, {
    cx: 5,
    cy: -5,
    r: 4,
    fill: "var(--color-weight)",
  });
  createText(legendGroup, "Poids (kg)", { x: 20, y: 0 });

  createCircle(legendGroup, {
    cx: 117,
    cy: -5,
    r: 4,
    fill: "var(--color-calories)",
  });
  createText(legendGroup, "Calories brûlées (kCal)", { x: 132, y: 0 });

  // Creation du graphique
  const graphGroup = createGroup(svg, { transform: `translate(0, ${offset})` });
  const xScaleDays = getLinearScale(
    [d3.min(data, (d) => d.day) - 0.3, d3.max(data, (d) => d.day) + 0.35],
    [0, graphWidth],
  );

  // Échelle Y pour le poids
  const yCoordinates = [0, graphHeight * 0.5, graphHeight];
  const weightValues = getMinMaxAvrValues(data, (d) => d.kilogram, 10);
  const yScaleWeight = getLinearScale(weightValues, yCoordinates);

  // Échelle Y pour les calories
  const yScaleCalories = getLinearScale(
    getMinMaxAvrValues(data, (d) => d.calories, 100),
    yCoordinates,
  );

  // Axe X
  const xAxis = d3
    .axisBottom(xScaleDays)
    .ticks(data.length)
    .tickPadding(20)
    .tickSize(0);

  // Axe Y
  const yAxis = d3
    .axisRight(yScaleWeight)
    .tickPadding(20)
    .tickSize(0)
    .tickValues(weightValues);

  // Groupe pour l'axe Y
  createGroup(graphGroup, {
    class: "y-axis",
    transform: `translate(${graphWidth}, 0)`,
  })
    .call(yAxis)
    .selectAll(".tick")
    .each(function (d, i) {
      // Lignes en pointillés
      if (i === 2) {
        return;
      }
      createLine(d3.select(this), {
        class: "dash-line",
        x1: 0,
        y1: 0,
        x2: -graphWidth,
        y2: 0,
      });
    })
    .selectAll(".tick text")
    .attr("text-anchor", "end")
    .attr("dx", "20");

  // Groupe pour l'axe X
  createGroup(graphGroup, {
    class: "x-axis",
    transform: `translate(0,${graphHeight})`,
  })
    .call(xAxis)
    .selectAll(".tick text")
    .style("text-anchor", "middle")
    .attr("dx", barWidthHalf);

  // Supprimer la ligne de l'axe Y
  d3.selectAll(".y-axis .domain").remove();

  // Creation des groupes (un jour == un groupe barre kg + calories)
  const dayBars = graphGroup
    .selectAll(".day-bars")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "day-bars")
    .attr("transform", (d) => `translate(${xScaleDays(d.day)}, 0)`)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  // Ajout du background qui s'affiche au survol
  createRect(dayBars, {
    class: "bg-day-bars",
    x: -barWidth * 3,
    y: 0,
    width: barWidth * 7,
    height: graphHeight,
  });

  // Barre du poids
  createRect(dayBars, {
    class: "bar-kilogram",
    x: -barWidth,
    y: graphHeight,
    width: barWidth,
    height: 0,
  })
    .transition()
    .delay((d, i) => (i + 1) * 100)
    .duration(1000)
    .ease(d3.easeElasticOut)
    .attr("y", (d) => yScaleWeight(d.kilogram))
    .attr("height", (d) => graphHeight - yScaleWeight(d.kilogram));

  createCircle(dayBars, {
    class: "bar-kilogram-circle",
    cx: -barWidth + barWidthHalf,
    cy: graphHeight,
    r: barWidthHalf * 0.5,
  })
    .transition()
    .delay((d, i) => (i + 1) * 100)
    .duration(1000)
    .ease(d3.easeElasticOut)
    .attr("cy", (d) => yScaleWeight(d.kilogram))
    .attr("r", barWidthHalf);

  createRect(dayBars, {
    class: "bar-calories",
    x: barWidth,
    y: graphHeight,
    width: barWidth,
    height: 0,
  })
    .transition()
    .delay((d, i) => (i + 1) * 100)
    .duration(1000)
    .ease(d3.easeElasticOut)
    .attr("y", (d) => yScaleCalories(d.calories))
    .attr("height", (d) => graphHeight - yScaleCalories(d.calories));

  createCircle(dayBars, {
    class: "bar-calories-circle",
    cx: barWidth + barWidthHalf,
    cy: graphHeight,
    r: barWidthHalf * 0.5,
  })
    .transition()
    .delay((d, i) => (i + 1) * 100)
    .duration(950)
    .ease(d3.easeElasticOut)
    .attr("cy", (d) => yScaleCalories(d.calories))
    .attr("r", barWidthHalf);

  function handleMouseOver(e, data) {
    d3.select(".hover-rectangle").remove();
    const hoverGroup = createGroup(d3.select(this), {
      class: "hover-rectangle",
      transform: `translate(${barWidth * 4}, 0)`,
      opacity: 0,
    });

    hoverGroup
      .interrupt("transform")
      .transition()
      .duration(400)
      .ease(d3.easeCircleOut)
      .attr("transform", `translate(${barWidth * 4}, -32)`)
      .style("opacity", 1);

    createRect(hoverGroup, {
      width: 40,
      height: 64,
      rx: 2,
      ry: 2,
    });

    createText(hoverGroup, `${data.kilogram}Kg`, {
      x: 20,
      y: 21,
      "text-anchor": "middle",
    });

    createText(hoverGroup, `${data.calories}Kcal`, {
      x: 20,
      y: 48,
      "text-anchor": "middle",
    });
  }

  function handleMouseOut() {
    d3.select(this)
      .select(".hover-rectangle")
      .interrupt()
      .transition()
      .duration(500)
      .ease(d3.easeCircleIn)
      .attr("transform", `translate(${barWidth * 4}, 16)`)
      .style("opacity", 0)
      .remove();
  }
}


export default function DailyActivity({ barWidth, userId }) {

  const render = {
    fn: renderChart,
    fnAdditionalArgs: [barWidth],
  };

  return <GenericChart userId={userId} fetchData={useGetUserActivityData} render={render} chartClassName="DailyActivity"/>;
}
