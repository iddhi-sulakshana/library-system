import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/joy";
import React from "react";

function AdminCard({ handleDelete, staff }) {
    return (
        <Card
            variant="outlined"
            orientation="horizontal"
            sx={{ gap: 1.5, alignItems: "flex-start" }}
        >
            <Avatar
                src={"https://robohash.org/" + staff?.image}
                alt={staff?.name}
            />
            <CardContent>
                <Typography level="title-md">Siriwat K.</Typography>
                <Typography level="body-xs" color="textSecondary">
                    {staff?.role}
                </Typography>
                <Typography level="title-sm" color="textSecondary">
                    {staff?.email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="sm"
                    variant="outlined"
                    color="danger"
                    onClick={() => handleDelete(staff?._id)}
                >
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default AdminCard;
