import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LocationFieldProps {
  control: any;
}

const LocationField: React.FC<LocationFieldProps> = ({ control }) => (
  <FormField
    control={control}
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
);

export default LocationField;
