"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { EventDetails } from "@/types";
import Ticket from "./Ticket";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";

interface BookingModalProps {
  event: EventDetails;
}

export default function BookingModal({ event }: BookingModalProps) {
  const { data: session } = useSession();
  const [ticketQuantities, setTicketQuantities] = useState<
    Record<string, number>
  >(
    event.tickets.reduce(
      (acc, ticket) => ({ ...acc, [ticket.tierName]: 0 }),
      {}
    )
  );
  const [isOpen, setIsOpen] = useState(false);

  const totalQuantity = useMemo(() => {
    return Object.values(ticketQuantities).reduce(
      (sum, quantity) => sum + quantity,
      0
    );
  }, [ticketQuantities]);

  const totalPrice = useMemo(() => {
    return event.tickets.reduce((total, ticket) => {
      return (
        total + (ticket.price || 0) * (ticketQuantities[ticket.tierName] || 0)
      );
    }, 0);
  }, [event.tickets, ticketQuantities]);

  const appliedPromotion = useMemo(() => {
    if (!event.promotions) return null;
    return event.promotions;
  }, [event.promotions]);

  const discountAmount = useMemo(() => {
    if (!appliedPromotion) return 0;
    return Math.min(appliedPromotion.discount || 0, totalPrice);
  }, [appliedPromotion, totalPrice]);

  const handleQuantityChange = (ticketName: string, newQuantity: number) => {
    setTicketQuantities((prev) => ({ ...prev, [ticketName]: newQuantity }));
  };

  const selectedTickets = event.tickets
    .map((ticket) => ({
      ticketId: ticket.id,
      quantity: ticketQuantities[ticket.tierName] || 0,
    }))
    .filter((ticket) => ticket.quantity > 0);

  const handleCheckout = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    try {
      console.log(JSON.stringify(selectedTickets));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/transaction/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(selectedTickets),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-full text-white bg-stone-600 hover:bg-stone-700 transition-colors"
        >
          Get Tickets
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-white sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{event.name}</h2>
            </div>
            {event.imageUrl && (
              <Image
                src={event.imageUrl}
                width={400}
                height={200}
                alt={event.name}
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
            )}
            <div className="space-y-4 mb-6">
              {event.tickets.map((ticket) => (
                <Ticket
                  key={ticket.tierName}
                  ticket={ticket}
                  quantity={ticketQuantities[ticket.tierName] || 0}
                  onQuantityChange={(newQuantity) =>
                    handleQuantityChange(ticket.tierName, newQuantity)
                  }
                />
              ))}
            </div>
            {appliedPromotion && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-green-700">
                    {appliedPromotion.name} applied
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 text-green-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Discount: Rp{" "}
                          {formatPrice(appliedPromotion.discount || 0)}
                        </p>
                        <p>Max users: {appliedPromotion.maxUser}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-50 p-6 flex flex-col">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {event.tickets.map(
                (ticket) =>
                  (ticketQuantities[ticket.tierName] || 0) > 0 && (
                    <div
                      key={ticket.tierName}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {ticket.tierName} x{ticketQuantities[ticket.tierName]}
                      </span>
                      <span>
                        Rp{" "}
                        {formatPrice(
                          (ticket.price || 0) *
                            (ticketQuantities[ticket.tierName] || 0)
                        )}
                      </span>
                    </div>
                  )
              )}
            </div>
            {appliedPromotion && (
              <div className="flex justify-between text-sm text-green-600 mb-4">
                <span>Discount</span>
                <span>- Rp {formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg border-t pt-4 mb-6">
              <span>Total</span>
              <span>Rp {formatPrice(totalPrice - discountAmount)}</span>
            </div>
            <Button
              onClick={handleCheckout}
              disabled={totalQuantity === 0}
              className="w-full"
            >
              {totalQuantity === 0
                ? "Select Tickets"
                : `Checkout (${totalQuantity} ${
                    totalQuantity === 1 ? "ticket" : "tickets"
                  })`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
