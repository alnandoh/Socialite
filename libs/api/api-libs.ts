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
    console.log(data);
    return data;
  } catch (error) {
    console.log("Can't catch data:", error);
  }
};

//Event
export const createEvent = async (eventFormData: any) => {
  try {
    const response = await fetch(`${apiUrl}/events/create`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: eventFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
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
  console.log("Filter event response:", response);
  return response.data;
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
