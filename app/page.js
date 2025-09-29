/** @format */
"use client";
import Container from "@mui/material/Container";
import InfinitePostsAuto from "./components/PostList";
import { Suspense } from "react";
import PostListSkeleton from "./components/Skeletons/PostListSkeleton";
import NewPostModalWithFeedUpdate from "./components/NewPostModalWithFeedUpdate";
import { useUser } from "./lib/hooks/useAuth";

export default function HomePage() {
    const { user } = useUser();
    return (
        <Container maxWidth='md'>
            {user && <NewPostModalWithFeedUpdate />}
            <Suspense fallback={<PostListSkeleton />}>
                <InfinitePostsAuto />
            </Suspense>
        </Container>
    );
}
