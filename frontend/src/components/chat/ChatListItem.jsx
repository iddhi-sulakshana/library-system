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

function ChatListItem({
    id,
    sender,
    messages,
    selectedChatId,
    setSelectedChat,
}) {
    // Check if the chat is selected
    const isSelected = selectedChatId === id;
    return (
        <React.Fragment>
            <ListItem>
                <ListItemButton
                    onClick={() => {
                        setSelectedChat({ id, sender, messages });
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
                            online={sender.online}
                            src={sender.avatar}
                        />
                        <Box sx={{ flex: 1 }}>
                            {/* Display Chat User Name */}
                            <Typography level="title-sm">
                                {sender.name}
                            </Typography>
                            {/* Display the last message of the chat */}
                            <Typography
                                level="body-sm"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {messages[0].content}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                lineHeight: 1.5,
                                textAlign: "right",
                            }}
                        >
                            {/* Display unread status */}
                            {messages[0].unread && (
                                <CircleIcon
                                    sx={{ fontSize: 12 }}
                                    color="primary"
                                />
                            )}
                            {/* Display Sent Time */}
                            <Typography
                                level="body-xs"
                                display={{ xs: "none", md: "block" }}
                                noWrap
                            >
                                5 mins ago
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
