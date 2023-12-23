import {
    Avatar,
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
    Sheet,
    Skeleton,
    Typography,
} from "@mui/joy";
import React from "react";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import useGetUsers from "../../hooks/useGetUsers";
import AvatarWithStatus from "./AvatarWithStatus";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContext";
import { getURL } from "../../utils";

function NewChatModal({ open, setOpen, setSelectedChat, refresh, setRefresh }) {
    const { id } = useUserContext();
    const { users, loading, error } = useGetUsers(refresh);
    const onClickUser = async (participant) => {
        axios
            .request({
                method: "POST",
                url: getURL("chat/new"),
                headers: {
                    user: id,
                },
                data: {
                    participant,
                },
            })
            .then(() => {
                setOpen(false);
                setRefresh(!refresh);
                setSelectedChat(participant);
            })
            .catch((err) => {
                console.error(err);
                setRefresh(!refresh);
            });
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
                                                online={user.online}
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
