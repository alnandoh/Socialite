"use client";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/libs/utils";

const ticketTypeSchema = z.object({
  ticketTier: z.string().min(1, "Name is required"),
  price: z
    .number({ message: "Price is required" })
    .min(5000, "Price must be greater than 5000"),
  quantity: z
    .number({ message: "Quantity is required" })
    .positive("Quantity must be greater than 0"),
});

const createEventSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  date: z.date({ required_error: "Date is required" }),
  time: z.string().time("Time is required"),
  description: z.string().min(10, "Description is required"),
  location: z.string(),
  categoryIds: z
    .array(z.string().min(1, "Category ID is required"))
    .nonempty("At least one category is required"),
  isFree: z.boolean(),
  imageUrl: z
    .any()
    .refine((files) => files?.[0]?.size <= 2000000, `Max image size is 5MB.`)
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files?.[0]?.type
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  ticketTypes: z.array(ticketTypeSchema).optional(),
});

export default function page() {
  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      isFree: true,
      ticketTypes: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
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
    <div className="p-10 w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="Socialite" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Describe your event" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick event date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input placeholder="10:00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Jakarta, Indonesia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload your image</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel>Event pricing</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("isFree") && (
            <>
              <FormLabel className="block mb-2">Ticket Types</FormLabel>
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex gap-4 mb-4 pb-4 px-4 py-2 border rounded-lg"
                >
                  <FormField
                    control={form.control}
                    name={`ticketTypes.${index}.ticketTier`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Ticket tier" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ticketTypes.${index}.price`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input placeholder="Price" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ticketTypes.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input placeholder="Quantity" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="place-self-end"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  append({
                    ticketTier: "",
                    price: 0,
                    quantity: 1,
                  })
                }
                className="mt-3"
              >
                Add Ticket Type
              </Button>
            </>
          )}
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
