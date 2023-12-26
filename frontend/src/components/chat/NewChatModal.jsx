import {
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemButton,
    ListItemContent,
    ListItemDecorator,
    Modal,
    ModalClose,
    ModalDialog,
    Typography,
} from "@mui/joy";
import React, { Fragment, useEffect, useState } from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import AvatarWithStatus from "./AvatarWithStatus";
import { useUserContext } from "../../contexts/UserContext";
import { getSocket } from "../../hooks/chatSocket";

function NewChatModal({ open, setOpen, setSelectedChat }) {
    const { id } = useUserContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // get all the users from the socket
    useEffect(() => {
        if (!open || !id) return;
        setLoading(true);
        setError(null);
        const socket = getSocket();

        if (!socket) {
            setError(true);
            setLoading(false);
            return;
        }
        if (!socket.connected) {
            setError(true);
            setLoading(false);
            return;
        }
        socket.emit("users");
        socket.on("get_users", (data) => {
            setUsers(data);
            setLoading(false);
        });
    }, [open]);

    if (!id) {
        return <Fragment></Fragment>;
    }

    const onClickUser = async (participant) => {
        setOpen(false);
        // set new chat using socket
        const socket = getSocket();
        socket.emit("new_chat", participant);
        setSelectedChat(participant);
    };
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog size="md">
                <ModalClose />
                <DialogTitle>New chat with user</DialogTitle>
                <DialogContent>
                    {loading && <Typography>Loading users...</Typography>}
                    {error && <Typography>Error loading users...</Typography>}
                    {!loading && !error && users.length === 0 && (
                        <Typography>No users found...</Typography>
                    )}
                    <List>
                        {!loading &&
                            !error &&
                            users.length !== 0 &&
                            users.map((user) => (
                                <ListItem key={user._id}>
                                    <ListItemButton
                                        onClick={() => onClickUser(user._id)}
                                    >
                                        <ListItemDecorator sx={{ pr: 2 }}>
                                            <AvatarWithStatus
                                                src={user.avatar}
                                            />
                                        </ListItemDecorator>
                                        <ListItemContent>
                                            {user.name}
                                        </ListItemContent>
                                        <KeyboardArrowRightRoundedIcon />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                    </List>
                </DialogContent>
            </ModalDialog>
        </Modal>
    );
}

export default NewChatModal;
