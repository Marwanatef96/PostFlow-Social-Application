/** @format */

// app/api/posts/[id]/comments/route.ts

import { NextResponse } from "next/server";

export async function POST(req, { params }) {
    try {
        // 1. Get the post ID from the URL (e.g., '/api/posts/123/comments')
        const { id } = params;

        // 2. Get the request body sent from the SWR hook
        const body = await req.json(); // Expects: { commentBody: "...", token: "..." }

        // 3. Prepare the body for the external API call.
        // The external API requires the comment text to be in a field named "body".
        const externalApiBody = {
            body: body.commentBody,
        };

        // 4. Make the request to the actual Tarmeez API
        const res = await fetch(
            `https://tarmeezacademy.com/api/v1/posts/${id}/comments`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${body.token}`, // Use the token from the request body
                },
                body: JSON.stringify(externalApiBody),
            }
        );

        // 5. Forward the response from the Tarmeez API back to our frontend
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Create comment error:", error);
        return NextResponse.json(
            { message: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
