import React, { useRef } from "react";
import { Box, Button, FormControl, Stack, Textarea } from "@mui/joy";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

function MessageInput({ textAreaValue, setTextAreaValue, onTextSubmit }) {
    // Refference to text area to focus on text area when component mounts
    const textAreaRef = useRef(null);
    // Function to handle click on send button
    const handleClick = () => {
        if (textAreaValue.trim() !== "") {
            onTextSubmit();
            setTextAreaValue("");
        }
    };
    return (
        <Box sx={{ px: 2, pb: 3 }}>
            <FormControl>
                {/* Text Area to input messages to send */}
                <Textarea
                    placeholder="Type something here…"
                    aria-label="Message"
                    ref={textAreaRef}
                    onChange={(e) => {
                        setTextAreaValue(e.target.value);
                    }}
                    value={textAreaValue}
                    minRows={3}
                    maxRows={10}
                    endDecorator={
                        <Stack
                            alignItems="flex-end"
                            flexGrow={1}
                            sx={{
                                py: 1,
                                pr: 1,
                                borderTop: "1px solid",
                                borderColor: "divider",
                            }}
                        >
                            <Button
                                size="lg"
                                color="primary"
                                endDecorator={<SendRoundedIcon />}
                                onClick={handleClick}
                            >
                                Send
                            </Button>
                        </Stack>
                    }
                    // Handle enter key press to submit message
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            handleClick();
                        }
                    }}
                />
            </FormControl>
        </Box>
    );
}

export default MessageInput;
