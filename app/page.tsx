"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, Category } from "@/services/api/category/crud";

export default function Home() {
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
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* Premium Tech Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
          MASTER YOUR NEXT TECH INTERVIEW
        </h1>
        <p className="text-sm md:text-base text-slate-600 mt-3 font-medium">
          Select a structured preparation track below to level up your engineering skills.
        </p>
      </div>

      {/* Loading State - Spinner */}
      {loading && (
        <div className="flex items-center justify-center gap-2.5 text-sm font-medium text-slate-500 py-12">
          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading preparation tracks...</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-4 mb-6 bg-red-50/60 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2 justify-center max-w-xl mx-auto">
          <i className="fas fa-circle-exclamation"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && categories.length === 0 && !error && (
        <div className="text-sm text-slate-500 py-12 text-center border border-dashed border-slate-200 rounded-2xl bg-white max-w-md mx-auto">
          No categories found at the moment.
        </div>
      )}

      {/* Dynamic Tracks Grid - High Visibility & No Hover Tricks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/get-topic-details/${cat.id}`} 
            className="bg-white border border-slate-200 p-5 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-44"
          >
            <div>
              {/* Visible Indigo Folder Icon */}
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <i className="far fa-folder text-xs"></i>
              </div>
              
              {/* High Contrast Title */}
              <h3 className="text-md font-bold text-slate-900">
                {cat.name}
              </h3>
              
              {/* Readable Description */}
              <p className="text-[13px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                {cat.description || "No description track provided."}
              </p>
            </div>
            
            {/* Always Visible Call To Action */}
            <div className="flex items-center gap-1 text-[12px] font-bold text-indigo-600 mt-3">
              <span>Start Learning</span>
              <i className="fas fa-chevron-right text-[9px] pt-0.5"></i>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}