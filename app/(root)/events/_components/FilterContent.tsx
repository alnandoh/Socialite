import { ArrowUp, ArrowDown, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import categories from "@/constants/categories";
import locations from "@/constants/locations";
import { Filters } from "@/types";

const sortOptions = [
  { value: "nameDesc", label: "Name", icon: ArrowDown },
  { value: "nameAsc", label: "Name", icon: ArrowUp },
  { value: "dateDesc", label: "Date", icon: ArrowDown },
  { value: "dateAsc", label: "Date", icon: ArrowUp },
];

interface FilterContentProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onClearFilters: () => void;
}

export default function FilterContent({
  filters,
  onFilterChange,
  onClearFilters,
}: FilterContentProps) {
  return (
    <>
      <Select
        onValueChange={(value) => onFilterChange("categoryId", value)}
        value={filters.categoryId}
      >
        <SelectTrigger className="w-full min-w-[200px]">
          <SelectValue placeholder="Filter category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => onFilterChange("location", value)}
        value={filters.location}
      >
        <SelectTrigger className="w-full min-w-[200px]">
          <SelectValue placeholder="Filter location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location.value} value={location.value}>
              {location.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => onFilterChange("sortBy", value)}
        value={filters.sortBy}
      >
        <SelectTrigger className="w-full min-w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                {option.label} <option.icon size={16} />
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={onClearFilters} variant="outline" className="w-full">
        <RotateCcw />
      </Button>
    </>
  );
}
