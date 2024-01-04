import { AspectRatio, Box } from "@mui/joy";
import React from "react";

function NotFound() {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f4f8",
                gap: 5,
            }}
        >
            <AspectRatio sx={{ width: 300 }} objectFit="contain">
                <Box
                    component="img"
                    src="https://static-00.iconduck.com/assets.00/14-location-not-found-illustration-2048x1446-fa2mbzte.png"
                    alt="404"
                />
            </AspectRatio>
            <h1>404 Page Not Found</h1>
        </Box>
    );
}

export default NotFound;
