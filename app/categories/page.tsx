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
        <main className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-black mb-8 tracking-tight">INTERVIEW CATEGORIES</h2>

            {/* Loading State */}
            {loading && (
                <div className="text-lg font-medium text-neutral-500 animate-pulse">
                    Loading categories...
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="p-4 mb-6 border-2 border-red-500 bg-red-50 text-red-700 font-medium">
                    {error}
                </div>
            )}

            {/* Empty State */}
            {!loading && categories.length === 0 && !error && (
                <div className="text-neutral-500">No categories found.</div>
            )}

            {/* Categories Grid Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat) => (
                    <Link 
                        key={cat.id} 
                        href={`/get-topic-details/${cat.id}`} 
                        className="border-2 border-black p-6 hover:bg-black hover:text-white transition group flex flex-col justify-between h-48"
                    >
                        <div>
                            <h3 className="text-xl font-bold tracking-tight">{cat.name}</h3>
                            <p className="text-sm text-neutral-500 mt-2 group-hover:text-neutral-400 line-clamp-2">
                                {cat.description || "No description available."}
                            </p>
                        </div>
                        <span className="text-sm font-mono mt-4 self-end">View Topics &rarr;</span>
                    </Link>
                ))}
            </div>
        </main>
    );
}