"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import EventList from "./_components/EventList"; // Assuming you've moved your EventList component to a separate file
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy } from "lucide-react";

// Define the type for a referred user
type ReferredUser = {
  id: string;
  name: string;
  email: string;
  dateJoined: Date;
};

// Define the columns for the referred users table
const columns: ColumnDef<ReferredUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "dateJoined",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Joined
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
];

// Mock data for referred users
const mockReferredUsers: ReferredUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    dateJoined: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    dateJoined: new Date("2023-02-20"),
  },
  // Add more mock data as needed
];

export default function ReferralPage() {
  const [referralCode] = useState("YOUR_REFERRAL_CODE"); // Replace with actual referral code

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Referral Code Copied!",
      description: "The referral code has been copied to your clipboard.",
    });
  };

  return (
    <div className="w-full p-10 space-y-8">
      <h1 className="text-3xl font-semibold">My Referrals</h1>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-medium mb-4">My Referral Code</h2>
        <div className="flex items-center space-x-4">
          <Input
            value={referralCode}
            readOnly
            className="text-2xl font-bold bg-white"
          />
          <Button onClick={copyReferralCode} variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-medium">Referred Users</h2>
        <EventList columns={columns} data={mockReferredUsers} />
      </div>
    </div>
  );
}
