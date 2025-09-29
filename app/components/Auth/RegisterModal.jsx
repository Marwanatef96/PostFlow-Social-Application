/** @format */

import * as React from "react";
import { useForm } from "react-hook-form";
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
    Avatar,
} from "@mui/material";
import { useAuth } from "../../lib/hooks/useAuth";
export default function RegisterModal({ children }) {
    const { register: registerUser, isRegistering } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [photoPreview, setPhotoPreview] = React.useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm();

    const photo = watch("photo");

    React.useEffect(() => {
        if (photo && photo.length && photo[0]) {
            const file = photo[0];
            setPhotoPreview(URL.createObjectURL(file));
        } else {
            setPhotoPreview(null);
        }
    }, [photo]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setError(null);
        setPhotoPreview(null);
        reset();
    };

    const onSubmit = async (data) => {
        setError(null);
        try {
            await registerUser({
                username: data.username,
                name: data.name,
                email: data.email,
                password: data.password,
                avatarFile: data.photo[0],
            });
            handleClose();
        } catch (err) {
            setError(err.info?.message || "An unexpected error occurred.");
        }
    };
    const trigger = React.cloneElement(children, {
        onClick: handleClickOpen,
    });
    return (
        <React.Fragment>
            {trigger}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Register</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Please fill out all fields to create your account.
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
                            disabled={isRegistering}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />
                        <TextField
                            margin='dense'
                            label='Name'
                            type='text'
                            fullWidth
                            variant='standard'
                            {...register("name", {
                                required: "Name is required",
                            })}
                            disabled={isRegistering}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            margin='dense'
                            label='Email'
                            type='email'
                            fullWidth
                            variant='standard'
                            {...register("email", {
                                required: "Email is required",
                            })}
                            disabled={isRegistering}
                            error={!!errors.email}
                            helperText={errors.email?.message}
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
                            disabled={isRegistering}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Button
                            variant='contained'
                            component='label'
                            sx={{ mt: 2 }}
                            disabled={isRegistering}>
                            Upload Photo
                            <input
                                type='file'
                                hidden
                                accept='image/*'
                                onChange={(e) => {
                                    setValue("photo", e.target.files, {
                                        shouldValidate: true,
                                    });
                                }}
                            />
                        </Button>
                        {/* Register photo for validation only */}
                        <input
                            type='hidden'
                            {...register("photo", {
                                required: "Photo is required",
                            })}
                        />
                        {photoPreview && (
                            <Avatar
                                src={photoPreview}
                                sx={{ mt: 2, width: 56, height: 56 }}
                            />
                        )}
                        {errors.photo && (
                            <Typography color='error' sx={{ mt: 1 }}>
                                {errors.photo.message}
                            </Typography>
                        )}
                        {error && (
                            <Typography color='error' sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <DialogActions sx={{ px: 0 }}>
                            <Button
                                onClick={handleClose}
                                disabled={isRegistering}>
                                Cancel
                            </Button>
                            <Button type='submit' disabled={isRegistering}>
                                {isRegistering ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Register"
                                )}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
