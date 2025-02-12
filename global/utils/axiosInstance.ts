import axios, { AxiosInstance } from "axios";

//백엔드 배포한 링크
export const instance: AxiosInstance = axios.create({
  baseURL: "https://five-viewmystartup-team2-be.onrender.com",
});
