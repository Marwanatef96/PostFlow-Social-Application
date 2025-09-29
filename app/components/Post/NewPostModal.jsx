/** @format */

"use client";
import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

function NewPostModal({
    onSubmit,
    initialData = {},
    openOverride,
    onCloseOverride,
    isUpdating,
}) {
    const [open, setOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(initialData.image || "");
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: initialData.title || "",
            body: initialData.body || "",
        },
    });

    React.useEffect(() => {
        if (initialData.image) setImagePreview(initialData.image);
    }, [initialData.image]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if (onCloseOverride) onCloseOverride();
        setOpen(false);
        setImageFile(null);
        setImagePreview(initialData.image || "");
        reset({ title: initialData.title || "", body: initialData.body || "" });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const submitForm = async (data) => {
        const submitData = { ...data };
        if (imageFile) {
            submitData.imageFile = imageFile;
        }
        if (onSubmit) await onSubmit(submitData);
        handleClose();
    };

    const isOpen = openOverride !== undefined ? openOverride : open;

    return (
        <>
            {openOverride === undefined && (
                <Fab
                    color='primary'
                    aria-label='add'
                    onClick={handleOpen}
                    sx={{
                        position: "fixed",
                        bottom: 32,
                        right: 32,
                        zIndex: 1300,
                    }}>
                    <AddIcon />
                </Fab>
            )}
            <Dialog open={isOpen} onClose={handleClose} maxWidth='sm' fullWidth>
                <DialogTitle>
                    {isUpdating ? "Update Post" : "New Post"}
                </DialogTitle>
                <Box component='form' onSubmit={handleSubmit(submitForm)}>
                    <DialogContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}>
                        <TextField
                            label='Title'
                            fullWidth
                            {...register("title", {
                                required: "Title is required",
                            })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                        <TextField
                            label='Body'
                            fullWidth
                            multiline
                            minRows={3}
                            {...register("body", {
                                required: "Body is required",
                            })}
                            error={!!errors.body}
                            helperText={errors.body?.message}
                        />
                        <Button
                            variant='outlined'
                            component='label'
                            startIcon={<PhotoCamera />}>
                            {isUpdating ? "Change Image" : "Add Image"}
                            <input
                                type='file'
                                accept='image/*'
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                        {imagePreview && (
                            <Avatar
                                src={imagePreview}
                                alt='Preview'
                                variant='rounded'
                                sx={{
                                    width: 120,
                                    height: 120,
                                    alignSelf: "center",
                                    mt: 1,
                                }}
                            />
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='secondary'>
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            variant='contained'
                            disabled={isSubmitting || isUpdating}
                            startIcon={
                                isSubmitting || isUpdating ? (
                                    <CircularProgress
                                        size={20}
                                        color='inherit'
                                    />
                                ) : null
                            }>
                            {isSubmitting || isUpdating
                                ? isUpdating
                                    ? "Updating..."
                                    : "Posting..."
                                : isUpdating
                                ? "Update"
                                : "Post"}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
}

export default NewPostModal;
