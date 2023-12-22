import { Avatar, Box, Sheet, Stack } from "@mui/joy";
import React, { useState } from "react";
import MessagePaneHeader from "./MessagePaneHeader";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";

function MessagePane({ chat }) {
    // React state for chat messages to keep track of the messages in current chat
    const [chatMessages, setChatMessages] = useState(chat.messages);
    // React state for text area value to keep track of the text area value
    const [textAreaValue, setTextAreaValue] = useState("");
    // Function to handle text submit to add new message to the chat
    const onTextSubmit = () => {
        const newId = (chatMessages.length + 1).toString();
        setChatMessages([
            ...chatMessages,
            {
                id: newId,
                content: textAreaValue,
                timestamp: "Just now",
                sender: "You",
            },
        ]);
    };
    // React effect to update chat messages when chat changes
    React.useEffect(() => {
        setChatMessages(chat.messages);
    }, [chat.messages]);
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
            <MessagePaneHeader sender={chat.sender} />
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
                    {chatMessages.map((message, index) => {
                        // Check if the message is sent by you
                        const isYou = message.sender === "You";
                        return (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                flexDirection={isYou ? "row-reverse" : "row"}
                            >
                                {message.sender !== "You" && (
                                    <Avatar
                                        online={message.sender.online}
                                        src={message.sender.avatar}
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
