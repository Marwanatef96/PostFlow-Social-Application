/** @format */

"use client";

import { useInfinitePosts } from "../lib/hooks/usePosts";
import PostCard from "./Post/PostCard"; // Make sure this component is wrapped in React.memo
import { Stack, Box, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import PostListSkeleton from "./Skeletons/PostListSkeleton";
import PostSkeleton from "./Skeletons/PostSkeleton";
import NewPostModalWithFeedUpdate from "./NewPostModalWithFeedUpdate";
import { useUser } from "../lib/hooks/useAuth";

// Import the CSS module for styling
import styles from "./InfinitePostsAuto.module.css";

export default function InfinitePostsAuto() {
    const {
        posts,
        isLoading,
        isReachedEnd,
        size,
        setSize,
        mutate,
        error, // 1. Added error state for robust UI
    } = useInfinitePosts();

    const { user } = useUser();

    // 2. Handle the error state to inform the user
    if (error) {
        return (
            <Typography color='error' align='center' my={4}>
                Something went wrong. Could not load the feed.
            </Typography>
        );
    }

    // Handle the initial loading state
    if (isLoading) {
        return <PostListSkeleton />;
    }

    return (
        <>
            {user && (
                <Box mb={1} display='flex' justifyContent='flex-end'>
                    <NewPostModalWithFeedUpdate />
                </Box>
            )}

            <InfiniteScroll
                dataLength={posts.length}
                next={() => setSize(size + 1)}
                hasMore={!isReachedEnd}
                loader={<PostSkeleton />}
                endMessage={
                    <Typography align='center' my={3}>
                        🎉 You have seen it all!
                    </Typography>
                }
                scrollThreshold={0.9}>
                <Stack>
                    {posts.map((post) => (
                        // 3. Use a clean and performant CSS class for the animation
                        <div key={post.id} className={styles.postFadeIn}>
                            <PostCard post={post} mutatePosts={mutate} />
                        </div>
                    ))}
                </Stack>
            </InfiniteScroll>
        </>
    );
}
