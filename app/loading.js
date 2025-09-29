/** @format */
"use client";

import React from "react";
import { Paper, Stack, Skeleton } from "@mui/material";

/**
 * A reusable skeleton loader for a single post.
 * It mimics the structure of a post with an avatar, name, and content lines.
 */
function PostSkeleton() {
    return (
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <Stack spacing={2}>
                {/* User Info Section */}
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Skeleton variant='circular' width={40} height={40} />
                    <Skeleton
                        variant='text'
                        width='40%'
                        sx={{ fontSize: "1rem" }}
                    />
                </Stack>

                {/* Content Section */}
                <Skeleton variant='rectangular' height={80} />
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
 * The main loading component for a list of posts.
 * Next.js will automatically use this file as the loading UI for this route segment.
 */
export default function Loading() {
    return (
        <Stack spacing={4}>
            {/* Create an array of 3 skeletons to represent the list loading */}
            {Array.from(new Array(3)).map((_, index) => (
                <PostSkeleton key={index} />
            ))}
        </Stack>
    );
}
