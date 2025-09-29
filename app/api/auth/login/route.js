/** @format */

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        if (!process.env.API_URL) {
            console.error("API_URL environment variable is not set");
            return NextResponse.json(
                { message: "Server configuration error" },
                { status: 500 }
            );
        }

        const body = await req.json();
        console.log("Attempting login with:", { username: body.username });

        const res = await fetch(`${process.env.API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        console.log("API Response:", { status: res.status, data });

        // If it's an error response, pass through the exact error structure
        if (!res.ok) {
            console.log("Returning API error:", data); // Debug log
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        // Log the full error for debugging
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            cause: error.cause,
        });

        return NextResponse.json(
            {
                message: "An unexpected error occurred during login.",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
