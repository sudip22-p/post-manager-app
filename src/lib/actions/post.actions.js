"use server";

// Store posts in server memory
let posts = [];
let isInitialized = false;
let nextId = 1;

// Initialize posts from JSONPlaceholder
async function initializePosts() {
  if (!isInitialized) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          cache: "no-store",
        }
      );
      const jsonPlaceholderPosts = await response.json();
      // Store initial posts if our posts array is empty
      if (posts.length === 0) {
        posts = jsonPlaceholderPosts;
        nextId = Math.max(...posts.map((p) => p.id)) + 1;
      }
      isInitialized = true;
    } catch (error) {
      console.error("Failed to initialize posts:", error);
    }
  }
  return posts;
}

export async function getPosts() {
  try {
    await initializePosts();
    return { success: true, data: posts };
  } catch (error) {
    return { success: false, error: "Failed to fetch posts" };
  }
}

export async function createPost(formData) {
  try {
    await initializePosts();

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

    // Add to beginning of posts array
    posts.unshift(newPost);

    return { success: true, data: newPost };
  } catch (error) {
    return { success: false, error: "Failed to create post" };
  }
}

export async function deletePost(postId) {
  try {
    // Ensure posts are initialized before deleting
    await initializePosts();

    const postExists = posts.some((post) => post.id === postId);
    if (!postExists) {
      return { success: false, error: "Post not found" };
    }

    posts = posts.filter((post) => post.id !== postId);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete post" };
  }
}
