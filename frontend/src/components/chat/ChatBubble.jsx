import { Box, Sheet, Stack, Typography } from "@mui/joy";
import React, { useState } from "react";
import { formatTimestamp } from "../../utils";

function ChatBubble({ message, variant, timestamp, sender }) {
    const isSent = variant === "sent";

    return (
        <Box sx={{ maxWidth: "60%", minWidth: "auto" }}>
            <Stack
                direction="row"
                justifyContent={sender === "You" ? "flex-end" : "flex-start"}
                spacing={2}
                sx={{ mb: 0.25 }}
            >
                <Typography level="body-xs">
                    {sender === "You" ? "" : sender.split(" ")[0]}
                </Typography>
                <Typography level="body-xs">
                    {formatTimestamp(timestamp)}
                </Typography>
            </Stack>
            <Box sx={{ position: "relative" }}>
                <Sheet
                    color={isSent ? "primary" : "neutral"}
                    variant={isSent ? "solid" : "soft"}
                    sx={{
                        p: 1.25,
                        borderRadius: "lg",
                        borderTopRightRadius: isSent ? 0 : "lg",
                        borderTopLeftRadius: isSent ? "lg" : 0,
                        backgroundColor: isSent
                            ? "var(--joy-palette-primary-solidBg)"
                            : "background.body",
                    }}
                >
                    <Typography
                        level="body-sm"
                        sx={{
                            color: isSent
                                ? "var(--joy-palette-common-white)"
                                : "var(--joy-palette-text-primary)",
                        }}
                    >
                        {message}
                    </Typography>
                </Sheet>
            </Box>
        </Box>
    );
}

export default ChatBubble;
