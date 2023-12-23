import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import {
    Box,
    ListDivider,
    ListItem,
    ListItemButton,
    Stack,
    Typography,
} from "@mui/joy";
import AvatarWithStatus from "./AvatarWithStatus";
import { formatTimestamp } from "../../utils";

function ChatListItem({
    _id,
    participant,
    latestMessage,
    selectedChatId,
    setSelectedChat,
}) {
    // Check if the chat is selected
    const isSelected = selectedChatId === _id;
    return (
        <React.Fragment>
            <ListItem>
                <ListItemButton
                    onClick={() => {
                        setSelectedChat(_id);
                    }}
                    selected={isSelected}
                    color="neutral"
                    sx={{
                        flexDirection: "column",
                        alignItems: "initial",
                        gap: 1,
                    }}
                >
                    <Stack direction="row" spacing={1.5}>
                        {/* Chat User Icon */}
                        <AvatarWithStatus
                            online={participant.online}
                            src={participant.avatar}
                        />
                        <Box sx={{ flex: 1 }}>
                            {/* Display Chat User Name */}
                            <Typography level="title-sm">
                                {participant.name}{" "}
                                {participant.isAdmin && "(Admin)"}
                            </Typography>
                            {/* Display the last message of the chat */}
                            <Typography
                                level="body-sm"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {latestMessage.message
                                    ? latestMessage.message
                                    : "No messages yet"}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                lineHeight: 1.5,
                                textAlign: "right",
                            }}
                        >
                            {/* Display Sent Time */}
                            <Typography level="body-xs" display="block" noWrap>
                                {latestMessage.timestamp
                                    ? formatTimestamp(latestMessage.timestamp)
                                    : ""}
                            </Typography>
                        </Box>
                    </Stack>
                </ListItemButton>
            </ListItem>
            <ListDivider sx={{ margin: 0 }} />
        </React.Fragment>
    );
}

export default ChatListItem;
