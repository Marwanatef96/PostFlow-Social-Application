/** @format */

import { NextResponse } from "next/server";

// Best practice: Define constants for external URLs
const EXTERNAL_API_URL = `https://tarmeezacademy.com/api/v1/register`;

export const config = {
    api: { bodyParser: false },
};

/**
 * Handles user registration by forwarding the request to an external API.
 * It expects multipart/form-data, remaps the 'avatar' field to 'image',
 * and proxies the data.
 * @param {Request} req - The incoming request object.
 * @returns {NextResponse} - The response from the external API or an error response.
 */
export const POST = async (req) => {
    try {
        const formData = await req.formData();

        // The external API expects the image field to be named 'image'.
        // The client sends it as 'avatar'. We remap it here.
        const avatarFile = formData.get("avatar");
        if (avatarFile) {
            formData.append("image", avatarFile);
            formData.delete("avatar");
        }

        const res = await fetch(EXTERNAL_API_URL, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            },
        });

        const data = await res.json();
        console.log("API Response:", { status: res.status, data });

        // Pass through the exact response from the API
        return NextResponse.json(data, { status: res.status });
    } catch (err) {
        // This catches errors from req.formData(), fetch(), or res.json()
        console.error("Registration route internal error:", err);

        // Check if the error is due to a non-JSON response from the external API
        if (err instanceof SyntaxError) {
            return NextResponse.json(
                {
                    message:
                        "Received an invalid response from the registration service.",
                },
                { status: 502 } // Bad Gateway
            );
        }

        return NextResponse.json(
            { message: "An unexpected server error occurred." },
            { status: 500 }
        );
    }
};
