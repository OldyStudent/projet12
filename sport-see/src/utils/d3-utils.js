import * as d3 from "d3";

/**
 * Permet de définir les attributs d'un élément donné.
 * @param {d3.Selection} element - L'élément auquel les attributs seront appliqués.
 * @param {Object} attributes - Un objet contenant les attributs et leurs valeurs.
 */
export function setAttributes(element, attributes) {
  if (attributes === null) return;
  for (const key in attributes) {
    element.attr(key, attributes[key]);
  }
}

/**
 * Permet de créer un élément SVG et lui appliquer des attributs.
 * @param {d3.Selection} parent - L'élément parent auquel l'élément créé sera ajouté.
 * @param {string} type - Le type de l'élément à créer (ex: "g", "rect", "circle", etc.).
 * @param {Object} attributes - Un objet contenant les attributs et leurs valeurs.
 * @returns {d3.Selection} - L'élément créé.
 */
export function createElement(parent, type, attributes) {
  const element = parent.append(type);
  setAttributes(element, attributes);
  return element;
}


/**
 * Permet de créer un groupe (g) dans un élément SVG.
 * @param {d3.Selection} parent - L'élément parent auquel le groupe sera ajouté.
 * @param {Object} attributes - Un objet contenant les attributs et leurs valeurs.
 * @returns {d3.Selection} - Le groupe créé.
 */
export function createGroup(parent, attributes) {
  return createElement(parent, "g", attributes);
}

/**
 * Permet de créer un rectangle (rect) dans un élément SVG.
 * @param {d3.Selection} parent - L'élément parent auquel le rectangle sera ajouté.
 * @param {Object} attributes - Un objet contenant les attributs et leurs valeurs.
 * @returns {d3.Selection} - Le rectangle créé.
 */
export function createRect(parent, attributes) {
  return createElement(parent, "rect", attributes);
}

/**
 * Permet de créer un cercle (circle) dans un élément SVG.
 * @param {d3.Selection} parent - L'élément parent auquel le cercle sera ajouté.
 * @param {Object} attributes - Un objet contenant les attributs et leurs valeurs.
 * @returns {d3.Selection} - Le cercle créé.
 */
export function createCircle(parent, attributes) {
  return createElement(parent, "circle", attributes);
}

/**
 * Permet de créer une ligne (line) dans un élément SVG.
 * @param {d3.Selection} parent - L'élément parent auquel la ligne sera ajoutée.
 * @param {Object} attributes - Un objet contenant les attributs et leurs valeurs.
 * @returns {d3.Selection} - La ligne créée.
 */
export function createLine(parent, attributes) {
  return createElement(parent, "line", attributes);
}

/**
 * Permet de créer un polygone dans un élément SVG.
 * @param {d3.Selection} parent - L'élément parent auquel le polygone sera ajouté.
 * @param {Object} attributes - Un objet contenant les attributs et leurs valeurs.
 * @returns {d3.Selection} - Le polygone créé.
 */
export function createPolygon(parent, attributes) {
  return createElement(parent, "polygon", attributes);
}

/**
 * Permet de créer un élément texte dans un élément SVG.
 * @param {d3.Selection} parent - L'élément parent auquel le texte sera ajouté.
 * @param {string} text - Le texte à afficher.
 * @param {Object} attributes - Un objet contenant les attributs et leurs valeurs.
 * @returns {d3.Selection} - L'élément texte créé.
 */
export function createText(parent, text, attributes) {
  const textElement = createElement(parent, "text", attributes);
  textElement.text(text);
  return textElement;
}

/**
 * Permet de créer un path (ligne) dans un élément SVG.
 * @param {d3.Selection} parent - L'élément parent auquel le chemin sera ajouté.
 * @param {string} data - Les données à associer au path.
 * @param {Object} attributes - Un objet contenant les attributs et leurs valeurs.
 * @returns {d3.Selection} - Le path créé.
 */
export function createPath(parent, data, attributes) {
  const path = parent.append("path").datum(data);
  setAttributes(path, attributes);
  return path;
}

/**
 * Permet de récupérer une échelle linéaire d3.js.
 * @param {Array} domainValues - Les valeurs du domaine.
 * @param {Array} rangeValues - Les valeurs de la plage.
 * @returns {d3.ScaleLinear} - L'échelle linéaire créée.
 */
export function getLinearScale(domainValues, rangeValues) {
  return d3.scaleLinear().domain(domainValues).range(rangeValues);
}
