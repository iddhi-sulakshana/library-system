import {
    Box,
    Button,
    Card,
    CardActions,
    CardOverflow,
    Divider,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Typography,
} from "@mui/joy";
import React, { useState } from "react";
import SnackBar from "./SnackBar";
import axios from "axios";
import { getURL } from "../../utils";
import { useUserContext } from "../../contexts/UserContext";

function PasswordCard() {
    const [cPassword, setCPassword] = useState("");
    const [nPassword, setNPassword] = useState("");
    const [rnPassword, setRNPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState({ error: false, message: "" });
    const { id } = useUserContext();

    const handleUpdate = () => {
        if (nPassword !== rnPassword) {
            setMessage({ error: true, message: "Passwords do not match" });
            setOpen(true);
            return;
        }
        axios
            .request({
                method: "PATCH",
                url: getURL("staff/password"),
                headers: {
                    "x-auth-token": id,
                },
                data: {
                    currentPassword: cPassword,
                    password: nPassword,
                },
            })
            .then((res) => {
                setCPassword("");
                setNPassword("");
                setRNPassword("");
                setMessage({ error: false, message: res.data });
                setOpen(true);
            })
            .catch((err) => {
                setMessage({ error: true, message: err.response.data });
                setOpen(true);
            });
    };
    return (
        <Card>
            <Box mb={1}>
                <Typography level="title-md">Change Password</Typography>
            </Box>
            <Divider />
            <Stack spacing={3} pt={3}>
                <FormControl
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <FormLabel>Current Password</FormLabel>
                    <Input
                        size="sm"
                        type="password"
                        placeholder="Current password"
                        value={cPassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                </FormControl>
                <FormControl
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <FormLabel>New Password</FormLabel>
                    <Input
                        size="sm"
                        type="password"
                        placeholder="New password"
                        value={nPassword}
                        onChange={(e) => setNPassword(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                </FormControl>
                <FormControl
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 2,
                    }}
                >
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        size="sm"
                        type="password"
                        placeholder="Confirm password"
                        value={rnPassword}
                        onChange={(e) => setRNPassword(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                </FormControl>
            </Stack>
            <CardOverflow
                sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                }}
            >
                <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                    <Button size="sm" variant="solid" onClick={handleUpdate}>
                        Update
                    </Button>
                </CardActions>
            </CardOverflow>
            <SnackBar open={open} setOpen={setOpen} message={message} />
        </Card>
    );
}

export default PasswordCard;
