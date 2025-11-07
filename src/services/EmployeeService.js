import axios from "axios"; 

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';

// Get all employees
export const listEmployees = () => axios.get(REST_API_BASE_URL);

// Create a new employee
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

// Get employee by ID
export const getEmployeeById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

// Update employee by ID
export const updateEmployee = (id, employee) => axios.put(`${REST_API_BASE_URL}/${id}`, employee);

// Delete employee by ID
export const deleteEmployee = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);
