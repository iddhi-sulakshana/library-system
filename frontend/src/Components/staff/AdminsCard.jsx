import {
    Box,
    Button,
    Card,
    CardActions,
    CardOverflow,
    Divider,
    Stack,
    Typography,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import NewAdminModal from "./NewAdminModal";
import SnackBar from "./SnackBar";
import useGetStaffs from "../../hooks/useGetStaffs";
import staff from "../../../../backend/models/schemas/staff";
import axios from "axios";
import { getURL } from "../../utils";
import { useUserContext } from "../../contexts/UserContext";

function AdminsCard() {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState({ error: false, message: "" });

    const { staffs, error, loading, refresh, setRefresh } = useGetStaffs();
    const { id } = useUserContext();

    useEffect(() => {
        if (error) {
            setMessage({
                error: true,
                message: "Unable to fetch staffs",
            });
            setAlert(true);
        }
    }, [error]);

    const handleDelete = (deleteId) => {
        axios
            .request({
                method: "DELETE",
                url: getURL(`staff/${deleteId}`),
                headers: {
                    "x-auth-token": id,
                },
            })
            .then((res) => {
                setMessage({
                    error: false,
                    message: "Staff deleted successfully",
                });
                setAlert(true);
                setRefresh(!refresh);
            })
            .catch((err) => {
                setMessage({
                    error: true,
                    message: err.response.data,
                });
                setAlert(true);
            });
    };
    return (
        <Card>
            <Box mb={1}>
                <Typography level="title-md">Admin Accounts</Typography>
            </Box>
            <Divider />
            <Stack spacing={1} my={1}>
                {loading ? (
                    <Typography level="body-md" color="textSecondary">
                        Loading...
                    </Typography>
                ) : error ? (
                    <Typography level="body-md" color="textSecondary">
                        Unable to fetch staffs
                    </Typography>
                ) : staffs.length === 0 ? (
                    <Typography level="body-md" color="textSecondary">
                        No staffs found
                    </Typography>
                ) : (
                    staffs.map((staff) => (
                        <AdminCard
                            key={staff._id}
                            staff={staff}
                            handleDelete={handleDelete}
                        />
                    ))
                )}
            </Stack>
            <CardOverflow
                sx={{ borderTop: "1px solid", borderColor: "divider" }}
            >
                <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                    <Button
                        size="sm"
                        variant="solid"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        New Account
                    </Button>
                </CardActions>
            </CardOverflow>
            <NewAdminModal
                open={open}
                setOpen={setOpen}
                setSnackOpen={setAlert}
                setMessage={setMessage}
                refresh={refresh}
                setRefresh={setRefresh}
            />
            <SnackBar open={alert} setOpen={setAlert} message={message} />
        </Card>
    );
}

export default AdminsCard;
