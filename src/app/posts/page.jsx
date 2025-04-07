"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import Button from "@/components/Button";
import { getPosts } from "@/lib/actions/post.actions";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      loadPosts();
    };

    window.addEventListener("focus", handleRouteChange);
    return () => {
      window.removeEventListener("focus", handleRouteChange);
    };
  }, []);

  async function loadPosts() {
    try {
      setLoading(true);
      const result = await getPosts();

      if (result.success) {
        setPosts(result.data);
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  const handleDeletePost = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId)
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <Button onClick={loadPosts} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button
                variant="secondary"
                size="sm"
                className="hover:bg-white/90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Return Home
              </Button>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Posts</h1>
              <p className="text-blue-100 mt-2">Manage your blog posts</p>
            </div>
            <Link href="/posts/new">
              <Button
                variant="secondary"
                className="w-full sm:w-auto hover:bg-white/90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create New Post
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"
              />
            </svg>
            <p className="text-xl text-gray-600 mb-4">No posts yet</p>
            <Link href="/posts/new">
              <Button variant="primary" className="hover:bg-blue-700">
                Create Your First Post
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
