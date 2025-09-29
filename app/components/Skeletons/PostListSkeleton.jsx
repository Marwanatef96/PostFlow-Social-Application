/** @format */

"use client";

import * as React from "react";
import { useThemeMode } from "../../../lib/ThemeContext";
import NoSsr from "@mui/material/NoSsr";
import Stack from "@mui/material/Stack";
import PostSkeleton from "./PostSkeleton";

export default function PostListSkeleton() {
    const { theme } = useThemeMode();
    return (
        <Stack spacing={theme.spacing(4)}>
            <NoSsr
                fallback={<div style={{ height: 380 }} className='skeleton' />}>
                <PostSkeleton
                    style={{
                        marginBottom: theme.spacing(3),
                        borderRadius: "var(--border-radius)",
                    }}
                />
            </NoSsr>
            <NoSsr
                fallback={<div style={{ height: 380 }} className='skeleton' />}>
                <PostSkeleton
                    style={{
                        marginBottom: theme.spacing(3),
                        borderRadius: "var(--border-radius)",
                    }}
                />
            </NoSsr>
            <NoSsr
                fallback={<div style={{ height: 380 }} className='skeleton' />}>
                <PostSkeleton
                    style={{
                        marginBottom: theme.spacing(3),
                        borderRadius: "var(--border-radius)",
                    }}
                />
            </NoSsr>
        </Stack>
    );
}
