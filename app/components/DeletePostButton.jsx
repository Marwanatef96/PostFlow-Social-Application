/** @format */

import React, { useState } from "react";
import { useDeletePost } from "../lib/hooks/usePosts";
import DeletePostConfirmModal from "./DeletePostConfirmModal";
import Button from "@mui/material/Button";
import { useSnackbarContext } from "./Snackbar/SnackbarProvider";

export default function DeletePostButton({ postId, mutatePosts }) {
    const [open, setOpen] = useState(false);
    const { deletePost, isDeleting } = useDeletePost();
    const snackbar = useSnackbarContext();

    const handleDelete = async () => {
        try {
            await deletePost({ postId });
            setOpen(false);
            if (mutatePosts) {
                setTimeout(() => mutatePosts(), 200);
            }
            snackbar.showSnackbar("Post deleted successfully", "success");
        } catch (err) {
            snackbar.showSnackbar(
                err.info?.message ||
                    `Delete failed (${err.status || "unknown"})`,
                "error"
            );
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                color='error'
                variant='text'
                sx={{ ml: 1 }}>
                Delete
            </Button>
            <DeletePostConfirmModal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDelete}
                loading={isDeleting}
            />
        </>
    );
}
