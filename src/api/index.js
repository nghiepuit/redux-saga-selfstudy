import axios from "axios";
const API_BASE_URL = "http://localhost:3001";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const fetchtasks = () => {
  return client.get("/tasks");
};

export const createTask = (params) => {
  return client.post("/tasks", params);
}

export const updateTask = (id, params) => {
  return axios.put(`${API_BASE_URL}/tasks/${id}`, params);
}
