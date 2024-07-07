import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFieldProps {
  control: any;
}

const CategoryField: React.FC<CategoryFieldProps> = ({ control }) => (
  <FormField
    control={control}
    name="category"
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel>Category</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Music</SelectItem>
              <SelectItem value="2">Tournament</SelectItem>
              <SelectItem value="3">Conference</SelectItem>
              <SelectItem value="4">Bazaar</SelectItem>
              <SelectItem value="5">Expo</SelectItem>
              <SelectItem value="6">Other</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default CategoryField;
