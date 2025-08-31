import axios from "axios";
import { BASE_URL } from "@/constants/api";

interface ContactFormValues {
    mail: string;
    subject: string;
    description: string;
}

export const submitContactForm = async (data: ContactFormValues) => {
    return axios.post(`${BASE_URL}/api/user/contact`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
};