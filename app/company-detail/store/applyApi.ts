import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
const apiUrl: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
export const applyCompany = async (
  companyId: string,
  applicantName: string,
  applicantPosition: string,
  applicantComment: string
) => {
  const id = Cookies.get("id");
  try {
    const response: AxiosResponse = await apiUrl.post(`/api/apply/${id}`, {
      companyId,
      applicantName,
      applicantPosition,
      applicantComment,
    });
    return response.data;
  } catch (err) {
    console.log("error :", err);
    throw err;
  }
};
