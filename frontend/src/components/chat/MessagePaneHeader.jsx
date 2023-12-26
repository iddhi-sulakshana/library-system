import React from "react";
import { Avatar, Button, Chip, Stack, Typography } from "@mui/joy";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import axios from "axios";
import { getURL } from "../../utils";
import { useUserContext } from "../../contexts/UserContext";
import { getSocket } from "../../hooks/chatSocket";

function MessagePaneHeader({
    selectedChat,
    setSelectedChat,
    update,
    setUpdate,
}) {
    const sender = selectedChat?.participant;
    const { id } = useUserContext();
    // delete selected chat
    const onDelete = () => {
        // delete using socket
        const socket = getSocket();
        socket.emit("delete_chat", selectedChat._id);
        setUpdate(!update);
    };
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
            <Stack direction="row" spacing={2} alignItems="center">
                {/* Display User Picture */}
                <Avatar size="lg" src={sender?.avatar} />
                {/* Display User Online Status and Name */}
                <Typography
                    fontWeight="lg"
                    fontSize="lg"
                    component="h2"
                    noWrap
                    endDecorator={
                        sender?.isAdmin && (
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
                                        color="success"
                                    />
                                }
                            >
                                Admin
                            </Chip>
                        )
                    }
                >
                    {sender?.name}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
                <Button variant="plain" color="danger" onClick={onDelete}>
                    <DeleteOutlineRoundedIcon />
                </Button>
            </Stack>
        </Stack>
    );
}

export default MessagePaneHeader;
