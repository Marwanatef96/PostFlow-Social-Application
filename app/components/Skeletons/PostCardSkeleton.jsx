/** @format */

"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import NoSsr from "@mui/material/NoSsr";

function PostCardSkeleton() {
    return (
        <NoSsr fallback={<div style={{ height: 380 }} className='skeleton' />}>
            <Card
                sx={{
                    maxWidth: "100%",
                    borderRadius: 3,
                    marginBottom: 3,
                    bgcolor: (theme) =>
                        theme.palette.mode === "dark"
                            ? "rgba(30, 41, 59, 0.8)"
                            : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
                            : "0 8px 32px rgba(0, 0, 0, 0.08)",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                }}>
                <CardHeader
                    sx={{ p: 3 }}
                    avatar={
                        <Skeleton
                            animation='wave'
                            variant='circular'
                            width={48}
                            height={48}
                            sx={{
                                bgcolor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "rgba(148, 163, 184, 0.1)"
                                        : "rgba(203, 213, 225, 0.4)",
                            }}
                        />
                    }
                    title={
                        <Skeleton
                            animation='wave'
                            height={24}
                            width='60%'
                            sx={{
                                mb: 1,
                                bgcolor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "rgba(148, 163, 184, 0.1)"
                                        : "rgba(203, 213, 225, 0.4)",
                            }}
                        />
                    }
                    subheader={
                        <Skeleton
                            animation='wave'
                            height={16}
                            width='30%'
                            sx={{
                                bgcolor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "rgba(148, 163, 184, 0.1)"
                                        : "rgba(203, 213, 225, 0.4)",
                            }}
                        />
                    }
                />
                <Skeleton
                    sx={{
                        height: 300,
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "rgba(148, 163, 184, 0.1)"
                                : "rgba(203, 213, 225, 0.4)",
                    }}
                    animation='wave'
                    variant='rectangular'
                />
                <CardContent sx={{ p: 3 }}>
                    <Skeleton
                        animation='wave'
                        height={32}
                        width='70%'
                        sx={{
                            mb: 2,
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "rgba(148, 163, 184, 0.1)"
                                    : "rgba(203, 213, 225, 0.4)",
                        }}
                    />
                    <Skeleton
                        animation='wave'
                        height={20}
                        width='100%'
                        sx={{
                            mb: 1,
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "rgba(148, 163, 184, 0.1)"
                                    : "rgba(203, 213, 225, 0.4)",
                        }}
                    />
                    <Skeleton
                        animation='wave'
                        height={20}
                        width='90%'
                        sx={{
                            mb: 1,
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "rgba(148, 163, 184, 0.1)"
                                    : "rgba(203, 213, 225, 0.4)",
                        }}
                    />
                    <Skeleton
                        animation='wave'
                        height={20}
                        width='50%'
                        sx={{
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "rgba(148, 163, 184, 0.1)"
                                    : "rgba(203, 213, 225, 0.4)",
                        }}
                    />
                </CardContent>
            </Card>
        </NoSsr>
    );
}

export default PostCardSkeleton;
