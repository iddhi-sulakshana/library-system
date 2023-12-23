import React from "react";
import { Avatar, Button, Chip, Stack, Typography } from "@mui/joy";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import axios from "axios";
import { getURL } from "../../utils";
import { useUserContext } from "../../contexts/UserContext";

function MessagePaneHeader({
    selectedChat,
    setSelectedChat,
    refresh,
    setRefresh,
}) {
    const sender = selectedChat?.participant;
    const [loading, setLoading] = React.useState(false);
    const { id } = useUserContext();
    // delete selected chat
    const onDelete = () => {
        if (loading) return;
        setLoading(true);
        axios
            .request({
                method: "DELETE",
                headers: {
                    user: id,
                },
                url: getURL("chat/" + selectedChat._id),
            })
            .then(() => {
                setSelectedChat(null);
                setRefresh(!refresh);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
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
                    {sender.name} {sender.isAdmin && "(Admin)"}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
                <Button
                    variant="plain"
                    color="danger"
                    onClick={onDelete}
                    loading={loading}
                >
                    <DeleteOutlineRoundedIcon />
                </Button>
            </Stack>
        </Stack>
    );
}

export default MessagePaneHeader;
