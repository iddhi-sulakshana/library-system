import React from "react";
import { Badge, Avatar } from "@mui/joy";

function AvatarWithStatus({ online = false, src, ...other }) {
    return (
        <div>
            <Badge
                color={online ? "success" : "warning"}
                variant={online ? "solid" : "soft"}
                size="sm"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeInset="4px 4px"
            >
                <Avatar
                    size="sm"
                    src={`https://robohash.org/${src}`}
                    {...other}
                />
            </Badge>
        </div>
    );
}

export default AvatarWithStatus;
