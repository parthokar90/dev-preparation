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
        // চোখের শান্তির জন্য সফট নিউট্রাল/গ্রে ব্যাকগ্রাউন্ড ব্যবহার করা হয়েছে
        <main className="min-h-screen bg-neutral-50/50 text-neutral-900 py-12 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
                
                {/* BACK BUTTON */}
                <div className="mb-8">
                    <Link 
                        href="/categories" 
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-blue-600 font-bold transition-colors"
                    >
                        <i className="fas fa-arrow-left text-[10px]"></i> Back to Categories
                    </Link>
                </div>

                {/* HEADER SECTION */}
                <div className="mb-12 border-b-2 border-neutral-200 pb-8">
                    {loading ? (
                        <div className="space-y-3 animate-pulse">
                            <div className="h-10 bg-neutral-200 w-2/3 rounded"></div>
                            <div className="h-5 bg-neutral-200 w-full rounded"></div>
                        </div>
                    ) : (
                        <>
                            <div className="inline-block bg-blue-50 text-blue-700 text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 mb-3 rounded border border-blue-200">
                                Interview Topics
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-neutral-900">
                                {category ? category.name : "Category"}
                            </h2>
                            <p className="text-neutral-600 mt-3 text-base sm:text-lg leading-relaxed max-w-3xl">
                                {category?.description || "Essential interview preparation questions for this category."}
                            </p>
                        </>
                    )}
                </div>

                {/* ERROR ALERT */}
                {error && (
                    <div className="p-4 mb-8 border-l-4 border-red-600 bg-red-50 text-red-700 font-medium rounded-r shadow-sm text-sm flex items-center gap-3">
                        <i className="fas fa-exclamation-circle text-red-500 text-base"></i>
                        <span>{error}</span>
                    </div>
                )}

                {/* EMPTY STATE */}
                {!loading && topics.length === 0 && !error && (
                    <div className="text-center py-16 border-2 border-dashed border-neutral-300 rounded-xl bg-white shadow-sm">
                        <i className="fas fa-folder-open text-neutral-300 text-4xl mb-3 block"></i>
                        <p className="text-neutral-500 font-medium">No preparation topics found for this category yet.</p>
                    </div>
                )}

                {/* TOPICS LIST */}
                <div className="space-y-6">
                    {loading ? (
                        // সুন্দর কঙ্কাল স্কেলিটন লোডার (Skeleton Loader)
                        [1, 2, 3].map((n) => (
                            <div key={n} className="p-6 bg-white border border-neutral-200 rounded-xl space-y-3 animate-pulse">
                                <div className="h-6 bg-neutral-200 w-1/3 rounded"></div>
                                <div className="h-4 bg-neutral-200 w-full rounded"></div>
                                <div className="h-4 bg-neutral-200 w-4/5 rounded"></div>
                            </div>
                        ))
                    ) : (
                        topics.map((topic, index) => (
                            <article 
                                key={topic.id} 
                                className="group relative bg-white border border-neutral-200 hover:border-blue-500/50 p-6 sm:p-8 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300"
                            >
                                {/* ক্লিয়ার অ্যান্ড ক্লিন টাইটেল উইথ কাউন্টার ইনডেক্স */}
                                <div className="flex items-start gap-4 mb-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-blue-50 text-neutral-700 group-hover:text-blue-600 font-mono font-bold text-sm flex items-center justify-center border border-neutral-200/60 transition-colors">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 pt-0.5 group-hover:text-blue-900 transition-colors">
                                        {topic.title}
                                    </h3>
                                </div>
                                
                                {/* রিডিবিলিটি ফোকাসড ডেসক্রিপশন এরিয়া */}
                                <div className="text-neutral-700 pl-0 sm:pl-12">
                                    <div
                                        className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed text-sm sm:text-base
                                        [&_p]:mb-4 [&_p:last-child]:mb-0
                                        [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_li]:mb-2
                                        [&_strong]:text-neutral-900 [&_strong]:font-bold
                                        [&_code]:bg-neutral-100 [&_code]:text-red-600 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono"
                                        dangerouslySetInnerHTML={{ __html: topic.description || "No content provided for this topic." }}
                                    />
                                </div>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}