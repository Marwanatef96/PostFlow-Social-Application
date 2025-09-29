/** @format */

import { NextResponse } from "next/server";

// CORRECTED: This function now reads URL parameters for pagination
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") || "1";
        const limit = searchParams.get("limit") || "10";

        const apiUrl = `https://tarmeezacademy.com/api/v1/posts?page=${page}&limit=${limit}`;
        console.log("Fetching posts:", apiUrl);

        const res = await fetch(apiUrl, {
            headers: {
                Accept: "application/json",
            },
        });

        const data = await res.json();
        console.log("Posts Response:", { status: res.status, page, limit });

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Get posts error:", error);
        return NextResponse.json(
            error.response?.data || {
                message: "Failed to fetch posts",
                error: error.message,
            },
            { status: error.response?.status || 500 }
        );
    }
}

export async function POST(req) {
    try {
        const formData = await req.formData();
        console.log("Creating post...");

        const res = await fetch(`https://tarmeezacademy.com/api/v1/posts`, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
                Authorization: formData.get("token")
                    ? `Bearer ${formData.get("token")}`
                    : undefined,
            },
        });

        const data = await res.json();
        console.log("Create Post Response:", { status: res.status });

        // Pass through the exact response
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Create post error:", error);
        return NextResponse.json(
            error.response?.data || {
                message: "Failed to create post",
                error: error.message,
            },
            { status: error.response?.status || 500 }
        );
    }
}
