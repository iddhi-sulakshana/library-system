import { Box, Sheet, Stack, Typography } from "@mui/joy";
import React, { useState } from "react";
import MessagePaneHeader from "./MessagePaneHeader";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import AvatarWithStatus from "./AvatarWithStatus";
import useGetMessages from "../../hooks/useGetMessages";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import { getURL } from "../../utils";

function MessagePane({ selectedChat, setSelectedChat, refresh, setRefresh }) {
    const { id } = useUserContext();
    const { messages, loading, error } = useGetMessages(
        selectedChat?._id,
        refresh
    );
    // React state for text area value to keep track of the text area value
    const [textAreaValue, setTextAreaValue] = useState("");
    // Function to handle text submit to add new message to the chat
    const onTextSubmit = () => {
        // Send the message to the server
        axios
            .request({
                method: "PUT",
                url: getURL("chat/message"),
                headers: {
                    user: id,
                },
                data: {
                    chatId: selectedChat._id,
                    message: textAreaValue,
                },
            })
            .then(() => {
                // Refresh the messages
                setRefresh(!refresh);
            })
            .catch((err) => {
                console.log(err);
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
                refresh={refresh}
                setRefresh={setRefresh}
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
                                            online={
                                                selectedChat.participant.online
                                            }
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
