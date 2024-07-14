import { axiosInstance } from "./axios-instance";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//Users
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post(`${apiUrl}/register`, userData);
  return response.data;
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post(`${apiUrl}/login`, userData);
  return response.data;
};

//event
export const createEvent = async (eventFormData: FormData) => {
  const response = await axiosInstance.post(
    `${apiUrl}/events/create`,
    eventFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data;
};

export const fetchFilteredEvents = async (query: string) => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/?${query}`
  );
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data.data;
};

export const fetchEventSuggestions = async (name: string) => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${name}`
  );
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data.data;
};
