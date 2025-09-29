/** @format */

"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../lib/hooks/useAuth";
import {
    Button,
    TextField,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CircularProgress,
} from "@mui/material";
import { useSnackbarContext } from "../Snackbar/SnackbarProvider";

export default function LoginModal({ children }) {
    const { login, isLoggingIn } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(null);
    const snackbar = useSnackbarContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            username: "zxczxc",
            password: "zxczxc",
        },
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError(null);
        reset();
    };

    const onSubmit = async (data) => {
        setError(null);
        try {
            await login({ username: data.username, password: data.password });
            snackbar.showSnackbar("Login succeeded", "success");
            handleClose();
        } catch (err) {
            console.log("Login error:", err); // For debugging
            const errorMessage =
                err.info?.message ||
                (err.info?.errors?.email && err.info.errors.email[0]) ||
                "An unexpected error occurred";
            setError(errorMessage);
            snackbar.showSnackbar(errorMessage, "error");
        }
    };
    const trigger = React.cloneElement(children, {
        onClick: handleClickOpen,
    });

    return (
        <React.Fragment>
            {trigger}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        To access your account, please enter your username and
                        password.
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            autoFocus
                            margin='dense'
                            label='Username'
                            type='text'
                            fullWidth
                            variant='standard'
                            {...register("username", {
                                required: "Username is required",
                            })}
                            disabled={isLoggingIn}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />
                        <TextField
                            margin='dense'
                            label='Password'
                            type='password'
                            fullWidth
                            variant='standard'
                            {...register("password", {
                                required: "Password is required",
                            })}
                            disabled={isLoggingIn}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        {error && (
                            <Typography color='error' sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <DialogActions sx={{ px: 0 }}>
                            <Button
                                onClick={handleClose}
                                disabled={isLoggingIn}>
                                Cancel
                            </Button>
                            <Button type='submit' disabled={isLoggingIn}>
                                {isLoggingIn ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
