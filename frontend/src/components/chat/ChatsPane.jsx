import { Box, Button, Chip, List, Sheet, Typography } from "@mui/joy";
import React, { useState } from "react";
import ChatListItem from "./ChatListItem";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NewChatModal from "./NewChatModal";
import useGetChats from "../../hooks/useGetChats";

function ChatsPane({
    selectedChatId,
    setSelectedChat,
    refresh,
    setRefresh,
    chats,
    loading,
    error,
}) {
    const [open, setOpen] = useState(false);
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
            <Box
                sx={{
                    pt: 2,
                    px: 2,
                    pb: 3.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {/* Chats Pane Title */}
                <Typography fontSize="lg" component="h1" fontWeight="lg">
                    Messages
                </Typography>
                <Button
                    size="md"
                    variant="outlined"
                    endDecorator={<AddRoundedIcon />}
                    onClick={() => setOpen(true)}
                >
                    New Chat
                </Button>
                <NewChatModal
                    open={open}
                    setOpen={setOpen}
                    setSelectedChat={setSelectedChat}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            </Box>
            {/* List of chats */}
            <List
                sx={{
                    py: 0,
                    "--ListItem-paddingY": "1rem",
                    "--ListItem-paddingX": "1rem",
                }}
            >
                {loading && <Typography>Loading chats...</Typography>}
                {error && <Typography>Error loading chats...</Typography>}
                {!loading && !error && chats.length === 0 && (
                    <Typography>No chats found...</Typography>
                )}
                {!loading &&
                    !error &&
                    chats &&
                    chats.length !== 0 &&
                    chats.map((chat) => (
                        <ChatListItem
                            key={chat._id}
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
