/** @format */

"use client";

import * as React from "react";
import { useThemeMode } from "../../../lib/ThemeContext";
import NoSsr from "@mui/material/NoSsr";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

export default function PostSkeleton() {
    const { theme } = useThemeMode();
    return (
        <NoSsr>
            <Card
                sx={{
                    maxWidth: "100%",
                    borderRadius: "var(--border-radius)",
                    marginBottom: theme.spacing(3),
                    boxShadow: "0 2px 8px rgba(60,60,60,0.06)",
                }}>
                <CardHeader
                    avatar={
                        <Skeleton
                            animation='wave'
                            variant='circular'
                            width={40}
                            height={40}
                        />
                    }
                    title={
                        <Skeleton
                            animation='wave'
                            height={10}
                            width='80%'
                            style={{ marginBottom: 6 }}
                        />
                    }
                    subheader={
                        <Skeleton animation='wave' height={10} width='40%' />
                    }
                />
                <Skeleton
                    sx={{ height: 300, borderRadius: "var(--border-radius)" }}
                    animation='wave'
                    variant='rectangular'
                />
                <CardContent>
                    <React.Fragment>
                        <Skeleton
                            animation='wave'
                            height={10}
                            style={{ marginBottom: 6 }}
                        />
                        <Skeleton animation='wave' height={10} width='80%' />
                    </React.Fragment>
                </CardContent>
            </Card>
        </NoSsr>
    );
}
