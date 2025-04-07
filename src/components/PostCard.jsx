"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Popup from "./Popup";
import { useState } from "react";
import { deletePost } from "@/lib/actions/post.actions";

export default function PostCard({ post, onDelete }) {
  const router = useRouter();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError("");

      const result = await deletePost(post.id);

      if (result.success) {
        onDelete(post.id);
        setShowDeletePopup(false);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Failed to delete post");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden group">
        <div className="p-6">
          <Link href={`/posts/${post.id}`} className="block">
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 line-clamp-2 mb-4">{post.body}</p>
          </Link>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Link href={`/posts/${post.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="group-hover:bg-blue-50"
              >
                Read More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </Link>

            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowDeletePopup(true)}
              disabled={deleting}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {deleting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      <Popup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        onConfirm={handleDelete}
        confirmText={deleting ? "Deleting..." : "Delete"}
        confirmDisabled={deleting}
      />
    </>
  );
}
