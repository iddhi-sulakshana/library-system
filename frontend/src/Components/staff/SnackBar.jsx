import { Snackbar } from "@mui/joy";
import React from "react";

function SnackBar({ open, setOpen, message }) {
    return (
        <Snackbar
            color={message?.error ? "danger" : "success"}
            variant="solid"
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
        >
            {message?.message}
        </Snackbar>
    );
}

export default SnackBar;
