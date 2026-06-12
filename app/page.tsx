import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center text-center px-4 py-20 my-auto">
      <h1 className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl leading-tight">
        MASTER YOUR NEXT TECH INTERVIEW.
      </h1>
      <div className="mt-8">
        <Link href="/categories" className="border-2 border-black bg-black text-white px-8 py-3 font-semibold hover:bg-white hover:text-black transition inline-block">
          Explore Categories
        </Link>
      </div>
    </main>
  );
}