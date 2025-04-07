"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import { createPost } from "@/lib/actions/post.actions";

export default function NewPostPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData) {
    try {
      setSubmitting(true);
      setError("");

      const result = await createPost(formData);

      if (result.success) {
        router.push("/posts");
        router.refresh();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Failed to create post");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-4">
            <Link href="/posts">
              <Button variant="secondary" size="sm" className="w-fit">
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Posts
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Create New Post</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <form
            action={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
          >
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="mt-1 block w-full text-gray-800 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  disabled={submitting}
                />
              </div>

              <div>
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  name="body"
                  id="body"
                  required
                  rows={6}
                  className="mt-1 block w-full text-gray-800 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  disabled={submitting}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Creating...
                    </>
                  ) : (
                    "Create Post"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push("/posts")}
                  disabled={submitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
