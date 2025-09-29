/** @format */

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";

export default function CommentSkeleton() {
    return (
        <ListItem
            alignItems='flex-start'
            sx={{
                p: 3,
                bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                        ? "rgba(30, 41, 59, 0.6)"
                        : "rgba(241, 245, 249, 0.6)",
            }}>
            <ListItemAvatar>
                <Skeleton
                    variant='circular'
                    width={40}
                    height={40}
                    sx={{
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "rgba(148, 163, 184, 0.1)"
                                : "rgba(203, 213, 225, 0.4)",
                    }}>
                    <Avatar />
                </Skeleton>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Skeleton
                        width={120}
                        height={24}
                        sx={{
                            mb: 1,
                            bgcolor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "rgba(148, 163, 184, 0.1)"
                                    : "rgba(203, 213, 225, 0.4)",
                        }}
                    />
                }
                secondary={
                    <>
                        <Skeleton
                            width='80%'
                            height={16}
                            sx={{
                                mb: 0.5,
                                bgcolor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "rgba(148, 163, 184, 0.1)"
                                        : "rgba(203, 213, 225, 0.4)",
                            }}
                        />
                        <Skeleton
                            width='60%'
                            height={16}
                            sx={{
                                bgcolor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? "rgba(148, 163, 184, 0.1)"
                                        : "rgba(203, 213, 225, 0.4)",
                            }}
                        />
                    </>
                }
            />
        </ListItem>
    );
}
