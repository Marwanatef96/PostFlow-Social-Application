/** @format */

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = params;
        const res = await fetch(
            `https://tarmeezacademy.com/api/v1/posts/${id}`
        );
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json(
            { message: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const formData = await req.formData();
        // Add _method=PUT for backend compatibility
        formData.append("_method", "PUT");
        // Proxy as POST with _method=PUT
        const res = await fetch(
            `https://tarmeezacademy.com/api/v1/posts/${id}`,
            {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                    Authorization: formData.get("token")
                        ? `Bearer ${formData.get("token")}`
                        : undefined,
                },
            }
        );
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json(
            { message: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        const token =
            req.headers.get("authorization") ||
            req.headers.get("Authorization");
        const headers = { Accept: "application/json" };
        if (token) headers["Authorization"] = token;
        const res = await fetch(
            `https://tarmeezacademy.com/api/v1/posts/${id}`,
            {
                method: "DELETE",
                headers,
            }
        );
        let data = null;
        const text = await res.text();
        try {
            data = text
                ? JSON.parse(text)
                : { message: "Deleted successfully" };
        } catch (e) {
            data = { message: text || "Deleted successfully" };
        }
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        return NextResponse.json(
            { message: "An unexpected error occurred." },
            { status: 500 }
        );
    }
}
