import axios from "axios";
import { BASE_URL } from "@/constants/api";

export const googleAuthApi = async (data: {
  idToken: string;
  email: string | null;
  name: string | null;
  uid: string;
  phone_number: string | null;
  photoURL: string | null;
}) => {
  return axios.post(`${BASE_URL}/api/auth/google`, data);
};