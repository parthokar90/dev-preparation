import Link from "next/link";

export default function Categories() {
    return (
        <main className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-black mb-8 tracking-tight">INTERVIEW CATEGORIES</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/categories/single" className="border-2 border-black p-6 hover:bg-black hover:text-white transition group flex flex-col justify-between h-48">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">Backend Development</h3>
                        <p className="text-sm text-neutral-500 mt-2 group-hover:text-neutral-400">Laravel, PHP, MySQL & PostgreSQL questions.</p>
                    </div>
                    <span className="text-sm font-mono mt-4 self-end">View Topics &rarr;</span>
                </Link>

                <Link href="/categories/backend" className="border-2 border-black p-6 hover:bg-black hover:text-white transition group flex flex-col justify-between h-48">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">Frontend Frameworks</h3>
                        <p className="text-sm text-neutral-500 mt-2 group-hover:text-neutral-400">React, Next.js, and Modern UI Ecosystem.</p>
                    </div>
                    <span className="text-sm font-mono mt-4 self-end">View Topics &rarr;</span>
                </Link>

                <Link href="/categories/backend" className="border-2 border-black p-6 hover:bg-black hover:text-white transition group flex flex-col justify-between h-48">
                    <div>
                        <h3 className="text-xl font-bold tracking-tight">DevOps & CI/CD</h3>
                        <p className="text-sm text-neutral-500 mt-2 group-hover:text-neutral-400">Docker, GitHub Actions, and Deployment pipelines.</p>
                    </div>
                    <span className="text-sm font-mono mt-4 self-end">View Topics &rarr;</span>
                </Link>
            </div>
        </main>
    );
}