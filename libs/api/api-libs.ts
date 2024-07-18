import { UserData } from "@/types/userData";
import { axiosInstance } from "./axios-instance";
import { UserProfile } from "@/types";

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
export const createEvent = async (token: string, eventFormData: any) => {
  try {
    const response = await fetch(`${apiUrl}/events/create`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
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

export const getEventById = async (id: string, token: string) => {
  try {
    const response = await fetch(`/api/events/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch event data");
    }

    return response;
  } catch (error) {
    console.error("Error fetching event data:", error);
    throw error;
  }
};

export const updateEvent = async (
  id: string,
  token: string,
  formData: FormData
) => {
  try {
    const response = await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to update event");
    }

    return response;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const fetchUpcomingEventsByCategory = async (query: string) => {
  const response = await axiosInstance.get(`${apiUrl}/events${query}`);
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data.data;
};

export const fetchFilteredEvents = async (query: string) => {
  const response = await axiosInstance.get(`${apiUrl}/events?${query}`);
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  console.log("query" + query);
  console.log("Filter event response:", response);
  return response.data;
};

export const fetchEventDetails = async (id: string) => {
  const response = await axiosInstance.get(`${apiUrl}/events/detail/${id}`);
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data;
};

export const fetchEventSuggestions = async (name: string) => {
  const response = await axiosInstance.get(`${apiUrl}/events?name=${name}`);
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
  const response = await axiosInstance.get(`${apiUrl}/transactions`);
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data.data;
};

//Profile
export const fetchUserProfile = async (token: string): Promise<UserProfile> => {
  const response = await axiosInstance.get<UserProfile>(
    `${apiUrl}/user/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

//My Tickets
export const fetchMyTickets = async (token: string) => {
  const response = await axiosInstance.get(`${apiUrl}/tickets`);
  if (response.status !== 200) {
    throw new Error(response.data.message || "Failed to fetch events");
  }
  return response.data.data;
};
