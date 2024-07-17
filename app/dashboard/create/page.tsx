"use client";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import EventNameField from "./_components/EventNameField";
import CategoryField from "./_components/CategoryField";
import DateField from "./_components/DateField";
import DescriptionField from "./_components/DescriptionField";
import LocationField from "./_components/LocationField";
import { createEvent } from "@/libs/api/api-libs";
import EndDateField from "./_components/EndDateField";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadCloud } from "lucide-react";
import Image from "next/image";

const ticketSchema = z.object({
  tierName: z.string().min(1, "Name is required"),
  price: z.coerce.number().min(0, `Price cannot be negative`),
  availableSeats: z.coerce.number().min(1, `Minimum 1 ticket`),
});

const promotionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  discount: z.number().min(5, "Minimum discount Rp. 10.000"),
  maxUser: z.number().min(1, "Minimum 1 voucher"),
});

const createEventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  date: z.date(),
  endDate: z.date().optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  location: z.string(),
  categoryId: z.string(),
  isFree: z.boolean(),
  imageUrl: z.any(),
  tickets: z.array(ticketSchema).min(1, "Minimum 1 ticket types"),
  promotions: z.array(promotionSchema).optional(),
});

export default function CreateEventPage() {
  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      isFree: true,
      tickets: [{ tierName: "", price: 0, availableSeats: 1 }],
    },
  });
  const router = useRouter();
  const { toast } = useToast();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tickets",
  });

  useEffect(() => {
    const isFree = form.watch("isFree");
    if (isFree) {
      form.setValue("tickets", [
        {
          tierName: "Free",
          price: 0,
          availableSeats: 1,
        },
      ]);
      form.setValue("promotions", []);
    } else {
      form.setValue("tickets", [
        {
          tierName: "",
          price: 5000,
          availableSeats: 1,
        },
      ]);
    }
  }, [form.watch("isFree"), form.setValue]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof createEventSchema>) => {
    try {
      console.log(values);

      const formData = new FormData();
      const typedValues = values as { [key: string]: any };

      Object.keys(typedValues).forEach((key) => {
        if (key === "date" || key === "endDate") {
          formData.append(key, typedValues[key]?.toISOString() || "");
        } else if (key === "imageUrl" && typedValues[key]) {
          const file = typedValues[key];
          formData.append(key, file);
          console.log("Image file:", file); // This will log the File object
        } else if (key === "category") {
          formData.append(key, String(parseInt(typedValues[key])));
        } else if (key === "promotions" && !typedValues.isFree) {
          formData.append(key, JSON.stringify(typedValues[key]));
        } else if (key === "tickets") {
          formData.append(key, JSON.stringify(typedValues[key]));
        } else {
          formData.append(key, String(typedValues[key]));
        }
      });
      console.log("FormData keys:", Array.from(formData.keys()));
      console.log("Image file:", formData.get("imageUrl"));

      await createEvent(formData);

      toast({
        description: "Successfully Created Event",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      //   toast({
      //     description: error,
      //   });
    }
  };

  return (
    <div className="p-10 w-full h-full space-y-4">
      <h1 className="text-3xl font-semibold text-center">Create Event</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid lg:grid-cols-2 gap-8">
            <EventNameField control={form.control} />
            <CategoryField control={form.control} />
            <LocationField control={form.control} />
            <div className="lg:flex lg:justify-between lg:gap-4">
              <DateField control={form.control} />
              <EndDateField control={form.control} />
            </div>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Upload your image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col">
                      <div className="w-full aspect-[2/1] mb-2 relative border-dashed border rounded-md overflow-hidden">
                        <input
                          {...fieldProps}
                          type="file"
                          accept=".jpg, .jpeg, .png, .webp"
                          className="cursor-pointer inset-0 absolute opacity-0"
                          onChange={(event) =>
                            onChange(
                              event.target.files && event.target.files[0]
                            )
                          }
                        />
                        {imagePreview ? (
                          <Image
                            src={imagePreview}
                            alt="preview"
                            width={600}
                            height={300}
                            className="object-cover aspect-[2/1] object-center"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full bg-slate-300 gap-2 pt-8">
                            <UploadCloud size={72} />
                            <div className="flex flex-col text-stone-800 text-sm text-center mt-2">
                              <p>Supported file format:</p>
                              <p>JPG, JPEG, PNG, SVG</p>
                              <p>Max file size: 2MB</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DescriptionField control={form.control} />

            <div>
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm">Event pricing</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                        defaultValue={field.value ? "true" : "false"}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Pricing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Free</SelectItem>
                          <SelectItem value="false">Paid</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <div className="flex flex-col gap-4">
                  <FormLabel className="mt-3 text-center text-lg justify-center">
                    Ticket Tier
                  </FormLabel>
                  {fields.map((field: any, index: number) => (
                    <div
                      key={field.id}
                      className="flex gap-4 pb-4 px-4 py-2 border rounded-lg"
                    >
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.tierName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tier</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ticket tier"
                                disabled={form.watch("isFree")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="100"
                                placeholder="Price"
                                disabled={form.watch("isFree")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.availableSeats`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Quantity"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          className="mt-8"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  {!form.watch("isFree") && (
                    <Button
                      type="button"
                      onClick={() =>
                        append({
                          tierName: "",
                          price: 5000,
                          availableSeats: 1,
                        })
                      }
                    >
                      Add Ticket Type
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {!form.watch("isFree") && (
              <div className="flex flex-col gap-4">
                <FormLabel className="text-sm">Promotions</FormLabel>
                {fields.map((field: any, index: number) => (
                  <div
                    key={field.id}
                    className="flex flex-col gap-4 pb-4 px-4 py-2 border rounded-lg"
                  >
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name={`promotions.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Voucher Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`promotions.${index}.discount`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Discount (Rp.)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Discount"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`promotions.${index}.maxUser`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Quantity"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
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
