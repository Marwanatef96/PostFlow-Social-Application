/** @format */

"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import PostCard from "../../components/Post/PostCard";
import CommentIcon from "@mui/icons-material/Comment";
import ArticleIcon from "@mui/icons-material/Article";
import { useUser, useUserPosts } from "../../lib/hooks/useUser";
import { useParams } from "next/navigation";
import ProfileSkeleton from "../../components/Skeletons/ProfileSkeleton";
import PostListSkeleton from "../../components/Skeletons/PostListSkeleton";
export default function ProfilePage({ params }) {
    const toSrc = (value) =>
        typeof value === "string" ? value : value?.url ? value.url : "";
    const { id } = React.use(params);
    const { user, userError, isUserLoading } = useUser(id);
    const { posts, postsError, arePostsLoading, mutate } = useUserPosts(id);

    if (isUserLoading || arePostsLoading) {
        return <ProfileSkeleton />;
    }

    if (userError || postsError) {
        return <div>Error loading profile.</div>;
    }

    if (!user) {
        return <div>No user data found for this profile.</div>;
    }

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        elevation={3}
                        sx={{ p: 3, position: "sticky", top: 100 }}>
                        <Stack spacing={2} alignItems='center'>
                            <Avatar
                                alt={user?.name || user?.username}
                                src={toSrc(user?.profile_image)}
                                sx={{
                                    width: 150,
                                    height: 150,
                                    mb: 2,
                                    border: "4px solid",
                                    borderColor: "primary.main",
                                }}
                            />
                            <Typography variant='h4' component='h1'>
                                {user?.name || user?.username}
                            </Typography>
                            <Typography variant='body1' color='text.secondary'>
                                {user?.email}
                            </Typography>
                            <Divider sx={{ width: "100%", my: 2 }} />
                            <Stack direction='row' spacing={2}>
                                <Chip
                                    icon={<ArticleIcon />}
                                    label={`${
                                        Array.isArray(posts) ? posts.length : 0
                                    } Posts`}
                                />
                                <Chip
                                    icon={<CommentIcon />}
                                    label={`${
                                        user?.comments_count || 0
                                    } Comments`}
                                />
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Typography variant='h5' component='h2' gutterBottom>
                        Your Posts
                    </Typography>
                    <Stack spacing={4}>
                        {Array.isArray(posts) && posts.length > 0 ? (
                            posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    mutatePosts={mutate}
                                />
                            ))
                        ) : (
                            <Paper sx={{ p: 4, textAlign: "center" }}>
                                <Typography variant='h6' color='text.secondary'>
                                    You haven't posted anything yet.
                                </Typography>
                            </Paper>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}
