/** @format */
import useSWR from "swr";
import { fetcher } from "../fetcher";

// All tags
export function useTags() {
    const { data, error } = useSWR("/api/tags", fetcher);
    return {
        tags: data?.data,
        tagsError: error,
        isTagsLoading: !error && !data,
    };
}

// Posts by tag
export function useTagPosts(tag) {
    const { data, error } = useSWR(tag ? `/api/tags/${tag}/posts` : null, fetcher);
    return {
        posts: data?.data,
        postsError: error,
        isPostsLoading: !error && !data,
    };
}
