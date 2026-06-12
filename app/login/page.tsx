export default function Login() {
    return (
        <main className="flex justify-center items-center px-4 py-20">
            <div className="border-2 border-black p-8 max-w-md w-full bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-2xl font-black tracking-tight mb-1">WELCOME BACK</h2>
                <p className="text-sm text-neutral-500 mb-6">Log in to track your interview prep progress.</p>

                <form className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono uppercase font-bold mb-1">Email Address</label>
                        <input type="email" required className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:bg-neutral-50" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label className="block text-xs font-mono uppercase font-bold mb-1">Password</label>
                        <input type="password" required className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:bg-neutral-50" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="w-full bg-black text-white p-3 font-bold text-sm tracking-wide hover:bg-neutral-800 transition uppercase mt-2">
                        Sign In
                    </button>
                </form>
            </div>
        </main>
    );
}