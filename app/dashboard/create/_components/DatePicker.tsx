"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/libs/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import "react-time-picker/dist/TimePicker.css";
import TimePicker from "react-time-picker";

export default function DatePicker({
  field,
  onChange,
  value,
}: {
  field?: ControllerRenderProps<any, any>;
  onChange?: any;
  value?: Date;
}) {
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    if (selectedTime || selectedDate) {
      const [hours, minutes] = selectedTime.split(":");
      const newDate = new Date(selectedDate || new Date());
      newDate.setHours(parseInt(hours));
      newDate.setMinutes(parseInt(minutes));
      onChange(newDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, selectedTime]);

  const handleTimeChange = (time: string | null) => {
    setSelectedTime(time || "");
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal p-0",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mx-2 h-4 w-4" />
            <Input
              placeholder="Select date"
              value={value ? format(value, "d MMMM yyyy HH:mm") : undefined}
              onChange={onChange}
              className="w-full rounded-l-none rounded-r-md"
              {...field}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto pb-2">
          <Calendar
            mode="single"
            selected={value}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            initialFocus
          />
          <TimePicker
            onChange={(e) => handleTimeChange(e)}
            value={value}
            format="HH:mm"
            disableClock={true}
            className={"w-full h-8"}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
