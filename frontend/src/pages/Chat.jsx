import React, { useEffect, useState } from "react";
import "@fontsource/inter";
import { Box, CssBaseline, Sheet } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import ChatsPane from "../components/chat/ChatsPane";
import MessagePane from "../components/chat/MessagePane";
import { disconnectSocket, getSocket, initSocket } from "../hooks/chatSocket";
import { useUserContext } from "../contexts/UserContext";

function Chat() {
    // React state for selected chat to keep track of which chat is selected
    const [refresh, setRefresh] = useState(false);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [update, setUpdate] = useState(false);
    const { id } = useUserContext();
    useEffect(() => {
        setSelectedChat(null);
        if (!id) {
            setLoading(false);
            setError(true);
            return;
        }
        setLoading(true);
        setError(null);
        const socket = initSocket(id, update, setUpdate);
        socket.on("update", () => {
            setUpdate(Math.random());
        });
        return () => {
            disconnectSocket(update, setUpdate);
        };
    }, [id]);
    useEffect(() => {
        if (!selectedChat) return;
        const socket = getSocket();
        socket.emit("messages", selectedChat);
    }, [update, selectedChat]);
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box
                sx={{
                    padding: "1rem 5rem",
                    paddingTop: "12dvh",
                }}
                component="main"
                className="MainContent"
            >
                <Box className="shadow">
                    <Sheet
                        sx={{
                            flex: 1,
                            width: "100%",
                            mx: "auto",
                            display: "grid",
                            gridTemplateColumns:
                                "minmax(min-content, min(30%, 400px)) 1fr",
                        }}
                    >
                        <ChatsPane
                            selectedChatId={selectedChat}
                            setSelectedChat={setSelectedChat}
                            chats={chats}
                            setChats={setChats}
                            loading={loading}
                            error={error}
                            update={update}
                            setUpdate={setUpdate}
                        />
                        <MessagePane
                            selectedChat={
                                chats &&
                                chats.length !== 0 &&
                                chats.filter(
                                    (chat) => chat._id === selectedChat
                                )[0]
                            }
                            setSelectedChat={setSelectedChat}
                            refresh={refresh}
                            setRefresh={setRefresh}
                            update={update}
                            setUpdate={setUpdate}
                        />
                    </Sheet>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}

export default Chat;
