import React from "react";
import { Badge, Avatar } from "@mui/joy";

function AvatarWithStatus({ online = false, ...other }) {
    return (
        <div>
            <Badge
                color={online ? "success" : "warning"}
                variant={online ? "solid" : "soft"}
                size="sm"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeInset="4px 4px"
            >
                <Avatar size="sm" {...other} />
            </Badge>
        </div>
    );
}

export default AvatarWithStatus;
