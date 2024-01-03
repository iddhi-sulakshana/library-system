import {
    Avatar,
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
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import React, { useEffect, useState } from "react";
import SnackBar from "./SnackBar";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import useGetStaffDetails from "../../hooks/useGetStaffDetails";
import axios from "axios";
import { getURL } from "../../utils";

function PersonalCard() {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState({ error: false, message: "" });
    const [image, setImage] = useState(null);
    const { id, setId } = useUserContext();
    const { staffDetails } = useGetStaffDetails();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            navigate("/ssign");
            return;
        }
        if (id && staffDetails) {
            setFName(staffDetails.firstname);
            setLName(staffDetails.lastname);
            setRole(staffDetails.role);
            setEmail(staffDetails.email);
            setImage("https://robohash.org/" + staffDetails.image);
        }
    }, [id, staffDetails]);

    const handleUpdate = () => {
        axios
            .request({
                method: "PATCH",
                url: getURL("staff/personal"),
                headers: {
                    "x-auth-token": id,
                },
                data: {
                    firstname: fName,
                    lastname: lName,
                    role: role,
                    email: email,
                },
            })
            .then((res) => {
                setMessage({
                    error: false,
                    message: res?.data || "Updated Successfully",
                });
                setOpen(true);
            })
            .catch((err) => {
                setMessage({
                    error: true,
                    message: err.response?.data,
                });
                setOpen(true);
            });
    };
    const handleLogout = () => {
        setId(null);
    };

    return (
        <Card>
            <Box mb={1}>
                <Typography level="title-md">Personal Info</Typography>
            </Box>
            <Divider />
            <Stack direction="row" spacing={1}>
                <Stack
                    direction="row"
                    sx={{ display: "flex", my: 1 }}
                    spacing={3}
                >
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                        }}
                        size="lg"
                        src={image}
                        alt={fName}
                    />
                </Stack>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Stack spacing={2} pt={2}>
                        <FormControl
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                gap: 2,
                            }}
                        >
                            <FormLabel>First Name</FormLabel>
                            <Input
                                size="sm"
                                placeholder="First name"
                                value={fName}
                                onChange={(e) => setFName(e.target.value)}
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
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                size="sm"
                                placeholder="Last name"
                                value={lName}
                                onChange={(e) => setLName(e.target.value)}
                                sx={{ flexGrow: 1 }}
                            />
                        </FormControl>
                    </Stack>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
                <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Input
                        size="sm"
                        placeholder="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        size="sm"
                        type="email"
                        startDecorator={<EmailRoundedIcon />}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <Button
                        size="sm"
                        variant="outlined"
                        color="danger"
                        onClick={handleLogout}
                    >
                        Log Out
                    </Button>
                    <Button size="sm" variant="solid" onClick={handleUpdate}>
                        Update
                    </Button>
                </CardActions>
            </CardOverflow>
            <SnackBar open={open} setOpen={setOpen} message={message} />
        </Card>
    );
}

export default PersonalCard;
