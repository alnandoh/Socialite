"use client";

import { Minus, Plus } from "lucide-react";
import { Tickets } from "@/types";

interface TicketProps {
  ticket: Tickets;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export default function Ticket({
  ticket,
  quantity,
  onQuantityChange,
}: TicketProps) {
  const maxQuantity = Math.min(4, ticket.availableSeats);
  const handleAddQuantity = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleReduceQuantity = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-1 capitalize">
            {ticket.tierName}
          </h3>
          <span className="font-bold text-lg">
            Rp {ticket.price.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-500 text-sm">{ticket.availableSeats} left</p>
          <div className="flex items-center bg-slate-100 gap-2 min-w-32 justify-between">
            <button
              onClick={handleReduceQuantity}
              disabled={quantity <= 0}
              className="p-2 rounded-md bg-white shadow hover:bg-primary hover:text-white transition disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              <Minus className="size-4" />
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={handleAddQuantity}
              disabled={quantity >= maxQuantity}
              className="p-2 rounded-md bg-white shadow hover:bg-primary hover:text-white transition disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
