import { Box, Sheet, Stack } from "@mui/joy";
import React, { useEffect, useState } from "react";
import MessagePaneHeader from "./MessagePaneHeader";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import AvatarWithStatus from "./AvatarWithStatus";
import { getSocket } from "../../hooks/chatSocket";

function MessagePane({ selectedChat, setSelectedChat, update, setUpdate }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!selectedChat) return;
        setLoading(true);
        setError(null);
        const socket = getSocket();
        socket.on("get_messages", (data) => {
            setMessages(data);
            setLoading(false);
        });
    }, [update, selectedChat]);

    // React state for text area value to keep track of the text area value
    const [textAreaValue, setTextAreaValue] = useState("");
    // Function to handle text submit to add new message to the chat
    const onTextSubmit = () => {
        // Send the message to the server
        const socket = getSocket();
        socket.emit("new_message", {
            chatId: selectedChat._id,
            message: textAreaValue,
        });
    };
    if (!selectedChat) {
        return (
            <Sheet
                sx={{
                    height: "90dvh",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "background.level1",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.secondary",
                    }}
                >
                    Select a chat to start messaging
                </Box>
            </Sheet>
        );
    }
    return (
        <Sheet
            sx={{
                height: "90dvh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.level1",
            }}
        >
            {/* Selected Chat User Details */}
            <MessagePaneHeader
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                update={update}
                setUpdate={setUpdate}
            />
            {/* Display Chat Messages */}
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    py: 3,
                    overflowY: "scroll",
                    flexDirection: "column-reverse",
                }}
            >
                <Stack spacing={2} justifyContent="flex-end">
                    {loading && (
                        <Box
                            sx={{
                                display: "flex",
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                color: "text.secondary",
                            }}
                        >
                            Loading messages...
                        </Box>
                    )}
                    {!loading && error && (
                        <Box
                            sx={{
                                display: "flex",
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                color: "text.secondary",
                            }}
                        >
                            Error loading messages...
                        </Box>
                    )}
                    {!loading && !error && messages.length === 0 && (
                        <Box
                            sx={{
                                display: "flex",
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                color: "text.secondary",
                            }}
                        >
                            No messages to display...
                        </Box>
                    )}
                    {!loading &&
                        !error &&
                        messages.map((message) => {
                            // Check if the message is sent by you
                            const isYou = message.sender === "You";
                            return (
                                <Stack
                                    key={message._id}
                                    direction="row"
                                    spacing={2}
                                    flexDirection={
                                        isYou ? "row-reverse" : "row"
                                    }
                                >
                                    {message.sender !== "You" && (
                                        <AvatarWithStatus
                                            src={
                                                selectedChat.participant.avatar
                                            }
                                        />
                                    )}
                                    <ChatBubble
                                        variant={isYou ? "sent" : "received"}
                                        {...message}
                                    />
                                </Stack>
                            );
                        })}
                </Stack>
            </Box>
            {/* Message Input */}
            <MessageInput
                textAreaValue={textAreaValue}
                setTextAreaValue={setTextAreaValue}
                onTextSubmit={onTextSubmit}
            />
        </Sheet>
    );
}

export default MessagePane;
