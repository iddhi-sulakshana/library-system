import { Box, Button, Chip, List, Sheet, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatListItem";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NewChatModal from "./NewChatModal";
import { getSocket } from "../../hooks/chatSocket";

function ChatsPane({
    selectedChatId,
    setSelectedChat,
    chats,
    setChats,
    update,
    setUpdate,
}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // get chats from socket
    useEffect(() => {
        setLoading(true);
        setError(null);
        const socket = getSocket();
        if (!socket) {
            setError(true);
            setLoading(false);
            return;
        }
        if (!socket.connected) {
            setError(true);
            setLoading(false);
            return;
        }
        setError(null);
        socket.emit("chats");
        socket.on("get_chats", (data) => {
            setChats(data);
            setLoading(false);
        });
    }, [update]);
    return (
        <Sheet
            sx={{
                borderRight: "1px solid",
                borderColor: "divider",
                maxHeight: "85dvh",
                minHeight: "85dvh",
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
                    update={update}
                    setUpdate={setUpdate}
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
