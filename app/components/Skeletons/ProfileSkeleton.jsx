/** @format */

import React from "react";
import { Container, Paper, Stack, Skeleton, Divider, Grid} from "@mui/material";

/**
 * A skeleton loader for a single post card.
 * This is designed to mimic the basic structure of your PostCard component.
 */
function PostCardSkeleton() {
    return (
        <Paper elevation={2} sx={{ p: 2 }}>
            <Stack spacing={2}>
                {/* User Info (Avatar + Name) */}
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Skeleton variant='circular' width={40} height={40} />
                    <Skeleton
                        variant='text'
                        width='30%'
                        sx={{ fontSize: "1rem" }}
                    />
                </Stack>

                {/* Post Content */}
                <Skeleton variant='rectangular' height={60} />
                <Skeleton variant='text' sx={{ fontSize: "1rem" }} />
                <Skeleton
                    variant='text'
                    width='80%'
                    sx={{ fontSize: "1rem" }}
                />
            </Stack>
        </Paper>
    );
}

/**
 * The main skeleton component for the entire profile page.
 * It mirrors the two-column layout: a sticky profile summary on the left
 * and a list of posts on the right.
 */
export default function ProfileSkeleton() {
    return (
        <Container maxWidth='lg'>
            <Grid container spacing={4}>
                {/* Left Column: Profile Information Skeleton */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        elevation={3}
                        sx={{ p: 3, position: "sticky", top: 100 }}>
                        <Stack spacing={2} alignItems='center'>
                            {/* Avatar Skeleton */}
                            <Skeleton
                                variant='circular'
                                sx={{
                                    width: 150,
                                    height: 150,
                                    mb: 2,
                                    border: "4px solid",
                                    // Use a neutral color for the skeleton border
                                    borderColor: (theme) =>
                                        theme.palette.divider,
                                }}
                            />

                            {/* Name Skeleton */}
                            <Skeleton
                                variant='text'
                                width='60%'
                                sx={{ fontSize: "2.5rem" }}
                            />
                            {/* Email Skeleton */}
                            <Skeleton
                                variant='text'
                                width='80%'
                                sx={{ fontSize: "1rem" }}
                            />

                            <Divider sx={{ width: "100%", my: 2 }} />

                            {/* Chips Skeleton */}
                            <Stack direction='row' spacing={2}>
                                <Skeleton
                                    variant='rounded'
                                    width={90}
                                    height={32}
                                />
                                <Skeleton
                                    variant='rounded'
                                    width={120}
                                    height={32}
                                />
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>

                {/* Right Column: Posts List Skeleton */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {/* Title Skeleton */}
                    <Skeleton
                        variant='text'
                        width={200}
                        sx={{ fontSize: "2rem", mb: 2 }}
                    />

                    <Stack spacing={4}>
                        {/* Generate 3 post card skeletons to represent a list */}
                        {Array.from(new Array(3)).map((_, index) => (
                            <PostCardSkeleton key={index} />
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}
