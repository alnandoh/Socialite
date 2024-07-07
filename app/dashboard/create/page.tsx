"use client";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import EventNameField from "./_components/EventNameField";
import CategoryField from "./_components/CategoryField";
import DateField from "./_components/DateField";
import DescriptionField from "./_components/DescriptionField";
import ImageUploadField from "./_components/ImageUploadField";
import LocationField from "./_components/LocationField";
import PricingField from "./_components/PricingField";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "@/libs/api/api-libs";
import PromotionField from "./_components/PromotionField";

const ticketTypeSchema = z.object({
  ticketTier: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(5000, `Min price Rp. 5.000`),
  quantity: z.coerce.number().min(1, `Minimum 1 ticket`),
});

const promotionSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    discount: z.coerce.number().min(5, "Minimum discount 5%"),
    quantity: z.coerce.number().min(1, "Minimum 1 voucher"),
    startDate: z.coerce.date().refine((data) => data > new Date(), {
      message: "Start date must be in the future",
    }),
    endDate: z.coerce.date(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  });

const createEventSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  date: z.string().datetime("Required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string(),
  category: z.string(),
  isFree: z.boolean(),
  imageUrl: z
    .any()
    .refine((files) => files?.[0]?.size <= 2000000, `Max image size is 2MB.`)
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files?.[0]?.type
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  ticketTypes: z.array(ticketTypeSchema).min(1, "Minimum 1 ticket types"),
  promotions: z.array(promotionSchema).optional(),
});

export default function CreateEventPage() {
  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      isFree: true,
      ticketTypes: [],
      promotions: [],
    },
  });
  const { append, remove } = useFieldArray({
    control: form.control,
    name: "ticketTypes",
  });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof createEventSchema>) => {
    try {
      const response = await fetch("http://localhost:8080/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      toast({
        description: "Successfully Created Event",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      //   toast({
      //     description: error,
      //   });
    }
  };

  return (
    <div className="p-10 w-full h-full space-y-4">
      <h1 className="text-3xl font-semibold">Create Event</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-6">
            <EventNameField control={form.control} />
            <CategoryField control={form.control} />
            <DateField control={form.control} />
            <DescriptionField control={form.control} />
            <ImageUploadField control={form.control} />
            <LocationField control={form.control} />
            <PricingField
              control={form.control}
              watch={form.watch}
              setValue={form.setValue}
              append={append}
              remove={remove}
            />
            <PromotionField />
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="mt-3">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
