/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { store } from "../store/configureStore";

axios.defaults.baseURL = "http://localhost:5000/api";
axios.defaults.withCredentials = true;
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: object) => axios.post(url, body).then(responseBody),
  put: (url: string, body: object) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Account = {
  login: (values: any) => requests.post("Account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
  // fetchAddress: ()=>requests.get('account/savedAddress'),
  updateUser: (userData: any) => requests.post("account/updateUser", userData),
};

const Course = {
  list: (params: URLSearchParams) =>
    requests.get("course/getAllCourses", params),
  getMy: (id: string) => requests.get(`course/getMyCourses/${id}`),
  getProfessorCourses: (id: number) =>
    requests.get(`course/getProfessorsCourses/${id}`),
  fetchFilters: () => requests.get("course/filters"),
};

const Professor = {
  GetAllProfessors: () => requests.get("professor/GetAllProfessors"),
};

const Theme = {
  getAll: () => requests.get("theme/GetAllThemes"),
};
const Message = {
  getAll: () => requests.get("theme/GetAllMessages"),
  createMessage: (values: any) => requests.post("theme/CreateMessage", values),
};

const agent = {
  Account,
  Course,
  Professor,
  Theme,
  Message,
};

export default agent;
