import "./AverageSessionDurations.css";
import * as d3 from "d3";
import { useGetUserAverageSessionsData } from "../../hooks/useGetUserAverageSessionsData";
import { GenericChart } from "../GenericChart/GenericChart";
import {
  createCircle,
  createElement,
  createGroup,
  createPath,
  createRect,
  createText,
  getLinearScale,
} from "../../utils/d3-utils";

function renderChart(svgElement, data) {
  if (!svgElement) return;
  const svgRect = svgElement.getBoundingClientRect();
  const svgWidth = svgRect.width;
  const svgHeight = svgRect.height;

  const heightOffset = svgHeight * 0.25;

  data = data.sessions;
  data = [
    { day: 0, sessionLength: data[0].sessionLength - 2 },
    ...data,
    {
      day: data.length + 1,
      sessionLength: data[data.length - 1].sessionLength + 2,
    },
  ];

  const svg = d3.select(svgElement);
  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.day))
    .range([-20, svgWidth + 20]);

  const yScale = getLinearScale(
    [0, d3.max(data, (d) => d.sessionLength)],
    [svgHeight / 3, 0],
  );

  const curve = d3
    .line()
    .x((d) => xScale(d.day) + xScale.bandwidth() / 2)
    .y((d) => yScale(d.sessionLength))
    .curve(d3.curveNatural);

  const gradient = createElement(svg.append("defs"), "linearGradient", {
    id: "line-gradient",
    gradientUnits: "objectBoundingBox",
    x1: 0,
    y1: 0,
    x2: "100%",
    y2: 0,
  });

  createElement(gradient, "stop", {
    offset: "0%",
    "stop-color": "#FFFFFF66",
  });

  createElement(gradient, "stop", {
    offset: "100%",
    "stop-color": "white",
  });

  const path = createPath(
    svg,
    data.map((v, i) => ({ ...v, sessionLength: 25 + i * 0.01 })),
    {
      d: curve,
      fill: "none",
      stroke: "url(#line-gradient)",
      "stroke-width": 2,
      opacity: 1,
      transform: `translate(0, ${heightOffset})`,
    },
  );

  path
    .transition()
    .delay(800)
    .duration(2500)
    .ease(d3.easeElasticInOut)
    .attr("d", curve(data))
    .attr("stroke-width", 3);

  const title = createText(svg, "Durée moyenne des", {
    x: 30,
    y: 30,
    class: "title",
  });

  // title.append("tspan").text("Durée moyenne des");
  title.append("tspan").text("sessions").attr("x", 30).attr("dy", "24px");

  const xAxis = createGroup(svg, {
    transform: `translate(0, ${svgHeight * 0.8})`,
    class: "x-axis",
  }).call(d3.axisBottom(xScale).tickFormat((d) => daysOfWeek[d - 1]));

  xAxis.select(".domain").remove();
  xAxis.selectAll(".tick line").remove();

  // Ajout affichage lors du hover
  const hoverGroup = createGroup(svg, { class: "hover-group" });

  createRect(hoverGroup, {
    class: "curve-hover-rectangle",
    fill: "#00000020",
    width: 0,
    height: svgHeight,
  });

  createCircle(hoverGroup, {
    class: "hover-circle",
    r: 4,
    fill: "white",
    stroke: "#FFFFFF80",
    "stroke-width": 8,
  }).style("display", "none");

  createRect(svg, { width: svgWidth, height: svgHeight })
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mousemove", onMouseMove)
    .on("mouseout", onMouseOut);

  function onMouseMove(event) {
    const mouseX = d3.pointer(event)[0];
    let index = Math.floor(mouseX / xScale.bandwidth());
    if (index < 1) index = 1;
    if (index > 7) index = 7;
    const closestData = data[index];

    const xPos = xScale(closestData.day) + xScale.bandwidth() / 2;

    hoverGroup
      .select(".hover-circle")
      .attr("cx", xPos)
      .attr("cy", yScale(closestData.sessionLength) + heightOffset)
      .style("display", "block");

    hoverGroup
      .select(".curve-hover-rectangle")
      .attr("width", svgWidth - xPos)
      .attr("transform", `translate(${xPos}, 0)`)
      .style("display", "block");

    hoverGroup.select(".hover-duration-rect").remove();
    hoverGroup.select(".hover-duration-text").remove();

    createRect(hoverGroup, {
      class: "hover-duration-rect",
      x: xPos + 5,
      y: yScale(closestData.sessionLength) + heightOffset - 35,
      width: 40,
      height: 25,
      fill: "white",
    });

    createText(hoverGroup, `${closestData.sessionLength} min`, {
      class: "hover-duration-text",
      x: xPos + 25,
      y: yScale(closestData.sessionLength) + heightOffset - 20,
      fill: "black",
      "text-anchor": "middle",
    });
  }

  function onMouseOut() {
    hoverGroup
      .selectAll(
        ".hover-circle, .curve-hover-rectangle, .hover-duration-rect, .hover-duration-text",
      )
      .style("display", "none");
  }
}

export default function AverageSessionDurations({ userId }) {

  const render = {
    fn: renderChart,
    fnAdditionalArgs: [],
  };

  return (<GenericChart userId={userId} fetchData={useGetUserAverageSessionsData} render={render} chartClassName="AverageSessionDurations"/>);
}
