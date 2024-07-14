import { useState } from "react";
import { FilterIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Filters } from "@/types";
import FilterContent from "./FilterContent";

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
  onClearFilters: () => void;
  totalEvents: number;
}

export default function FilterBar({
  filters,
  onFilterChange,
  onClearFilters,
  totalEvents,
}: FilterBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="w-full flex justify-between items-center flex-wrap gap-4">
      <p>
        Show 1 - {totalEvents} from{" "}
        <span className="font-semibold">{totalEvents}</span> events
      </p>

      <div className="lg:hidden">
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FilterIcon size={16} />
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <FilterContent
                filters={filters}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        <FilterContent
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      </div>
    </div>
  );
}
