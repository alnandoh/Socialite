"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Link, Pen, Pencil, Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Event = {
  id: string;
  name: string;
  startDate: Date;
  location: string;
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="size-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="size-4 ml-2" />
        </Button>
      );
    },
  },
];
