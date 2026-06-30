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

            {/* Minimal Back Button */}
            <div className="mb-6">
                <Link
                    href="/categories"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                >
                    <i className="fas fa-chevron-left text-[9px]"></i> Back to tracks
                </Link>
            </div>

            {/* Header Section - Informative & Quiet */}
            <div className="mb-12 pb-6 border-b border-slate-200">
                {loading ? (
                    <div className="space-y-2 animate-pulse">
                        <div className="h-7 bg-slate-200 w-1/3 rounded-lg"></div>
                        <div className="h-4 bg-slate-200 w-1/4 rounded-lg"></div>
                    </div>
                ) : (
                    <>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight sm:text-2xl uppercase">
                            {category ? category.name : "Category Details"}
                        </h2>
                        <p className="text-xs font-semibold text-indigo-600 bg-indigo-50 inline-block px-2.5 py-1 rounded-md mt-2">
                            {topics.length} Syllabus {topics.length === 1 ? 'Topic' : 'Topics'}
                        </p>
                    </>
                )}
            </div>

            {/* Error Alert */}
            {error && (
                <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl flex items-center gap-2">
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

            {/* Topics Study List */}
            <div className="space-y-10">
                {loading ? (
                    [1, 2].map((n) => (
                        <div key={n} className="p-6 bg-white border border-slate-200 rounded-xl space-y-3 animate-pulse">
                            <div className="h-5 bg-slate-200 w-1/4 rounded-md"></div>
                            <div className="h-4 bg-slate-200 w-full rounded-md"></div>
                        </div>
                    ))
                ) : (
                    topics.map((topic, index) => (
                        <article
                            key={topic.id}
                            className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.01)]"
                        >
                            {/* Topic Title with Badge-Style Numbering */}
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                    TOPIC {String(index + 1).padStart(2, '0')}
                                </span>
                                <h3 className="text-md font-bold text-slate-900 tracking-tight">
                                    {topic.title}
                                </h3>
                            </div>

                            {/* Enhanced Study Content Area (Optimized for rich text, codes, lists) */}
                            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-[15px]
                                [&_p]:mb-4 [&_p:last-child]:mb-0
                                [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mb-2
                                [&_strong]:text-slate-900 [&_strong]:font-bold
                                
                                /* Inline Code Styling */
                                [&_code]:bg-slate-50 [&_code]:text-indigo-600 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_code]:border [&_code]:border-slate-200/60
                                
                                /* Multiline Code Blocks / Pre tags */
                                [&_pre]:bg-slate-900 [&_pre]:text-slate-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-5 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-6
                                [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:p-0 [&_pre_code]:border-none [&_pre_code]:text-xs"

                                dangerouslySetInnerHTML={{ __html: topic.description || "No content provided for this topic." }}
                            />
                        </article>
                    ))
                )}
            </div>
        </main>
    );
}