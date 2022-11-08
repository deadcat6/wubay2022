import {Button} from "@mui/material";
import React from "react";
import CustomerDashboardLayout from "../customer-dashboard";
import {useRouter} from "next/router";

export default function Chats() {
  const router = useRouter();

  return (
    <CustomerDashboardLayout>
      <Button
        onClick={() => {
          router.push("/user/profile")
        }}
        variant="outlined"
        color="secondary"
        sx={{
          px: 4,
        }}
      >
        Chat page not implemented, Back to Profile
      </Button>
    </CustomerDashboardLayout>
  );
}