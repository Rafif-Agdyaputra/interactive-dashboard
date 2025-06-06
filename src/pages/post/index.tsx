import { useState, useEffect } from "react";
import { fetchPosts, Post } from "../../../api/posts-api";
import PostSkeleton from "../../../component/skeleton/PostSkeleton";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const limit = 9;

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetchPosts(skip, limit);
      setPosts((prev) => [...prev, ...data.posts]);
      setSkip((prev) => prev + limit);
      if (skip + limit >= data.total) setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMorePosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
          Post List
        </h1>
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {post.title}
            </h2>

            <p className="text-gray-600 text-sm">
              {post.body.length > 300 ? (
                <>
                  {post.body.slice(0, 300)}...
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-blue-600 ml-1 hover:underline"
                  >
                    Read More
                  </button>
                </>
              ) : (
                post.body
              )}
            </p>

            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-medium text-blue-700">Tags:</span>{" "}
                {post.tags.join(", ")}
              </p>
              <div className="flex gap-4 text-sm">
                <p className="text-green-700 font-medium">
                  👍 {post.reactions?.likes}
                </p>
                <p className="text-red-600 font-medium">
                  👎 {post.reactions?.dislikes}
                </p>
              </div>
            </div>
          </article>
        ))}

        {loading &&
          Array.from({ length: limit }).map((_, idx) => (
            <PostSkeleton key={`skeleton-${idx}`} />
          ))}
      </section>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMorePosts}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {selectedPost && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(6px)",
          }}
          onClick={() => {
            setIsClosing(true);
            setTimeout(() => {
              setSelectedPost(null);
              setIsClosing(false);
            }, 300);
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`bg-white p-6 rounded-2xl shadow-lg max-w-2xl w-full transition-all duration-300 transform ${
              isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedPost.title}
            </h2>
            <p className="text-gray-700 text-base whitespace-pre-line leading-relaxed">
              {selectedPost.body}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
