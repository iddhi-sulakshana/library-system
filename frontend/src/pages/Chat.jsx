import React from "react";
import "@fontsource/inter";
import { Box, CssBaseline } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import Messages from "../components/chat/Messages";

function Chat() {
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: "90dvh",
                    backgroundColor: "#00008B",
                    padding: "1rem 5rem",
                }}
                component="main"
                className="MainContent"
            >
                <Messages />
            </Box>
        </CssVarsProvider>
    );
}

export default Chat;
