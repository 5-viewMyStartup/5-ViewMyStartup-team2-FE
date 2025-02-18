import axios, { AxiosInstance, AxiosResponse } from "axios";
import { useCompanyStore } from "./companyStore";

const apiUrl: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
export const getCompanyDetail = async (id: string, userId: string) => {
  try {
    const response: AxiosResponse = await apiUrl.get(
      `/api/companies/detail/${id}?userId=${userId}`
    );
    useCompanyStore.getState().setCompany(response.data);
    return response.data;
  } catch (err) {
    console.log("error :", err);
    throw err;
  }
};
