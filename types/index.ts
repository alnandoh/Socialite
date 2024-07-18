export interface Event {
  id: string;
  name: string;
  price?: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  date?: Date;
  categoryName: string;
}

export interface EventDetails {
  id: string;
  name: string;
  description: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  date: Date;
  endDate?: Date;
  organizer: Organizer;
  category: Category;
  tickets: Tickets[];
  promotions?: Promotions[];
}

export interface Organizer {
  id: string;
  name: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Tickets {
  id: string;
  tierName: string;
  price: number;
  availableSeats: number;
}

export interface Promotions {
  name: string;
  discount: number;
  maxUser: number;
}

export interface Filters {
  name: string;
  categoryId: string;
  location: string;
  sort: string;
  page: number;
  limit: number;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  referralCode: string;
}
