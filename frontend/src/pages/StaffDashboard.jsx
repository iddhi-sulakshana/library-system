import { Grid, Stack } from "@mui/joy";
import React from "react";
import PersonalCard from "../components/staff/PersonalCard";
import PasswordCard from "../components/staff/PasswordCard";
import AdminsCard from "../components/staff/AdminsCard";

function StaffDashboard() {
    return (
        <Stack
            spacing={4}
            sx={{
                display: "flex",
                mx: "auto",
                px: 6,
                py: 3,
            }}
        >
            <Grid container spacing={4}>
                <Grid xs={12} md={6}>
                    <PersonalCard />
                </Grid>
                <Grid xs={12} md={6}>
                    <PasswordCard />
                </Grid>
            </Grid>
            <AdminsCard />
        </Stack>
    );
}

export default StaffDashboard;
