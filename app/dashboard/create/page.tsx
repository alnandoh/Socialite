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
import { useSession } from "next-auth/react";
import TicketRows from "./_components/TicketRows";

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
  imageUrl: z.any().optional(),
  tickets: z.array(
    z.object({
      tierName: z.string(),
      price: z.number(),
      availableSeats: z.number(),
    })
  ),
  promotions: z.array(promotionSchema).optional(),
});

export default function CreateEventPage() {
  const { data: session } = useSession();
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

  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
      setFileName(file.name);
      onChange(file);
    }
  };

  const [ticketRows, setTicketRows] = useState([{ id: 0 }]);

  const addTicketRow = () => {
    const newTicketRow = { id: ticketRows.length };
    setTicketRows([...ticketRows, newTicketRow]);
  };

  const removeTicketRow = (indexToRemove: number) => {
    const updatedRows = ticketRows.filter(
      (_, index) => index !== indexToRemove
    );
    setTicketRows(updatedRows);
  };

  const onSubmit = async (values: z.infer<typeof createEventSchema>) => {
    try {
      console.log(values);
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("date", values.date.toISOString());
      if (values.endDate) {
        formData.append("endDate", values.endDate.toISOString());
      }
      formData.append("description", values.description);
      formData.append("location", values.location);
      formData.append("categoryId", values.categoryId.toString());
      formData.append("isFree", values.isFree.toString());
      formData.append("imageUrl", values.imageUrl);
      formData.append("tickets", JSON.stringify(values.tickets));
      formData.append("promotions", JSON.stringify(values.promotions));

      console.log("FormData keys:", Array.from(formData.keys()));
      console.log("FormData values:", Array.from(formData.values()));
      console.log("Image file:", formData.get("imageUrl"));
      console.log(session?.user?.token as string);
      const response = await createEvent(
        session?.user?.token as string,
        formData
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
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
                          onChange={(e) => handleImageUpload(e, onChange)}
                        />
                        {image ? (
                          <Image
                            src={image}
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
                      {fileName ? (
                        <p className="text-sm text-center mt-2.5">{fileName}</p>
                      ) : (
                        <p className="text-sm text-center mt-2.5">
                          No files selected
                        </p>
                      )}
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
                  {ticketRows.map((_, index) => (
                    <TicketRows
                      key={index}
                      index={index}
                      watch={form.watch("isFree")}
                      removeRow={removeTicketRow}
                    />
                  ))}
                  {!form.watch("isFree") && (
                    <Button type="button" onClick={addTicketRow}>
                      Add Ticket
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
