/**
 * Employee API Service
 * Handles all API communication with the ColdFusion backend
 */
import axios from 'axios';

// Direct API URL
const API_URL = 'http://localhost:8500/api.cfc?method=getEmployees';

/**
 * Fetch all employees from the API
 * @returns {Promise<Array>} Array of employee objects
 */
export const fetchEmployees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw new Error(
      error.response?.data?.message ||
      'Failed to fetch employees. Please ensure the ColdFusion server is running.'
    );
  }
};

/**
 * Fetch a single employee by ID
 * @param {number} id - Employee ID
 * @returns {Promise<Object>} Employee object
 */
export const fetchEmployeeById = async (id) => {
  // For now, fetch all and filter
  const employees = await fetchEmployees();
  return employees.find(emp => emp.id === id);
};

/**
 * Search employees by query string
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching employee objects
 */
export const searchEmployees = async (query) => {
  // For now, fetch all and filter client-side
  const employees = await fetchEmployees();
  const lowerQuery = query.toLowerCase();
  return employees.filter(emp =>
    emp.firstName.toLowerCase().includes(lowerQuery) ||
    emp.lastName.toLowerCase().includes(lowerQuery) ||
    emp.role.toLowerCase().includes(lowerQuery)
  );
};

export default {
  fetchEmployees,
  fetchEmployeeById,
  searchEmployees,
};
