/** @format */

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        const res = await fetch(`${process.env.API_URL}/logout`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        });

        const data = await res.json();
        console.log("Logout Response:", { status: res.status, data });

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            {
                message:
                    error.message ||
                    "An unexpected error occurred during logout.",
            },
            { status: 500 }
        );
    }
}
