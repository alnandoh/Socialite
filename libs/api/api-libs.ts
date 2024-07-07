import axios from "axios";
import { axiosInstance, axiosInstance2 } from "./axios-instance";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${apiUrl}/register`, userData);
  return response.data;
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${apiUrl}/login`, userData);
  return response.data;
};

export const createEvent = async (eventData: FormData) => {
  const response = await axiosInstance2.post(
    `${apiUrl}/events/create`,
    eventData
  );
  return response.data;
};
