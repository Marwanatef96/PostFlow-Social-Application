/** @format */

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        const res = await fetch(`${process.env.API_URL}/users/${id}/posts`);
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json(
            { message: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
