/** @format */

import useSWR from "swr";
import { fetcher } from "../fetcher";

/**
 * Custom hook to fetch and manage user data.
 * @param {string | number | null} userId - The ID of the user to fetch
 * @returns {Object} Object containing user data, loading state, and error state
 * @property {Object|null} user - The user data or null if not loaded
 * @property {Error|null} userError - Any error that occurred during fetching
 * @property {boolean} isUserLoading - Whether the user data is currently loading
 */
export function useUser(userId) {
    const { data, error, isLoading } = useSWR(
        userId ? `/api/users/${userId}` : null,
        fetcher,
        {
            revalidateOnFocus: true,
            shouldRetryOnError: true,
            dedupingInterval: 5000,
            errorRetryCount: 3,
        }
    );

    return {
        user: data?.data || null,
        userError: error,
        isUserLoading: isLoading,
    };
}

/**
 * Custom hook to fetch and manage user posts.
 * @param {string | number | null} userId - The ID of the user whose posts to fetch
 * @returns {Object} Object containing posts data, loading state, error state, and mutation function
 * @property {Array} posts - Array of user posts
 * @property {Error|null} postsError - Any error that occurred during fetching
 * @property {boolean} arePostsLoading - Whether the posts are currently loading
 * @property {Function} mutate - Function to mutate the posts data
 */
export function useUserPosts(userId) {
    const { data, error, isLoading, mutate } = useSWR(
        userId ? `/api/users/${userId}/posts` : null,
        fetcher,
        {
            revalidateOnFocus: true,
            shouldRetryOnError: true,
            dedupingInterval: 2000,
            errorRetryCount: 3,
        }
    );

    return {
        posts: data?.data || [],
        postsError: error,
        arePostsLoading: isLoading,
        mutate,
    };
}
