"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCategoryTopics } from "@/services/api/topic/crud";
import { getCategories, Category } from "@/services/api/category/crud";

interface Topic {
    id: number;
    category_id: number;
    title: string;
    description?: string;
}

export default function CategoryTopicDetails() {
    const params = useParams();
    const catId = params.cat_id as string;

    const [topics, setTopics] = useState<Topic[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [topicData, categoryData] = await Promise.all([
                    getCategoryTopics(catId),
                    getCategories(),
                ]);

                setTopics(Array.isArray(topicData) ? topicData : (topicData as any).data || []);

                const categories = Array.isArray(categoryData) ? categoryData : (categoryData as any).data || [];
                const matched = categories.find((c: Category) => c.id === Number(catId));
                setCategory(matched || null);

            } catch (err: any) {
                setError(err?.response?.data?.message || "Failed to load topic details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [catId]);

    return (
        <main className="container mx-auto px-6 max-w-4xl py-12">
            <div className="mb-10">
                <Link href="/categories" className="text-sm font-mono text-neutral-500 hover:text-black">&larr; Back to Categories</Link>

                {loading ? (
                    <div className="mt-4 text-neutral-500 animate-pulse font-mono text-sm">Loading category...</div>
                ) : (
                    <>
                        <h2 className="text-4xl font-black mt-2 tracking-tight uppercase">
                            {category ? category.name : "Category"}
                        </h2>
                        <p className="text-neutral-600 mt-2">
                            {category?.description || "Essential interview preparation questions for this category."}
                        </p>
                    </>
                )}
            </div>

            {error && (
                <div className="p-4 mb-6 border-2 border-red-500 bg-red-50 text-red-700 font-medium">
                    {error}
                </div>
            )}

            {!loading && topics.length === 0 && !error && (
                <div className="text-neutral-500">No topics found for this category.</div>
            )}

            <div className="space-y-12">
                {topics.map((topic, index) => (
                    <article key={topic.id} className="border-b border-neutral-200 pb-10">
                        <h3 className="text-2xl font-bold tracking-tight mb-3">
                            {index + 1}. {topic.title}
                        </h3>
                        <div className="text-neutral-700 leading-relaxed space-y-3">
                            <p>{topic.description || "No description provided."}</p>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}