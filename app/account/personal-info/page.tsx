"use client";

import { account } from "@/appwrite.config";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { FormError } from "@/components/form-error";

export default function PersonalInfo() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingInfo, setEditingInfo] = useState<any>(null);
  const [editedValue, setEditedValue] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [useAsPassengerInfo, setUseAsPassengerInfo] = useState<boolean>(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const PERSONAL_INFO = [
    {
      label: t("personalInfo.name"),
      value: user?.name || "Not provided",
      action: user?.name ? t("personalInfo.edit") : "Add",
      update: async (newValue: string) => {
        await account.updateName(newValue);
      },
    },
    {
      label: t("personalInfo.emailAddress"),
      value: user?.email || "Not provided",
      action: user?.email ? t("personalInfo.edit") : "Add",
      update: async (newValue: string, password: string) => {
        await account.updateEmail(newValue, password);
      },
    },
    {
      label: t("personalInfo.phoneNumber"),
      value: user?.phone || "Add a number so the operators can get in touch.",
      action: user?.phone ? t("personalInfo.edit") : "Add",
      update: async (newValue: string, password: string) => {
        await account.updatePhone(newValue, password);
      },
    },
    // {
    //   label: t("personalInfo.address"),
    //   value: user?.prefs?.address || "Not provided",
    //   action: user?.prefs?.address ? t("personalInfo.edit") : "Add",
    //   update: async (newValue: string) => {
    //     await account.updatePrefs({ address: newValue });
    //   },
    // },
  ];

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const fetchUser = async () => {
    try {
      const user = await account.get();
      setUser(user);
      setUseAsPassengerInfo(user.prefs?.useAsPassengerInfo || false);
      setIsLoading(false);
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSaveChanges = async () => {
    if (editingInfo) {
      try {
        await editingInfo.update(editedValue, password);
        fetchUser();
        setPassword("");
        setEditingInfo(null);
        toast({ description: "Changes saved successfully." });
      } catch (error: any) {
        console.log({ error });
        if (error.type == "user_phone_already_exists") {
          setError("A user with the same phone number already exists");
        } else {
          setError(error?.message || "");
        }
      }
    }
  };

  const handleUseAsPassengerInfoChange = async (checked: boolean) => {
    try {
      const prevPrefs = await account.getPrefs();
      await account.updatePrefs({ ...prevPrefs, useAsPassengerInfo: checked });
      setUseAsPassengerInfo(checked);
      toast({ description: "Passenger info preference updated successfully." });
    } catch (error) {
      console.log({ error });
      toast({
        description:
          "Failed to update passenger info preference. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">{t("personalInfo.title")}</h2>
        </div>
        <div className="space-y-6">
          {PERSONAL_INFO?.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-6`}
            >
              <div>
                <div className="text-base">{item.label}</div>
                <div className="text-neutral-800/60 max-w-2xl text-sm">
                  {isLoading ? <Skeleton className="w-24 h-5" /> : item.value}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingInfo(item);
                  setEditedValue(item.value);
                }}
              >
                {item.action}
              </Button>
            </div>
          ))}
          <div className="flex items-center space-x-2">
            <Switch
              id="use-as-passenger-info"
              checked={useAsPassengerInfo}
              className="data-[state=checked]:bg-primary-accent"
              onCheckedChange={handleUseAsPassengerInfoChange}
            />
            <Label htmlFor="use-as-passenger-info">
              Use these details as primary passenger
            </Label>
          </div>
          <Dialog
            open={editingInfo !== null}
            onOpenChange={() => {
              setEditingInfo(null);
              setError(undefined);
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit {editingInfo?.label}</DialogTitle>
                <DialogDescription>
                  Enter your updated value below
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    {editingInfo?.label}
                  </Label>

                  <Input
                    id="name"
                    value={editedValue}
                    className="col-span-3 bg-primary-bg/5 h-12 rounded-lg border-none"
                    onChange={handleValueChange}
                  />
                </div>
              </div>
              {editingInfo?.label &&
              editingInfo?.label !== "Name" &&
              editingInfo?.label !== "Address" ? (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-left">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    className="col-span-3 bg-primary-bg/5 h-12 rounded-lg border-none"
                    onChange={handlePasswordChange}
                  />
                </div>
              ) : null}
              <FormError message={error} />
              <DialogFooter>
                <Button
                  type="submit"
                  variant={"primary"}
                  disabled={editingInfo?.label !== "Name" && !password}
                  onClick={handleSaveChanges}
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
