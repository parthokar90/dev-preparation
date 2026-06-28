"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { loginUser } from "@/app/actions/auth/login";

export default function LoginPage() {

    const [state, formAction, isPending] = useActionState(loginUser, null);

    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md border-2 border-black p-6">

                <h1 className="text-2xl font-bold mb-2">WELCOME BACK</h1>
                <p className="text-sm mb-6">
                    Log in to track your interview prep progress.
                </p>

                {/* Render global error or success alerts */}
                {state && !state.success && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                        {state.message}
                    </div>
                )}
                {state && state.success && (
                    <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg border border-green-100">
                        {state.message}
                    </div>
                )}

                <form action={formAction} className="space-y-4">

                    <div>
                        <label className="block text-xs font-bold uppercase mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            defaultValue={state?.inputs?.email || ""}
                            className="w-full border-2 border-black p-3 text-sm"
                            placeholder="you@example.com"
                        />
                        {/* Specific backend validation error for first_name */}
                        {state?.errors?.email && (
                            <p className="text-xs text-red-500 mt-1">{state.errors.email[0]}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            defaultValue={state?.inputs?.password || ""}
                            className="w-full border-2 border-black p-3 text-sm"
                            placeholder="••••••••"
                        />
                        {/* Specific backend validation error for first_name */}
                        {state?.errors?.password && (
                            <p className="text-xs text-red-500 mt-1">{state.errors.password[0]}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold text-sm rounded-lg border-none transition-colors cursor-pointer shadow-sm mt-2"
                    >
                        {isPending ? "Processing..." : "Log In"}
                    </button>

                </form>
            </div>
        </main>
    );
}