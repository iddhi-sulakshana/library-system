import React from "react";
import { Avatar, Chip, IconButton, Stack, Typography } from "@mui/joy";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CircleIcon from "@mui/icons-material/Circle";

function MessagePaneHeader({ sender }) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.body",
            }}
            p={2}
        >
            <Stack
                direction="row"
                spacing={{ xs: 1, md: 2 }}
                alignItems="center"
            >
                {/* Display User Picture */}
                <Avatar size="lg" src={sender.avatar} />
                {/* Display User Online Status and Name */}
                <Typography
                    fontWeight="lg"
                    fontSize="lg"
                    component="h2"
                    noWrap
                    endDecorator={
                        <Chip
                            variant="outlined"
                            size="sm"
                            color="neutral"
                            sx={{
                                borderRadius: "sm",
                            }}
                            startDecorator={
                                <CircleIcon
                                    sx={{ fontSize: 8 }}
                                    color={
                                        sender.online ? "success" : "warning"
                                    }
                                />
                            }
                        >
                            {sender.online ? "Online" : "Offline"}
                        </Chip>
                    }
                >
                    {sender.name}
                </Typography>
            </Stack>
        </Stack>
    );
}

export default MessagePaneHeader;
