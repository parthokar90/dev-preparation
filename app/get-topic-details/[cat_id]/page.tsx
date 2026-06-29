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
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

            {/* Elegant Back Button */}
            <div className="mb-8">
                <Link
                    href="/categories"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-indigo-600 transition-colors"
                >
                    <i className="fas fa-arrow-left text-[10px]"></i> Back to Categories
                </Link>
            </div>

            {/* Header Section - Modern & Clean */}
            <div className="mb-10 pb-6 border-b border-slate-200">
                {loading ? (
                    <div className="space-y-2 animate-pulse">
                        <div className="h-8 bg-slate-200 w-1/2 rounded-md"></div>
                        <div className="h-4 bg-slate-200 w-1/3 rounded-md"></div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl uppercase">
                            {category ? category.name : "Category Details"}
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {topics.length} {topics.length === 1 ? 'topic' : 'topics'} available for preparation
                        </p>
                    </>
                )}
            </div>

            {/* Error Alert - Clean Callout */}
            {error && (
                <div className="p-4 mb-8 border border-red-200 bg-red-50/50 text-red-700 text-sm font-medium rounded-lg flex items-center gap-2">
                    <i className="fas fa-circle-exclamation"></i>
                    <span>{error}</span>
                </div>
            )}

            {/* Empty State */}
            {!loading && topics.length === 0 && !error && (
                <div className="text-center py-16 border border-dashed border-slate-200 rounded-xl bg-white">
                    <i className="fas fa-folder-open text-slate-300 text-3xl mb-3 block"></i>
                    <p className="text-sm text-slate-500 font-medium">No preparation topics found for this category yet.</p>
                </div>
            )}

            {/* Topics List - Clean Stack Layout */}
            <div className="space-y-6">
                {loading ? (
                    [1, 2, 3].map((n) => (
                        <div key={n} className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 animate-pulse">
                            <div className="h-6 bg-slate-200 w-1/3 rounded-md"></div>
                            <div className="h-4 bg-slate-200 w-full rounded-md"></div>
                            <div className="h-4 bg-slate-200 w-4/5 rounded-md"></div>
                        </div>
                    ))
                ) : (
                    topics.map((topic, index) => (
                        <article
                            key={topic.id}
                            className="group relative bg-white border border-slate-200 hover:border-slate-400 p-6 sm:p-8 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-sm transition-all duration-200"
                        >
                            {/* Left Border Accent on Hover */}
                            <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-indigo-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top rounded-l" />

                            <div className="flex items-start gap-4 mb-4">
                                {/* Number Tag */}
                                <span className="flex-shrink-0 w-7 h-7 rounded-md bg-slate-50 text-slate-500 font-mono font-bold text-xs flex items-center justify-center border border-slate-100">
                                    {String(index + 1).padStart(2, '0')}
                                </span>

                                {/* Topic Title */}
                                <h3 className="text-lg font-bold tracking-tight text-slate-900 pt-0.5 group-hover:text-indigo-600 transition-colors">
                                    {topic.title}
                                </h3>
                            </div>

                            {/* Description Area with beautifully stylized Rich Text */}
                            <div className="pl-0 sm:pl-11">
                                <div
                                    className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-sm sm:text-[15px]
                                    [&_p]:mb-3 [&_p:last-child]:mb-0
                                    [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mb-1.5
                                    [&_strong]:text-slate-900 [&_strong]:font-semibold
                                    [&_code]:bg-slate-50 [&_code]:text-indigo-600 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_code]:border [&_code]:border-slate-200/60"
                                    dangerouslySetInnerHTML={{ __html: topic.description || "No content provided for this topic." }}
                                />
                            </div>
                        </article>
                    ))
                )}
            </div>
        </main>
    );
}