import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EventNameFieldProps {
  control: any;
}

const EventNameField: React.FC<EventNameFieldProps> = ({ control }) => (
  <FormField
    control={control}
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
);

export default EventNameField;
