import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFieldProps {
  control: any;
}

const DescriptionField: React.FC<DescriptionFieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="description"
    render={({ field }) => (
      <FormItem className="h-full">
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Describe your event"
            className="resize-none overflow-y-scroll lg:h-[200px] h-max-full"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default DescriptionField;
