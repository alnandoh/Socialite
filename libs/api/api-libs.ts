import { UserData } from "@/types/userData";
import { axiosInstance } from "./axios-instance";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//Users
export const userRegister = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post(`${apiUrl}/register`, userData);
  return response.data;
};

export const userLogin = async (userData: UserData) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    }).then((res) => res.json());

    const data = await response;

    return data;
  } catch (error) {
    console.log("Can't catch data:", error);
  }
};

//Event
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

export const fetchUpcomingEventsByCategory = async (query: string) => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events${query}`
  );
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data.data;
};

export const fetchFilteredEvents = async (query: string) => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events?${query}`
  );
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  console.log("query" + query);
  console.log(response);
  return response.data.data;
};

export const fetchEventDetails = async (id: string) => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/detail/${id}`
  );
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data;
};

export const fetchEventSuggestions = async (name: string) => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/events?name=${name}`
  );
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data.data.map((event: { id: number; name: string }) => ({
    id: event.id,
    name: event.name,
  }));
};

//Transactions
export const fetchTransactions = async () => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`
  );
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data.data;
};

//My Tickets
export const fetchMyTickets = async () => {
  const response = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets`
  );
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data.data;
};
