"use server";

// In-memory store since we can't persist to JSONPlaceholder
let posts = [];
let nextId = 1;

// Initialize posts if empty
async function initializePosts() {
  if (posts.length === 0) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "no-store",
    });
    posts = await response.json();
    nextId = Math.max(...posts.map((p) => p.id)) + 1;
  }
  return posts;
}

export async function getPosts() {
  try {
    const posts = await initializePosts();
    return { success: true, data: posts };
  } catch (error) {
    return { success: false, error: "Failed to fetch posts" };
  }
}

export async function createPost(formData) {
  try {
    const title = formData.get("title")?.trim();
    const body = formData.get("body")?.trim();

    if (!title || !body) {
      return { success: false, error: "Title and content are required" };
    }

    const newPost = {
      id: nextId++,
      title,
      body,
      userId: 1,
      createdAt: new Date().toISOString(),
    };

    posts.unshift(newPost);
    return { success: true, data: newPost };
  } catch (error) {
    return { success: false, error: "Failed to create post" };
  }
}

export async function deletePost(postId) {
  try {
    // Validate postId
    if (!postId) {
      return { success: false, error: "Post ID is required" };
    }

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "DELETE",
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to delete post",
    };
  }
}
