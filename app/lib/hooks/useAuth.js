/** @format */

import useSWR, { mutate } from "swr";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import Cookies from "js-cookie";
import { apiClient, fetcher } from "../fetcher";

/**
 * Hook for fetching the current user.
 */
export function useUser() {
    // Track userId in state to trigger SWR when it changes
    const [userId, setUserId] = useState(() => Cookies.get("userId"));
    useEffect(() => {
        const interval = setInterval(() => {
            const cookieId = Cookies.get("userId");
            setUserId((prev) => (prev !== cookieId ? cookieId : prev));
        }, 500);
        return () => clearInterval(interval);
    }, []);
    const shouldFetch = Boolean(userId);
    const key = shouldFetch ? `/api/users/${userId}` : null;
    const { data, error, isLoading } = useSWR(key, fetcher);
    return {
        user: data?.data,
        isLoading,
        error,
    };
}

/**
 * Login hook
 * Calls API to log user in, stores token in cookies.
 */
export function useLogin() {
    const mutationFetcher = async (url, { arg }) => {
        try {
            console.log("Attempting login..."); // Debug log
            const res = await apiClient.post(url, {
                username: arg.username,
                password: arg.password,
            });

            // Debug log
            console.log("Login response:", res);

            // For successful login, expect data.data to contain user info
            const userData = res.data || res;
            const token = userData.token;
            const userId = userData.id || userData.user?.id;

            if (!token || !userId) {
                console.error("Invalid response structure:", res); // Debug log
                throw new Error("Invalid response from server");
            }

            Cookies.set("token", token, { expires: 7 });
            Cookies.set("userId", userId, { expires: 7 });
            // Revalidate user after login
            mutate(`/api/users/${userId}`);
            return userData;
        } catch (error) {
            console.error("Login error:", error); // Debug log
            // Preserve the error structure from the API
            throw error;
        }
    };
    const { trigger, isMutating } = useSWRMutation(
        "/api/auth/login",
        mutationFetcher
    );

    return {
        login: trigger,
        isLoggingIn: isMutating,
    };
}

/**
 * Register hook
 * Calls API to create a new user, stores token in cookies.
 */
export function useRegister() {
    const mutationFetcher = async (url, { arg }) => {
        const formData = new FormData();
        formData.append("username", arg.username);
        formData.append("password", arg.password);
        formData.append("email", arg.email);
        formData.append("name", arg.name);
        if (arg.avatarFile) {
            formData.append("avatar", arg.avatarFile);
        }
        const res = await apiClient.post(url, formData);
        const token = res?.token;
        const userId = res?.id || res?.user?.id;
        if (token && userId) {
            Cookies.set("token", token, { expires: 7 });
            Cookies.set("userId", userId, { expires: 7 });
            // Revalidate user after register
            mutate(`/api/users/${userId}`);
        }
        return { ...res, token, userId };
    };

    const { trigger, isMutating } = useSWRMutation(
        "/api/auth/register",
        mutationFetcher
    );

    return { register: trigger, isRegistering: isMutating };
}

/**
 * Logout hook
 * Simply clears the cookie.
 */ export function useLogout() {
    return {
        logout: () => {
            const userId = Cookies.get("userId");
            Cookies.remove("token");
            Cookies.remove("userId");
            // Revalidate user after logout
            if (userId) mutate(`/api/users/${userId}`);
        },
    };
}

/**
 * Utility: get token from cookie
 */
export function getToken() {
    return Cookies.get("token") || null;
}

/**
 * Auth hook
 * Manages user state and provides login, register, and logout functions.
 */
export function useAuth() {
    const { user, isLoading, error } = useUser();
    const { login, isLoggingIn } = useLogin();
    const { register, isRegistering } = useRegister();
    const { logout } = useLogout();

    return {
        user,
        isLoading,
        error,
        login,
        isLoggingIn,
        register,
        isRegistering,
        logout,
    };
}
