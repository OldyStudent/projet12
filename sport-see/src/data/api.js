import axios from "axios";

/**
 * Permet de récupérer les données à partir d'un endpoint.
 * @param {string} endpoint - Le chemin de l'endpoint pour récupérer les données.
 * @returns {Promise} - Une promesse qui résout avec les données récupérées.
 * @throws {Error} - Une erreur si la requête échoue.
 */
async function fetchData(endpoint) {
  const url = `http://localhost:3000/user/${endpoint}`;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Permet de récupérer les données de l'utilisateur.
 * @param {string} userId - L'ID de l'utilisateur.
 * @returns {Promise} - Renvoie les données de l'utilisateur.
 */
export async function getUserData(userId) {
  return fetchData(userId);
}

/**
 * Permet de récupérer les données moyennes des sessions de l'utilisateur.
 * @param {string} userId - L'ID de l'utilisateur.
 * @returns {Promise} - Renvoie les données moyennes des sessions.
 */
export async function getUserAverageSessionsData(userId) {
  return fetchData(`${userId}/average-sessions`);
}

/**
 * Permet de récupérer les données d'activité de l'utilisateur.
 * @param {string} userId - L'ID de l'utilisateur.
 * @returns {Promise} - Renvoie les données d'activité.
 */
export async function getUserActivityData(userId) {
  return fetchData(`${userId}/activity`);
}

/**
 * Permet de récupérer les données de performances de l'utilisateur.
 * @param {string} userId - L'ID de l'utilisateur.
 * @returns {Promise} - Renvoie les données de performances.
 */
export async function getUserPerformancesData(userId) {
  return fetchData(`${userId}/performance`);
}

