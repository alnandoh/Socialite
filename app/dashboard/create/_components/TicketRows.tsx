import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ticketSchema = z.object({
  ticketTierName: z.string().min(1, "Name is required"),
  ticketPrice: z.coerce.number().min(0, `Price cannot be negative`),
  ticketAvailableSeats: z.coerce.number().min(1, `Minimum 1 ticket`),
});

interface TicketRowsProps {
  index: number;
  removeRow: (index: number) => void;
  watch: boolean;
}

export default function TicketRows({
  index,
  removeRow,
  watch,
}: TicketRowsProps) {
  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
  });
  useEffect(() => {
    if (watch) {
      form.setValue("ticketTierName", "Free");
      form.setValue("ticketPrice", 0);
    }
  }, [watch]);

  return (
    <Form {...form}>
      <div className="grid grid-cols-2 items-end just sm:grid-cols-4 gap-x-2 mb-4">
        <FormField
          control={form.control}
          name="ticketTierName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Tier Name"
                  {...field}
                  disabled={watch}
                  value={watch ? "Free" : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticketPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  disabled={watch}
                  value={watch ? 0 : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticketAvailableSeats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Quantity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row">
          <Button
            type="button"
            onClick={() => removeRow(index)}
            disabled={index === 0}
          >
            Remove
          </Button>
        </div>
      </div>
    </Form>
  );
}
