import axios, { AxiosInstance, AxiosResponse } from "axios";

const apiUrl: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
export const createBookMark = async (userId: string, companyId: string) => {
  try {
    const response: AxiosResponse = await apiUrl.post(
      `/api/bookmarks/${userId}`,
      { companyId }
    );
    return response.data;
  } catch (err) {
    console.log("error :", err);
    throw err;
  }
};

export const deleteBookMark = async (userId: string, companyId: string) => {
  try {
    const response: AxiosResponse = await apiUrl.delete(
      `/api/bookmarks/${userId}`,
      { data: { companyId } }
    );
    console.log(companyId);
    return response.data;
  } catch (err) {
    console.log("error :", err);
    throw err;
  }
};
