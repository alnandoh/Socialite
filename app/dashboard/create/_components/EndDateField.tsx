import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from "./DatePicker";

interface DateFieldProps {
  control: any;
}

const DateField: React.FC<DateFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="endDate"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Start Date</FormLabel>
          <FormControl>
            <DatePicker {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateField;
