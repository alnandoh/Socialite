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
  price?: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  startDateTime: Date;
  endDateTime?: Date;
  organizer: Organizer;
  category?: Category;
  ticketTypes?: TicketType[];
}

export interface Organizer {
  _id: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface TicketType {
  _id: string;
  name: string;
  price: string;
  Quantity: number;
}

export interface Filters {
  categoryId: string;
  location: string;
  sortBy: string;
}
