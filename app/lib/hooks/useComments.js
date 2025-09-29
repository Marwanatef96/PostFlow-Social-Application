/** @format */

import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { apiClient, fetcher } from "../fetcher";
import { getToken } from "./useAuth";

/**
 * Hook for creating a new comment.
 */
// lib/hooks.ts

/**
 * Hook for creating a new comment on a post.
 * @example
 * const { createComment, isCreating } = useCreateComment();
 * createComment({ postId: 123, commentBody: 'Great post!', token: 'user-token' });
 */
export function useCreateComment(postId) {
	const mutationFetcher = (url, { arg }) =>
		// The second argument is the request body sent to our Next.js API route.
		apiClient.post(url, {
			commentBody: arg.commentBody, // The text of the comment
			token: arg.token, // The user's authentication token
		});

	const { trigger, isMutating } = useSWRMutation(
		postId ? `/api/posts/${postId}/comments` : null,
		mutationFetcher
	);

	return {
		createComment: trigger,
		isCreating: isMutating,
	};
}
