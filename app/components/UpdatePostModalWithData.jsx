/** @format */

import React, { useState } from "react";
import NewPostModal from "./Post/NewPostModal";
import { useUpdatePost, useInfinitePosts } from "../lib/hooks/usePosts";
import { useSnackbarContext } from "./Snackbar/SnackbarProvider";
import Button from "@mui/material/Button";
export default function UpdatePostModalWithData({ post, onUpdated }) {
    const [open, setOpen] = useState(false);
    const { updatePost, isUpdating } = useUpdatePost(post.id);
    const { mutate } = useInfinitePosts();
    const snackbar = useSnackbarContext();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleUpdate = async (data) => {
        try {
            await updatePost({ postData: data });
            setOpen(false);
            mutate();
            if (onUpdated) onUpdated();
            snackbar.showSnackbar("Post updated successfully", "success");
        } catch (err) {
            snackbar.showSnackbar(
                err.info?.message ||
                    `Update failed (${err.status || "unknown"})`,
                "error"
            );
        }
    };

    return (
        <>
            <Button variant='outlined' onClick={handleOpen} size='small'>
                Update
            </Button>
            {open && (
                <NewPostModal
                    onSubmit={handleUpdate}
                    initialData={{
                        title: post.title,
                        body: post.body,
                        image: post.image,
                    }}
                    openOverride={open}
                    onCloseOverride={handleClose}
                    isUpdating={isUpdating}
                />
            )}
        </>
    );
}
