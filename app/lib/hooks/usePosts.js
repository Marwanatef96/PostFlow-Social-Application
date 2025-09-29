/**
 * Hook for updating a post.
 *
 * @format
 * @param {string|number} postId - The ID of the post to update.
 */

export function useUpdatePost(postId) {
    const mutationFetcher = (url, { arg }) => {
        const { title, body, imageFile } = arg.postData;
        const token = getToken();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        if (imageFile) {
            formData.append("image", imageFile);
        }
        if (token) {
            formData.append("token", token);
        }
        return apiClient.put(url, formData);
    };

    const { trigger, isMutating } = useSWRMutation(
        postId ? `/api/posts/${postId}` : null,
        mutationFetcher
    );

    return {
        updatePost: trigger,
        isUpdating: isMutating,
    };
}
/** @format */

import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { fetcher, apiClient } from "../fetcher";
import { getToken } from "./useAuth";

/**
 * Fetches a list of all posts (non-paginated).
 */
export function usePosts() {
    const { data, error, isLoading, mutate } = useSWR("/api/posts", fetcher);

    return {
        posts: data,
        postsError: error,
        isPostsLoading: isLoading,
        mutate,
    };
}

/**
 * Fetches posts in pages for infinite scrolling.
 * @param {number} limit - The number of posts to fetch per page.
 */
export function useInfinitePosts(limit = 10) {
    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.data.length) return null;
        const page = pageIndex + 1;
        return `/api/posts?page=${page}&limit=${limit}`;
    };

    const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite(
        getKey,
        fetcher,
        {
            revalidateFirstPage: false,
            revalidateOnFocus: false,
            dedupingInterval: 5000,
            shouldRetryOnError: true,
            persistSize: true,
        }
    );

    const posts = data ? [].concat(...data.map((page) => page.data)) : [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.data.length === 0;
    const isReachedEnd =
        isEmpty || (data && data[data.length - 1]?.data.length < limit);

    return {
        posts,
        error,
        isLoading: isLoadingInitialData,
        isLoadingMore,
        isReachedEnd,
        size,
        setSize,
        mutate,
    };
}

/**
 * Fetches a single post by its ID.
 * @param {string | number} postId - The ID of the post to fetch.
 */
export function usePost(postId) {
    const { data, error, isLoading } = useSWR(
        postId ? `/api/posts/${postId}` : null,
        fetcher
    );
    return {
        post: data?.data,
        postError: error,
        isPostLoading: isLoading,
    };
}

/**
 * Hook for creating a new post.
 */
export function useCreatePost() {
    const mutationFetcher = (url, { arg }) => {
        const { title, body, image, imageFile } = arg.postData;
        const token = getToken();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        if (imageFile) {
            formData.append("image", imageFile);
        } else if (image) {
            formData.append("image", image);
        }
        if (token) {
            formData.append("token", token);
        }
        return apiClient.post(url, formData);
    };

    const { trigger, isMutating } = useSWRMutation(
        "/api/posts",
        mutationFetcher
    );

    return {
        createPost: trigger,
        isCreating: isMutating,
    };
}

/**
 * Hook for deleting a post.
 */
export function useDeletePost() {
    const mutationFetcher = (url, { arg }) => {
        const token = getToken();
        const headers = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;
        // apiClient.delete expects (url, data), but our API expects no body for DELETE
        return apiClient.delete(`/api/posts/${arg.postId}`, undefined, headers);
    };

    const { trigger, isMutating } = useSWRMutation(
        "/api/posts",
        mutationFetcher
    );

    return {
        deletePost: trigger,
        isDeleting: isMutating,
    };
}
