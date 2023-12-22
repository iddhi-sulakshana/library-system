import { Chip, List, Sheet, Stack, Typography } from "@mui/joy";
import React from "react";
import ChatListItem from "./ChatListItem";

function ChatsPane({ chats, selectedChatId, setSelectedChat }) {
    return (
        <Sheet
            sx={{
                borderRight: "1px solid",
                borderColor: "divider",
                maxHeight: "90dvh",
                minHeight: "90dvh",
                overflowY: "auto",
            }}
        >
            {/* Chats Pane Title */}
            <Typography
                fontSize="lg"
                component="h1"
                fontWeight="lg"
                endDecorator={
                    <Chip
                        variant="soft"
                        color="primary"
                        size="md"
                        slotProps={{ root: { component: "span" } }}
                    >
                        4
                    </Chip>
                }
                p={2}
                pb={3}
                sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                Messages
            </Typography>
            {/* List of chats */}
            <List
                sx={{
                    py: 0,
                    "--ListItem-paddingY": "0.75rem",
                    "--ListItem-paddingX": "1rem",
                }}
            >
                {chats.map((chat) => (
                    <ChatListItem
                        key={chat.id}
                        {...chat}
                        selectedChatId={selectedChatId}
                        setSelectedChat={setSelectedChat}
                    />
                ))}
            </List>
        </Sheet>
    );
}

export default ChatsPane;
