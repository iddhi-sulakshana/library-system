import GoogleIcon from "@mui/icons-material/Google";
import {
    Box,
    Button,
    CssBaseline,
    Divider,
    Input,
    Typography,
    Stack,
    FormControl,
    FormLabel,
    Checkbox,
} from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getURL } from "../utils";
import SnackBar from "../components/staff/SnackBar";
import { useUserContext } from "../contexts/UserContext";

function StaffSignIn() {
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState({ error: false, message: "" });
    const { setId, id } = useUserContext();
    useEffect(() => {
        if (id) {
            navigate("/sdash");
        }
    }, [id, navigate]);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .request({
                method: "POST",
                url: getURL("staff/login"),
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    email,
                    password,
                },
            })
            .then((res) => {
                localStorage.setItem("id", res.headers["x-auth-token"]);
                setMessage({
                    error: false,
                    message: res.data + ", Redirecting...",
                });
                setOpen(true);
                setId(res.headers["x-auth-token"]);
                setTimeout(() => {
                    navigate("/sdash");
                }, 500);
            })
            .catch((err) => {
                setMessage({ error: true, message: err.response.data });
                setOpen(true);
            });

        // navigate("/sdash");
    };
    return (
        <CssVarsProvider>
            <CssBaseline />
            <Box
                sx={{
                    width: "100vw",
                    backgroundColor: "rgba(255 255 255 / 0.2)",
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    backdropFilter: "blur(10px)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "90dvh",
                        width: "100vw",
                        maxWidth: "100%",
                        px: 2,
                    }}
                >
                    <Box
                        component="main"
                        sx={{
                            my: "auto",
                            py: 2,
                            pb: 5,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            width: 400,
                            maxWidth: "100%",
                            mx: "auto",
                            borderRadius: "sm",
                            "& form": {
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            },
                        }}
                    >
                        <Stack gap={2} alignItems="center">
                            <Typography level="h3">Sign In</Typography>
                            <Button
                                variant="soft"
                                color="neutral"
                                fullWidth
                                disabled
                                startDecorator={<GoogleIcon />}
                            >
                                Continue with Google ID
                            </Button>
                        </Stack>
                        <Divider
                            sx={{
                                color: "#fff",
                                "--Divider-lineColor": "#fff",
                            }}
                        >
                            or
                        </Divider>
                        <Stack gap={4} sx={{ mt: 2 }}>
                            <form onSubmit={handleSubmit}>
                                <FormControl required>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormControl required>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <Stack gap={2} sx={{ mt: 2 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Checkbox
                                            size="sm"
                                            label="Remember me"
                                            name="presistent"
                                            checked={checked}
                                            onChange={(e) =>
                                                setChecked(e.target.checked)
                                            }
                                        />
                                        <Link level="title-sm" href="/forgot">
                                            Forgot password?
                                        </Link>
                                    </Box>
                                    <Button type="submit" fullWidth>
                                        Sign In
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                </Box>
                <Divider
                    sx={{
                        color: "#fff",
                        "--Divider-lineColor": "#fff",
                        // divider width
                        width: 2,
                    }}
                    orientation="vertical"
                />
            </Box>
            <Box
                sx={{
                    height: "95dvh",
                    position: "absolute",
                    right: 0,
                    top: "5dvh",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "background.level1",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    zIndex: 0,
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
                }}
            ></Box>
            <SnackBar open={open} setOpen={setOpen} message={message} />
        </CssVarsProvider>
    );
}

export default StaffSignIn;
