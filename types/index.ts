export type Event = {
  id: string;
  name: string;
  price?: string;
  isFree: boolean;
  imageUrl: string;
  location: string;
  date?: Date;
  categoryName: string;
};

export type EventDetails = {
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
};

export type Organizer = {
  _id: string;
  name: string;
};

export type Category = {
  _id: string;
  name: string;
};

export type TicketType = {
  _id: string;
  name: string;
  price: string;
  Quantity: number;
};
