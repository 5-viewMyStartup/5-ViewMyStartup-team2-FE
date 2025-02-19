import axios, { AxiosInstance, AxiosResponse } from "axios";
import { create } from "zustand";
const apiUrl: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const serverState = async () => {
  try {
    const response: AxiosResponse = await apiUrl.get(`/api/users/server`);
    serverStore.getState().setState(response.data);
    return response.data;
  } catch (err) {
    console.log("error :", err);
    throw err;
  }
};

interface ServerState {
  state: string;
  setState: (data: string) => void;
}

export const serverStore = create<ServerState>((set) => ({
  state: "",
  setState: (data: string) => set({ state: data }),
}));
