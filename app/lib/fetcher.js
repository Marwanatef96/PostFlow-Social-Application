/** @format */

// This helper function handles both successful responses and errors from the fetch API.
const handleResponse = async (res) => {
    const data = await res.json();

    // If the response is not 'ok' (e.g., status 404, 500), throw an error.
    if (!res.ok) {
        const error = new Error(data.message || "An error occurred");
        error.info = {
            message: data.message || "An error occurred",
            errors: data.errors || {},
            status: res.status,
        };
        error.status = res.status;
        console.log("Response error:", error.info); // Debug log
        throw error;
    }

    return data;
};

// --- EXPORTED FUNCTIONS ---

/**
 * A simple fetcher for SWR, designed for GET requests.
 * @param {string} url - The URL to fetch.
 */
export const fetcher = async (url) => {
    const res = await fetch(url);
    return handleResponse(res);
};

/**
 * A flexible API client for making mutation requests (POST, PUT, DELETE, etc.).
 * It automatically handles both JSON data and FormData for file uploads.
 */
export const apiClient = {
    post: (url, data, headers) => request(url, "POST", data, headers),
    delete: (url, data, headers) => request(url, "DELETE", data, headers),
    put: (url, data, headers) => request(url, "PUT", data, headers),
    patch: (url, data, headers) => request(url, "PATCH", data, headers),
};

// --- INTERNAL HELPER ---

/**
 * The core request function that powers the apiClient.
 * @private
 */
const request = async (url, method, data, customHeaders = {}) => {
    const fetchOptions = {
        method,
        headers: { ...customHeaders },
    };

    // Only add body and headers if data is provided.
    if (data) {
        if (data instanceof FormData) {
            // If data is FormData, let the browser set the 'Content-Type' header.
            fetchOptions.body = data;
        } else {
            fetchOptions.headers["Content-Type"] = "application/json";
            fetchOptions.body = JSON.stringify(data);
        }
    }

    const res = await fetch(url, fetchOptions);
    return handleResponse(res);
};
