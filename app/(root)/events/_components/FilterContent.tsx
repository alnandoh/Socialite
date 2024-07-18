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
  { value: "name,desc", label: "Name", icon: ArrowDown },
  { value: "name,asc", label: "Name", icon: ArrowUp },
  { value: "date,desc", label: "Date", icon: ArrowDown },
  { value: "date,asc", label: "Date", icon: ArrowUp },
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
        <SelectTrigger className="w-full min-w-[150px]">
          <SelectValue placeholder="Category" />
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
        <SelectTrigger className="w-full min-w-[150px]">
          <SelectValue placeholder="Location" />
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
        onValueChange={(value) => onFilterChange("sort", value)}
        value={filters.sort}
      >
        <SelectTrigger className="w-full min-w-[125px]">
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
        <RotateCcw className="h-4 w-4 hidden lg:flex" />
        <p className="lg:hidden">Clear filters</p>
      </Button>
    </>
  );
}
