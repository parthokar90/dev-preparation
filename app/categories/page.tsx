"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, Category } from "@/services/api/category/crud";

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const data = await getCategories();
                setCategories(Array.isArray(data) ? data : (data as any).data || []);
            } catch (err: any) {
                setError(err?.response?.data?.message || "Failed to load categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            {/* Minimalist Heading & Subtitle */}
            <div className="mb-10">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl">
                    INTERVIEW CATEGORIES
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    Select a category to start practicing your interview questions.
                </p>
            </div>

            {/* Loading State - Clean Spinner */}
            {loading && (
                <div className="flex items-center gap-3 text-sm font-medium text-slate-500 py-8">
                    <i className="fas fa-spinner fa-spin text-indigo-600"></i>
                    <span>Loading categories...</span>
                </div>
            )}

            {/* Error State - Soft Red Callout */}
            {error && (
                <div className="p-4 mb-8 border border-red-200 bg-red-50/50 text-red-700 text-sm font-medium rounded-lg flex items-center gap-2">
                    <i className="fas fa-circle-exclamation"></i>
                    <span>{error}</span>
                </div>
            )}

            {/* Empty State */}
            {!loading && categories.length === 0 && !error && (
                <div className="text-sm text-slate-500 py-8 text-center border border-dashed border-slate-200 rounded-xl bg-white">
                    No categories found at the moment.
                </div>
            )}

            {/* Categories Grid Area - Clean Minimal Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <Link 
                        key={cat.id} 
                        href={`/get-topic-details/${cat.id}`} 
                        className="group relative border border-slate-200 p-6 bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-400 hover:shadow-sm transition-all flex flex-col justify-between h-48"
                    >
                        <div>
                            {/* Accent line that reveals on hover */}
                            <div className="absolute top-0 left-6 right-6 h-[2px] bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b" />

                            <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {cat.name}
                            </h3>
                            <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                                {cat.description || "No description available."}
                            </p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                            <span className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase group-hover:text-slate-600 transition-colors">
                                Practice Now
                            </span>
                            <span className="text-xs font-semibold text-indigo-600 transform group-hover:translate-x-1 transition-transform">
                                &rarr;
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}