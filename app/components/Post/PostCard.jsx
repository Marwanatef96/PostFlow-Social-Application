/** @format */

"use client";
import * as React from "react";
// import removed: theme from "../../../lib/theme";
import Image from "next/image";
import { useThemeMode } from "../../../lib/ThemeContext";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CommentIcon from "@mui/icons-material/Comment";
import { useState, useEffect } from "react";
import { useUser } from "../../lib/hooks/useAuth";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Link from "next/link";
import DeletePostButton from "../DeletePostButton";
import CommentSkeleton from "../Skeletons/CommentSkeleton";
const CommentSection = dynamic(() => import("./CommentSection"), {
    loading: () => <CommentSkeleton />,
    ssr: false,
});

const UpdatePostModalWithData = dynamic(
    () => import("../UpdatePostModalWithData"),
    { ssr: false }
);

function PostCard({ post, mutatePosts }) {
    const toSrc = (value) =>
        typeof value === "string" ? value : value?.url ? value.url : "";
    const IMAGE_PLACEHOLDER =
        "https://placehold.co/1200x600/1e1e1e/FFFFFF.png?text=Image+Not+Found";
    const [showComments, setShowComments] = useState(false);

    // State for the main post image
    const [imageSrc, setImageSrc] = useState(
        toSrc(post.image) || IMAGE_PLACEHOLDER
    );
    // State for the author's avatar image
    const [avatarSrc, setAvatarSrc] = useState(
        toSrc(post.author.profile_image)
    );

    useEffect(() => {
        setImageSrc(toSrc(post.image) || IMAGE_PLACEHOLDER);
        setAvatarSrc(toSrc(post.author.profile_image));
    }, [post.image, post.author.profile_image]);

    const { user } = useUser();
    const { theme } = useThemeMode();
    const isOwner =
        user &&
        post.author &&
        (user.id === post.author.id || user._id === post.author.id);

    return (
        <>
            <Card
                sx={{
                    m: 2,
                    maxWidth: "100%",
                    background: theme.palette.background.paper,
                    borderRadius: 3,
                    backdropFilter: "blur(10px)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                            : "0 8px 32px rgba(0, 0, 0, 0.08)",
                    transition: "all 0.3s ease-in-out",
                    overflow: "hidden",
                    border: `1px solid ${theme.palette.divider}`,
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow:
                            theme.palette.mode === "dark"
                                ? "0 12px 40px rgba(0, 0, 0, 0.4)"
                                : "0 12px 40px rgba(0, 0, 0, 0.12)",
                        borderColor: theme.palette.primary.main,
                    },
                }}>
                <CardHeader
                    sx={{
                        p: 3,
                        pb: 2,
                        "& .MuiCardHeader-title": {
                            fontWeight: 600,
                            fontSize: "1.1rem",
                            color: theme.palette.primary.main,
                        },
                        "& .MuiCardHeader-subheader": {
                            fontSize: "0.875rem",
                            color: theme.palette.text.secondary,
                        },
                    }}
                    avatar={
                        <Link
                            href={`/profile/${post.author.id}`}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}>
                            <Avatar // No need for next/image here for small, consistently sized avatars
                                src={avatarSrc}
                                alt={post.author.name || "Author Avatar"}
                                onError={() => {
                                    setAvatarSrc(""); // Fallback to MUI's default letter avatar
                                }}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    backgroundColor:
                                        theme.palette.primary.light,
                                    color: theme.palette.primary.contrastText,
                                    transition: "transform 0.2s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}>
                                {post.author.name.charAt(0)}
                            </Avatar>
                        </Link>
                    }
                    action={
                        isOwner && (
                            <div style={{ display: "flex", gap: 8 }}>
                                <UpdatePostModalWithData post={post} />
                                <DeletePostButton
                                    postId={post.id}
                                    mutatePosts={mutatePosts}
                                />
                            </div>
                        )
                    }
                    title={post.author.name}
                    subheader={post.created_at}
                />
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: "300px",
                        overflow: "hidden",
                        "&:hover": {
                            "& img": {
                                transform: "scale(1.05)",
                            },
                        },
                    }}>
                    <Image
                        fill
                        alt={post.title || "Post Image"}
                        src={imageSrc}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        style={{
                            objectFit: "cover",
                            transition: "transform 0.3s ease-in-out",
                        }}
                        placeholder={post.image ? "blur" : "empty"}
                        onError={() => setImageSrc(IMAGE_PLACEHOLDER)}
                        blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
                    />
                </Box>
                <CardContent sx={{ p: 3 }}>
                    <Typography
                        variant='h5'
                        component='div'
                        gutterBottom
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 700,
                            fontSize: "1.5rem",
                            mb: 2,
                            letterSpacing: "-0.01em",
                            lineHeight: 1.3,
                        }}>
                        {post.title}
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            color: theme.palette.text.primary,
                            fontSize: "1rem",
                            mb: 2,
                            lineHeight: 1.6,
                            opacity: 0.9,
                        }}>
                        {post.body}
                    </Typography>
                </CardContent>
                <CardActions
                    disableSpacing
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 3,
                        py: 2,
                        borderTop: `1px solid ${theme.palette.divider}`,
                    }}>
                    <IconButton
                        aria-label='show comments'
                        onClick={() => setShowComments((prev) => !prev)}
                        sx={{
                            color: theme.palette.primary.main,
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                                backgroundColor:
                                    theme.palette.primary.main + "20",
                                transform: "scale(1.1)",
                            },
                        }}>
                        <CommentIcon />
                    </IconButton>
                    <Typography
                        variant='body2'
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 500,
                        }}>
                        {post?.comments_count}
                    </Typography>
                </CardActions>
                <Collapse in={showComments} timeout='auto' unmountOnExit>
                    <CardContent
                        sx={{
                            background:
                                theme.palette.mode === "dark"
                                    ? theme.palette.background.default
                                    : theme.palette.grey[50],
                            borderTop: `1px solid ${theme.palette.divider}`,
                            p: 3,
                            transition: "all 0.3s ease-in-out",
                        }}>
                        {showComments && <CommentSection postId={post.id} />}
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
}

export default PostCard;
