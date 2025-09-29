/** @format */

"use client";

import * as React from "react";
// import removed: lightTheme from "../../../lib/theme";
import { useThemeMode } from "../../../lib/ThemeContext";
import Box from "@mui/material/Box";
import CommentSkeleton from "../Skeletons/CommentSkeleton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useCreateComment } from "../../lib/hooks/useComments";
import { usePost } from "../../lib/hooks/usePosts";
import { useAuth, getToken } from "../../lib/hooks/useAuth";
import { mutate } from "swr";
import { useSnackbarContext } from "../Snackbar/SnackbarProvider";

function CommentSection({ postId }) {
    const toSrc = (value) =>
        typeof value === "string" ? value : value?.url ? value.url : "";
    const { theme } = useThemeMode();
    const { user } = useAuth();
    const { post, postError, isPostLoading } = usePost(postId);
    const { createComment, isCreating } = useCreateComment(postId);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const snackbar = useSnackbarContext();
    const reversedComments = React.useMemo(
        () => post?.comments?.slice().reverse() ?? [],
        [post?.comments]
    );
    // Handle comment input change
    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // Handle comment submit
    const handleSubmit = async () => {
        if (!newComment.trim()) return;
        setIsLoading(true);
        setError(null);
        try {
            const token = getToken();
            await createComment({ commentBody: newComment, token });
            setNewComment("");
            mutate(`/api/posts/${postId}`); // Refresh post data
            snackbar.showSnackbar("Comment posted", "success");
        } catch (err) {
            const errorMessage = err.info?.message || "Failed to post comment.";
            setError(errorMessage);
            snackbar.showSnackbar(errorMessage, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        // Submit on Enter, but allow new lines with Shift+Enter
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents adding a new line
            handleSubmit();
        }
    };

    if (isPostLoading) {
        return (
            <Box sx={{ p: 2 }}>
                <List>
                    {[...Array(2)].map((_, i) => (
                        <CommentSkeleton key={i} />
                    ))}
                </List>
            </Box>
        );
    }
    if (postError) {
        return (
            <Box sx={{ p: 2 }}>
                <Typography sx={{ color: "error.main" }}>
                    Error loading comments.
                </Typography>
            </Box>
        );
    }


    return (
        <Box
            sx={{
                bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                        ? "rgba(30, 41, 59, 0.6)"
                        : "rgba(241, 245, 249, 0.6)",
                borderRadius: 3,
                overflow: "hidden",
            }}>
            {post?.comments?.length === 0 ? (
                <Box
                    sx={{
                        p: 4,
                        textAlign: "center",
                        color: "text.secondary",
                    }}>
                    <Typography
                        variant='body1'
                        sx={{
                            fontSize: "1rem",
                            fontWeight: 500,
                            opacity: 0.8,
                        }}>
                        No comments yet. Be the first to share your thoughts!
                    </Typography>
                </Box>
            ) : (
                <List
                    sx={{
                        maxHeight: "240px",
                        overflowY: "auto",
                        width: "100%",
                        p: 0,
                    }}>
                    {reversedComments.map((comment, index) => (
                        <React.Fragment key={comment.id}>
                            <ListItem
                                alignItems='flex-start'
                                sx={{
                                    p: 3,
                                    transition: "background-color 0.2s ease",
                                    "&:hover": {
                                        bgcolor: (theme) =>
                                            theme.palette.mode === "dark"
                                                ? "rgba(148, 163, 184, 0.1)"
                                                : "rgba(241, 245, 249, 0.8)",
                                    },
                                }}>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={comment.author.username}
                                        src={toSrc(
                                            comment.author.profile_image
                                        )}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            border: (theme) =>
                                                `2px solid ${theme.palette.primary.main}`,
                                            bgcolor: (theme) =>
                                                theme.palette.primary.main +
                                                "20",
                                        }}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography
                                            component='span'
                                            variant='subtitle1'
                                            sx={{
                                                fontWeight: 600,
                                                color: (theme) =>
                                                    theme.palette.primary.main,
                                                mb: 0.5,
                                                display: "block",
                                            }}>
                                            {comment.author.username}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            component='p'
                                            variant='body2'
                                            sx={{
                                                color: (theme) =>
                                                    theme.palette.text.primary,
                                                fontSize: "0.95rem",
                                                lineHeight: 1.6,
                                            }}>
                                            {comment.body}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {index < reversedComments.length - 1 && (
                                <Divider sx={{ opacity: 0.6 }} />
                            )}
                        </React.Fragment>
                    ))}
                </List>
            )}

            {user && (
                <Box
                    sx={{
                        p: 3,
                        display: "flex",
                        gap: 2,
                        borderTop: (theme) =>
                            `1px solid ${theme.palette.divider}`,
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "rgba(30, 41, 59, 0.4)"
                                : "rgba(255, 255, 255, 0.4)",
                    }}>
                    <TextField
                        value={newComment}
                        onKeyDown={handleKeyDown}
                        onChange={handleNewCommentChange}
                        fullWidth
                        variant='outlined'
                        placeholder='Add your thoughts...'
                        disabled={isLoading || isCreating}
                        multiline
                        rows={1}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                bgcolor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "rgba(148, 163, 184, 0.1)"
                                        : "rgba(255, 255, 255, 0.8)",
                                "&:hover": {
                                    "& > fieldset": {
                                        borderColor: (theme) =>
                                            theme.palette.primary.main,
                                    },
                                },
                            },
                        }}
                    />
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || isCreating || !newComment.trim()}
                        variant='contained'
                        sx={{
                            px: 3,
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: "none",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                transform: "translateY(-2px)",
                            },
                        }}>
                        {isLoading || isCreating ? "Posting..." : "Post"}
                    </Button>
                </Box>
            )}

            {error && (
                <Box
                    sx={{
                        p: 3,
                        bgcolor: (theme) => theme.palette.error.main + "10",
                    }}>
                    <Typography
                        sx={{
                            color: "error.main",
                            fontSize: "0.875rem",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}>
                        {error}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export default CommentSection;
