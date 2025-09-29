/** @format */

import React from "react";
import { useCreatePost } from "../lib/hooks/usePosts";
import NewPostModal from "./Post/NewPostModal";
import { useInfinitePosts } from "../lib/hooks/usePosts";
import { useSnackbarContext } from "./Snackbar/SnackbarProvider";

export default function NewPostModalWithFeedUpdate() {
    const { mutate } = useInfinitePosts();
    const { createPost, isCreating } = useCreatePost();
    const snackbar = useSnackbarContext();

    const handleNewPost = async (data) => {
        try {
            await createPost({ postData: data });
            mutate();
            snackbar.showSnackbar("Post created successfully", "success");
        } catch (err) {
            snackbar.showSnackbar(
                err.info?.message ||
                    `Post creation failed (${err.status || "unknown"})`,
                "error"
            );
        }
    };

    return <NewPostModal onSubmit={handleNewPost} />;
}
