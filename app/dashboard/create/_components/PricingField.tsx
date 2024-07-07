import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PricingFieldProps {
  control: any;
  watch: any;
  setValue: any;
  append: (value: any) => void;
  remove: (index: number) => void;
}

const PricingField: React.FC<PricingFieldProps> = ({
  control,
  watch,
  setValue,
  append,
  remove,
}) => {
  const isFree = watch("isFree");
  const ticketTypes = watch("ticketTypes");

  useEffect(() => {
    if (isFree) {
      setValue("ticketTypes", [
        {
          ticketTier: "Free",
          price: 0,
          quantity: 1,
        },
      ]);
    }
  }, [isFree, setValue]);

  return (
    <div>
      <FormField
        control={control}
        name="isFree"
        render={({ field }) => (
          <FormItem className="flex gap-4 items-end">
            <FormLabel className="text-sm">Event pricing</FormLabel>
            <FormControl>
              <div className="flex justify-center">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-4">
        <FormLabel className="my-1 text-center text-lg justify-center">
          Ticket Tier
        </FormLabel>
        {ticketTypes.map((item: any, index: number) => (
          <div
            key={item.id || index}
            className="flex gap-4 pb-4 px-4 py-2 border rounded-lg"
          >
            <FormField
              control={control}
              name={`ticketTypes.${index}.ticketTier`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tier</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ticket tier"
                      disabled={isFree}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`ticketTypes.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="100"
                      placeholder="Price"
                      disabled={isFree}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`ticketTypes.${index}.quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Quantity" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={() => remove(index)}
              className="mt-8"
            >
              Remove
            </Button>
          </div>
        ))}
        {!isFree && (
          <Button
            type="button"
            onClick={() =>
              append({
                ticketTier: "",
                price: 5000,
                quantity: 1,
              })
            }
          >
            Add Ticket Type
          </Button>
        )}
      </div>
    </div>
  );
};

export default PricingField;
