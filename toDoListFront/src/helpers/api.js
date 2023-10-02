import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks';

export const getTasks = async () => {
  return axios.get(API_URL);
};

export const createTask = async (taskData) => {
  return axios.post(API_URL, taskData);
};

export const updateTask = async (taskId, taskData) => {
  return axios.put(`${API_URL}/${taskId}`, taskData);
};

export const deleteTask = async (taskId) => {
  return axios.delete(`${API_URL}/${taskId}`);
};
