import {
    Avatar,
    Button,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalDialog,
    Stack,
    Typography,
} from "@mui/joy";
import axios from "axios";
import React, { useState } from "react";
import { getURL } from "../../utils";
import { useUserContext } from "../../contexts/UserContext";

function NewAdminModal({
    open,
    setOpen,
    setSnackOpen,
    setMessage,
    refresh,
    setRefresh,
}) {
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    const { id } = useUserContext();
    const handleAdd = (e) => {
        e.preventDefault();
        axios
            .request({
                method: "POST",
                url: getURL("staff"),
                headers: {
                    "x-auth-token": id,
                },
                data: {
                    firstname: fName,
                    lastname: lName,
                    email,
                    password,
                    role,
                    image: image.toString(),
                },
            })
            .then((res) => {
                // clear the form
                setFName("");
                setLName("");
                setEmail("");
                setRole("");
                setPassword("");
                setMessage({
                    error: false,
                    message: "Staff added successfully",
                });
                setSnackOpen(true);
                setOpen(false);
                setRefresh(!refresh);
            })
            .catch((err) => {
                setMessage({
                    error: true,
                    message: err.response.data,
                });
                setSnackOpen(true);
            });
    };

    const [image, setImage] = useState(Math.random());
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog variant="outlined">
                <DialogTitle>
                    <Stack
                        display="flex"
                        direction="row"
                        spacing={5}
                        alignItems="center"
                    >
                        <Typography level="title-lg">New Admin</Typography>
                        <Avatar
                            size="lg"
                            src={"https://robohash.org/" + image}
                        />
                        <Button
                            variant="outlined"
                            color="neutral"
                            size="sm"
                            onClick={() => setImage(Math.random())}
                        >
                            change
                        </Button>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    Fill in the information of the Admin.
                </DialogContent>
                <form onSubmit={handleAdd}>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <FormControl>
                                <FormLabel>First Name</FormLabel>
                                <Input
                                    autoFocus
                                    placeholder="First Name"
                                    value={fName}
                                    onChange={(e) => setFName(e.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Last Name</FormLabel>
                                <Input
                                    placeholder="Last Name"
                                    required
                                    value={lName}
                                    onChange={(e) => setLName(e.target.value)}
                                />
                            </FormControl>
                        </Stack>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                placeholder="Email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input
                                placeholder="Role"
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FormControl>
                        <Button type="submit">Create Account</Button>
                    </Stack>
                </form>
            </ModalDialog>
        </Modal>
    );
}

export default NewAdminModal;
