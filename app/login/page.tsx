"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/api/auth/login";

export default function LoginPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const res = await login(form);

            if (res?.success) {
                router.push("/dashboard");
            }
        } catch (err: any) {
            const status = err?.response?.status;

            if (status === 401) {
                setError("Invalid email or password");
            } else if (status === 422) {
                setError("Validation error");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md border-2 border-black p-6">

                <h1 className="text-2xl font-bold mb-2">WELCOME BACK</h1>
                <p className="text-sm mb-6">
                    Log in to track your interview prep progress.
                </p>

                {error && (
                    <p className="text-red-600 text-sm mb-3">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-xs font-bold uppercase mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-black p-3 text-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full border-2 border-black p-3 text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white p-3 font-bold text-sm uppercase"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>

                </form>
            </div>
        </main>
    );
}