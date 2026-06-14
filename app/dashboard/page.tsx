"use client";

import { useEffect, useState } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory, Category } from "@/services/api/category/crud";
import { getTopics, createTopic, updateTopic, deleteTopic, Topic } from "@/services/api/topic/crud";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const quillModules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link"],
        ["clean"],
    ],
};

export default function Dashboard() {
    const [activeMenu, setActiveMenu] = useState<"categories" | "topics">("categories");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // ===== CATEGORY STATE =====
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [form, setForm] = useState({ name: "", description: "" });
    const [submitLoading, setSubmitLoading] = useState(false);

    // ===== TOPIC STATE =====
    const [topics, setTopics] = useState<Topic[]>([]);
    const [topicLoading, setTopicLoading] = useState<boolean>(true);
    const [topicError, setTopicError] = useState<string | null>(null);
    const [topicSubmitLoading, setTopicSubmitLoading] = useState(false);

    const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
    const [newTopic, setNewTopic] = useState({ category_id: "", title: "", description: "" });

    // ===== FETCH CATEGORIES =====
    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getCategories();
            setCategories(Array.isArray(data) ? data : (data as any).data || []);
        } catch (err: any) {
            if (err?.response?.status === 401) {
                setError("Session Expired or Unauthenticated. Please re-login.");
            } else {
                setError(err?.response?.data?.message || "Failed to load database records.");
            }
        } finally {
            setLoading(false);
        }
    };

    // ===== FETCH TOPICS =====
    const fetchTopics = async () => {
        try {
            setTopicLoading(true);
            setTopicError(null);
            const data = await getTopics();
            setTopics(Array.isArray(data) ? data : (data as any).data || []);
        } catch (err: any) {
            if (err?.response?.status === 401) {
                setTopicError("Session Expired or Unauthenticated. Please re-login.");
            } else {
                setTopicError(err?.response?.data?.message || "Failed to load topics.");
            }
        } finally {
            setTopicLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchTopics();
    }, []);

    // ===== CATEGORY HANDLERS =====
    const openModal = (category: Category | null = null) => {
        if (category) {
            setEditingCategory(category);
            setForm({ name: category.name, description: category.description || "" });
        } else {
            setEditingCategory(null);
            setForm({ name: "", description: "" });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSubmitLoading(true);
            if (editingCategory) {
                await updateCategory(editingCategory.id, form);
            } else {
                await createCategory(form);
            }
            setIsModalOpen(false);
            fetchCategories();
        } catch (err: any) {
            alert(err?.response?.data?.message || "Action execution error.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure to wipe this database record?")) {
            try {
                await deleteCategory(id);
                fetchCategories();
            } catch (err: any) {
                alert(err?.response?.data?.message || "Delete endpoint rejected request.");
            }
        }
    };

    // ===== TOPIC HANDLERS =====
    const handleAddTopic = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTopic.category_id || !newTopic.title) return alert("Select Category & Add Title");

        try {
            setTopicSubmitLoading(true);
            if (editingTopic) {
                await updateTopic(editingTopic.id, newTopic);
            } else {
                await createTopic(newTopic);
            }
            setNewTopic({ category_id: "", title: "", description: "" });
            setEditingTopic(null);
            fetchTopics();
        } catch (err: any) {
            alert(err?.response?.data?.message || "Action execution error.");
        } finally {
            setTopicSubmitLoading(false);
        }
    };

    const handleEditTopic = (topic: Topic) => {
        setEditingTopic(topic);
        setNewTopic({
            category_id: String(topic.category_id),
            title: topic.title,
            description: topic.description || "",
        });
    };

    const handleCancelEditTopic = () => {
        setEditingTopic(null);
        setNewTopic({ category_id: "", title: "", description: "" });
    };

    const handleDeleteTopic = async (id: number) => {
        if (confirm("Are you sure to wipe this topic record?")) {
            try {
                await deleteTopic(id);
                if (editingTopic?.id === id) handleCancelEditTopic();
                fetchTopics();
            } catch (err: any) {
                alert(err?.response?.data?.message || "Delete endpoint rejected request.");
            }
        }
    };

    const handleMenuSelect = (menu: "categories" | "topics") => {
        setActiveMenu(menu);
        setSidebarOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white text-black">

            {/* MOBILE TOP BAR */}
            <div className="md:hidden flex items-center justify-between border-b-2 border-black p-4 sticky top-0 bg-white z-30">
                <h2 className="text-lg font-black tracking-tight uppercase">
                    {activeMenu === "categories" ? `Categories (${categories.length})` : `Topics (${topics.length})`}
                </h2>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="border-2 border-black w-9 h-9 flex items-center justify-center"
                    aria-label="Toggle menu"
                >
                    <i className={`fas ${sidebarOpen ? "fa-xmark" : "fa-bars"}`}></i>
                </button>
            </div>

            {/* SIDEBAR NAVIGATION PANEL */}
            <aside
                className={`${sidebarOpen ? "flex" : "hidden"} md:flex w-full md:w-64 border-b-2 md:border-b-0 md:border-r-2 border-black p-4 sm:p-6 flex-col justify-between md:sticky md:top-0 md:h-screen z-20 bg-white`}
            >
                <div>
                    <nav className="flex flex-row md:flex-col gap-2 md:space-y-2">
                        <button
                            onClick={() => handleMenuSelect("categories")}
                            className={`flex-1 md:w-full text-left p-3 font-bold text-xs sm:text-sm uppercase border-2 transition ${activeMenu === "categories" ? "bg-black text-white border-black" : "border-transparent hover:border-black"
                                }`}
                        >
                            Categories Pool ({categories.length})
                        </button>
                        <button
                            onClick={() => handleMenuSelect("topics")}
                            className={`flex-1 md:w-full text-left p-3 font-bold text-xs sm:text-sm uppercase border-2 transition ${activeMenu === "topics" ? "bg-black text-white border-black" : "border-transparent hover:border-black"
                                }`}
                        >
                            Topics Registry ({topics.length})
                        </button>
                    </nav>
                </div>
                <div className="hidden md:block text-xs font-mono text-neutral-400 mt-6">v1.1.0 · Secured Session</div>
            </aside>

            {/* DYNAMIC RENDERING WORKSPACE */}
            <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-x-hidden">

                {/* 1. CATEGORIES */}
                {activeMenu === "categories" && (
                    <div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 md:mb-8">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Categories</h1>
                            </div>
                            <button
                                onClick={() => openModal(null)}
                                className="bg-black text-white px-5 py-2.5 text-sm font-bold uppercase border-2 border-black hover:bg-white hover:text-black transition w-full sm:w-auto"
                            >
                                + Add Category
                            </button>
                        </div>

                        {error && (
                            <div className="p-4 mb-6 border-2 border-red-500 bg-red-50 text-red-700 font-mono text-sm">
                                [ERROR] {error}
                            </div>
                        )}

                        <div className="border-2 border-black overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[480px]">
                                <thead className="bg-neutral-50 border-b-2 border-black font-mono text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="p-3 sm:p-4 font-bold border-r-2 border-black w-16">ID</th>
                                        <th className="p-3 sm:p-4 font-bold border-r-2 border-black">Category</th>
                                        <th className="p-3 sm:p-4 font-bold border-r-2 border-black">Description</th>
                                        <th className="p-3 sm:p-4 font-bold w-32 sm:w-40 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-black text-sm">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-neutral-400 animate-pulse font-mono">Syncing database session streams...</td>
                                        </tr>
                                    ) : categories.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-neutral-500 font-mono">No categories mapped in database yet.</td>
                                        </tr>
                                    ) : (
                                        categories.map((cat) => (
                                            <tr key={cat.id} className="hover:bg-neutral-50/50 transition">
                                                <td className="p-3 sm:p-4 border-r-2 border-black font-mono font-bold bg-neutral-50/20">{cat.id}</td>
                                                <td className="p-3 sm:p-4 border-r-2 border-black font-bold uppercase tracking-tight">{cat.name}</td>
                                                <td className="p-3 sm:p-4 border-r-2 border-black text-neutral-600 max-w-xs truncate">{cat.description || "—"}</td>
                                                <td className="p-3 sm:p-4 text-center space-x-3 sm:space-x-4 font-mono">
                                                    <button onClick={() => openModal(cat)} className="text-xs font-black uppercase underline text-black hover:text-blue-600">Edit</button>
                                                    <button onClick={() => handleDelete(cat.id)} className="text-xs font-black uppercase underline text-black hover:text-red-600">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 2. TOPICS */}
                {activeMenu === "topics" && (
                    <div>
                        <div className="mb-6 md:mb-8">
                            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">Topics Registry</h1>
                            <p className="text-sm text-neutral-500 mt-1">Add dynamic topics using active parent system categories.</p>
                        </div>

                        {topicError && (
                            <div className="p-4 mb-6 border-2 border-red-500 bg-red-50 text-red-700 font-mono text-sm">
                                [ERROR] {topicError}
                            </div>
                        )}

                        {/* ADD/EDIT TOPIC FORM */}
                        <form onSubmit={handleAddTopic} className="mb-8 p-4 sm:p-6 border-2 border-black bg-neutral-50 flex flex-col gap-5">

                            {editingTopic && (
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-yellow-100 border-2 border-black px-3 py-2 text-xs font-bold uppercase">
                                    <span>Editing Topic #{editingTopic.id}</span>
                                    <button type="button" onClick={handleCancelEditTopic} className="underline hover:text-red-600 self-start sm:self-auto">Cancel</button>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col w-full">
                                    <label className="block text-xs font-black uppercase mb-1.5 tracking-wider">
                                        Select Category
                                    </label>
                                    <select
                                        required
                                        value={newTopic.category_id}
                                        onChange={(e) => setNewTopic({ ...newTopic, category_id: e.target.value })}
                                        className="w-full border-2 border-black p-2.5 bg-white text-xs font-bold uppercase outline-none focus:bg-neutral-100 h-[44px]"
                                    >
                                        <option value="">-- Choose --</option>
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col w-full">
                                    <label className="block text-xs font-black uppercase mb-1.5 tracking-wider">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., Sanctum Tokens"
                                        value={newTopic.title}
                                        onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                                        className="w-full border-2 border-black p-2.5 text-xs outline-none bg-white font-medium focus:bg-neutral-100 h-[44px]"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col w-full">
                                <label className="block text-xs font-black uppercase mb-1.5 tracking-wider">
                                    Description
                                </label>
                                <ReactQuill
                                    key={editingTopic ? `edit-${editingTopic.id}` : "new"}
                                    theme="snow"
                                    value={newTopic.description}
                                    onChange={(value) => setNewTopic({ ...newTopic, description: value })}
                                    modules={quillModules}
                                    placeholder="Write detailed topic content here..."
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={topicSubmitLoading}
                                    className="w-full md:w-auto md:px-8 bg-black text-white p-3 font-mono text-xs uppercase font-bold border-2 border-black hover:bg-white hover:text-black transition duration-150 ease-in-out h-[44px] flex items-center justify-center"
                                >
                                    {topicSubmitLoading ? "Saving..." : editingTopic ? "Update Topic" : "Save Topic"}
                                </button>
                            </div>
                        </form>

                        {/* DISPLAY REGISTRY TABLE */}
                        <div className="border-2 border-black overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead className="bg-neutral-50 border-b-2 border-black font-mono text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="p-3 sm:p-4 font-bold border-r-2 border-black">Category</th>
                                        <th className="p-3 sm:p-4 font-bold border-r-2 border-black">Title</th>
                                        <th className="p-3 sm:p-4 font-bold border-r-2 border-black">Description</th>
                                        <th className="p-3 sm:p-4 font-bold w-28 sm:w-32 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-black text-sm">
                                    {topicLoading ? (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-neutral-400 animate-pulse font-mono">Syncing database session streams...</td>
                                        </tr>
                                    ) : topics.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-neutral-500 font-mono">No topics mapped in database yet.</td>
                                        </tr>
                                    ) : (
                                        topics.map((topic) => {
                                            const parentCategory = categories.find(c => c.id === Number(topic.category_id));
                                            return (
                                                <tr key={topic.id} className="hover:bg-neutral-50 transition">
                                                    <td className="p-3 sm:p-4 border-r-2 border-black font-mono font-bold uppercase text-xs bg-neutral-50/50">
                                                        {parentCategory ? parentCategory.name : "—"}
                                                    </td>
                                                    <td className="p-3 sm:p-4 border-r-2 border-black font-bold tracking-tight">{topic.title}</td>
                                                    <td className="p-3 sm:p-4 border-r-2 border-black text-neutral-600 text-xs max-w-xs truncate">{topic.description || "—"}</td>
                                                    <td className="p-3 sm:p-4 text-center space-x-3 sm:space-x-4 font-mono">
                                                        <button onClick={() => handleEditTopic(topic)} className="text-xs font-black uppercase underline text-black hover:text-blue-600">Edit</button>
                                                        <button onClick={() => handleDeleteTopic(topic.id)} className="text-xs font-black uppercase underline text-black hover:text-red-600">Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* CATEGORY CREATE/EDIT DIALOG BOX */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white border-2 border-black p-4 sm:p-6 w-full max-w-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">
                                {editingCategory ? "Update Category Scope" : "New Category"}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-xs font-mono font-bold border border-black px-2 py-0.5 hover:bg-black hover:text-white">CLOSE</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Category Title</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border-2 border-black p-2.5 text-sm outline-none"
                                    placeholder="e.g., PostgreSQL Advanced"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Description</label>
                                <textarea
                                    rows={3}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full border-2 border-black p-2.5 text-sm outline-none"
                                    placeholder="Provide interview tracking details context..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="w-full bg-black text-white p-3 font-bold text-xs uppercase border-2 border-black hover:bg-white hover:text-black transition"
                            >
                                {submitLoading ? "Processing transaction..." : "Save"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}