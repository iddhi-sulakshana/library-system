import React, { useState } from "react";
import { chats } from "./data";
import { Sheet } from "@mui/joy";
import ChatsPane from "./ChatsPane";
import MessagePane from "./MessagePane";

function Messages() {
    // React state for selected chat to keep track of which chat is selected
    const [selectedChat, setSelectedChat] = useState(chats[0]);
    return (
        <Sheet
            sx={{
                flex: 1,
                width: "100%",
                mx: "auto",
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "minmax(min-content, min(30%, 400px)) 1fr",
                },
            }}
        >
            {/* Chats pane to display all the chats */}
            <ChatsPane
                chats={chats}
                selectedChatId={selectedChat.id}
                setSelectedChat={setSelectedChat}
            />
            {/* Message pane to display the selected chat messages */}
            <MessagePane chat={selectedChat} />
        </Sheet>
    );
}

export default Messages;
