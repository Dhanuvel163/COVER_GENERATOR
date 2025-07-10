import axios from "axios";
import { BASE_URL } from "@/constants/api";

export const fetchUserProfile = async (token: string) => {
  return axios.get(`${BASE_URL}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};