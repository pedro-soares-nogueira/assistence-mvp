import Link from "next/link";
import React from "react";

const Blog = () => {
  return (
    <main className="container mx-auto px-4 py-8 space-y-32">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-[32rem]">
        <Link
          href={"/blog/first-post"}
          className="bg-gray-400 h-full w-full flex items-center justify-center"
        >
          image
        </Link>
        <div className="flex flex-col gap-6">
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
        </div>
      </section>

      <div className="space-y-24">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full h-[20rem]">
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full h-[20rem]">
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full h-[20rem]">
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
          <Link
            href={"/blog/first-post"}
            className="bg-gray-400 h-full w-full flex items-center justify-center"
          >
            image
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Blog;
