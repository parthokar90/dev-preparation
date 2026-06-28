"use server";

import { cookies } from "next/headers";

import { redirect } from "next/navigation"; 

export async function loginUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const currentInputs = { email,password };
    let isSuccessful = false; 

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || "Login failed.",
                errors: result.errors || null,
                inputs: currentInputs
            };
        }

        if (result.success && result.data?.access_token) {
            const cookieStore = await cookies();
            cookieStore.set("auth_token", result.data.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7,
                path: "/dashboard",
            });
            
            isSuccessful = true; 
        }

    } catch (error: any) {
        return {
            success: false,
            message: "Something went wrong. Please try again later.",
            errors: null,
            inputs: currentInputs
        };
    }

    if (isSuccessful) {
        redirect("/dashboard");
    }
}