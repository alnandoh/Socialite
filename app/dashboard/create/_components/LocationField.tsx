import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import locations from "@/constants/locations";

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
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Pick location" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.value} value={location.value}>
                {location.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default LocationField;
