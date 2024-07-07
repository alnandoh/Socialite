import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/libs/utils";

interface DateFieldProps {
  control: any; // replace with proper type if known
}

const DateField: React.FC<DateFieldProps> = ({ control }) => {
  const [selected, setSelected] = useState<Date | undefined>();
  const [timeValue, setTimeValue] = useState<string>("");

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const time = event.target.value;
    if (selected) {
      const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
      const newDate = new Date(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate(),
        hours,
        minutes
      );
      console.log(newDate);
      setSelected(newDate);
    } else {
      setTimeValue(time);
    }
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (timeValue && date) {
      const [hours, minutes] = timeValue
        .split(":")
        .map((str) => parseInt(str, 10));
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hours,
        minutes
      );
      console.log(newDate);
      setSelected(newDate);
    } else {
      setSelected(date);
    }
  };

  return (
    <FormField
      control={control}
      name="date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date and Time</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !selected && "text-muted-foreground"
                  )}
                >
                  {selected ? (
                    format(selected, "eee, dd/MM/yyyy HH:mm")
                  ) : (
                    <span>Pick event date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 flex" align="start">
              <Calendar
                mode="single"
                selected={selected}
                onSelect={handleDaySelect}
                disabled={(date) => date < new Date()}
                initialFocus
              />
              <div className="flex flex-col p-3 space-y-2 border-l">
                <p>Time</p>
                <input
                  type="time"
                  onChange={handleTimeChange}
                  className="border px-0.5 rounded-sm"
                  required
                />
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateField;
