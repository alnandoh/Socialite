"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/libs/api/api-libs";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useSession } from "next-auth/react";
import { ProfileSkeleton } from "@/components/shared/Skeleton";

export default function ProfilePage() {
  const { data: session } = useSession();

  const {
    data: apiProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => fetchUserProfile(session?.user?.token as string),
    enabled: !!session?.user?.token,
  });

  const profile = apiProfile;

  const copyReferralCode = () => {
    if (profile) {
      navigator.clipboard.writeText(profile.referralCode);
      toast({
        title: "Referral Code Copied!",
        description: "The referral code has been copied to your clipboard.",
      });
    }
  };

  if (isLoading) return <ProfileSkeleton />;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {profile && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Name:</p>
                  <p>{profile.name}</p>
                </div>
                <div>
                  <p className="font-semibold">Email:</p>
                  <p>{profile.email}</p>
                </div>
                <div>
                  <p className="font-semibold">Role:</p>
                  <p>{profile.role}</p>
                </div>
                <div>
                  <p className="font-semibold">Member Since:</p>
                  <p>{format(new Date(profile.created_at), "MMMM d, yyyy")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Referral Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Input
                  value={profile.referralCode}
                  readOnly
                  className="text-2xl font-bold bg-gray-100"
                />
                <Button onClick={copyReferralCode} variant="outline">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
