import React, { useState } from "react";
import { Sheet } from "@mui/joy";
import ChatsPane from "./ChatsPane";
import MessagePane from "./MessagePane";
import useGetChats from "../../hooks/useGetChats";

function Messages() {
    // React state for selected chat to keep track of which chat is selected
    const [refresh, setRefresh] = useState(false);
    const { chats, loading, error } = useGetChats(refresh);
    const [selectedChat, setSelectedChat] = useState(null);
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
                selectedChatId={selectedChat}
                setSelectedChat={setSelectedChat}
                refresh={refresh}
                setRefresh={setRefresh}
                chats={chats}
                loading={loading}
                error={error}
            />
            {/* Message pane to display the selected chat messages */}
            <MessagePane
                selectedChat={
                    chats &&
                    chats.length !== 0 &&
                    chats.filter((chat) => chat._id === selectedChat)[0]
                }
                setSelectedChat={setSelectedChat}
                refresh={refresh}
                setRefresh={setRefresh}
            />
        </Sheet>
    );
}

export default Messages;
