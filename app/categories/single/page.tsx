import Link from "next/link";

export default function BackendCategory() {
    return (
        <main className="container mx-auto px-6 max-w-4xl py-12">
            <div className="mb-10">
                <Link href="/categories" className="text-sm font-mono text-neutral-500 hover:text-black">&larr; Back to Categories</Link>
                <h2 className="text-4xl font-black mt-2 tracking-tight">BACKEND DEVELOPMENT</h2>
                <p className="text-neutral-600 mt-2">Essential interview preparation questions covering architectural design, optimization, and framework internals.</p>
            </div>

            <div className="space-y-12">
                <article className="border-b border-neutral-200 pb-10">
                    <h3 className="text-2xl font-bold tracking-tight mb-3">1. Explain Laravel Service Container and Dependency Injection.</h3>
                    <div className="text-neutral-700 leading-relaxed space-y-3">
                        <p>The Service Container in Laravel is a powerful tool for managing className dependencies.</p>
                        <pre className="bg-neutral-50 p-4 border-l-4 border-black font-mono text-sm overflow-x-auto">
                            {`public function __construct(UserRepository $users) 
{
    $this->users = $users;
}`}
                        </pre>
                    </div>
                </article>

                <article className="border-b border-neutral-200 pb-10">
                    <h3 className="text-2xl font-bold tracking-tight mb-3">2. How do you optimize heavy queries in PostgreSQL / MySQL?</h3>
                    <div className="text-neutral-700 leading-relaxed space-y-3">
                        <p>Database optimization requires a structured approach. Use EXPLAIN ANALYZE to check execution plans, proper Indexing, and avoid N+1 query problems using Eager Loading.</p>
                    </div>
                </article>
            </div>

            <div className="flex justify-center items-center space-x-2 mt-12">
                <button className="border border-black px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition">&larr; Prev</button>
                <span className="border border-black bg-black text-white px-3 py-1 text-sm font-medium">1</span>
                <button className="border border-black px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition">2</button>
                <button className="border border-black px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition">Next &rarr;</button>
            </div>
        </main>
    );
}