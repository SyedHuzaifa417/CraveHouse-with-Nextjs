import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";
import { useModal } from "../ui/Modal";

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isCommunityMember, setIsCommunityMember] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.id) {
        const response = await fetch(`/api/user?userId=${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setName(data.name || "");
          setUsername(data.username || "");
          setIsCommunityMember(data.isCommunityMember || false);
        }
      }
    };
    fetchUserData();
  }, [session]);

  const handleSaveChanges = async () => {
    const response = await fetch(`/api/user?userId=${session?.user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, isCommunityMember }),
    });

    if (response.ok) {
      closeModal();
      toast.success("Profile updated successfully");
    } else {
      toast.error("Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await fetch(`/api/user?userId=${session?.user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setCurrentPassword("");
        setNewPassword("");
        closeModal();
        router.push("/");
      } else {
        toast.error(data.error || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await fetch(`/api/user?userId=${session?.user.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Account deleted successfully");
          signOut();
          closeModal();
          router.push("/");
        } else {
          const errorData = await response.json();
          toast.error(errorData.error || "Failed to delete account");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  if (!userData) {
    return <div className="text-h1Text text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4 px-4 sm:px-0">
      <h1 className="text-2xl text-h1Text font-semibold text-start">
        Edit Profile
      </h1>
      <Tabs
        defaultValue="account"
        className="w-full max-w-[400px] sm:w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="bg-gray-800/50 border-none shadow-xl shadow-gray-600">
            <CardHeader>
              <CardTitle className="text-h1Text">Account</CardTitle>
              <CardDescription className="text-pText">
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-200">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-800/50 border-none"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800/50 border-none"
                />
              </div>
              {!isCommunityMember && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="community"
                    checked={isCommunityMember}
                    onCheckedChange={(checked) =>
                      setIsCommunityMember(checked === true)
                    }
                  />
                  <Label htmlFor="community">Join Community</Label>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveChanges}
                className="bg-orange-600 hover:bg-orange-500"
              >
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card className="bg-gray-800/50 border-none shadow-xl shadow-gray-600">
            <CardHeader>
              <CardTitle className="text-h1Text">Password</CardTitle>
              <CardDescription className="text-pText">
                Change your password here. After saving, you&apos;ll not be
                logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-200">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input
                  id="current"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="bg-gray-800/50 border-none"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input
                  id="new"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-800/50 border-none"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleChangePassword}
                className="bg-orange-600 hover:bg-orange-500"
              >
                Save password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Button variant="destructive" onClick={handleDeleteAccount}>
        Delete Account
      </Button>
    </div>
  );
};

export default Profile;
