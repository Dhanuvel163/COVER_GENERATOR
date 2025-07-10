import axios from "axios";
import { BASE_URL } from "@/constants/api";

export const fetchUserProfile = async (token: string) => {
  return axios.get(`${BASE_URL}/api/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserProfile = async (token: string, profileData: any) => {
  return axios.put(`${BASE_URL}/api/user/profile`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};