import { useState, useEffect, useCallback } from "react";
import { fetchPosts, Post } from "../../../api/posts-api";
import PostSkeleton from "../../../component/skeleton/PostSkeleton";
import CardLikedPost from "../../../component/card/CardLikedPost";
import ButtonLoadMore from "../../../component/button/ButtonLoadMore";
import CardPost from "../../../component/card/CardPost";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const limit = 9;

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const data = await fetchPosts(skip, limit);
      setPosts((prev) => [...prev, ...data.posts]);
      setSkip((prev) => prev + limit);
      if (skip + limit >= data.total) setHasMore(false);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, skip, limit]);

  useEffect(() => {
    loadMorePosts();
  }, [loadMorePosts]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 animate-fade-in">
      <header className="mb-6">
        <CardLikedPost />
      </header>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <CardPost key={index} post={post} onClick={setSelectedPost} />
        ))}

        {loading &&
          Array.from({ length: limit }).map((_, idx) => (
            <PostSkeleton key={`skeleton-${idx}`} />
          ))}
      </section>

      {hasMore && <ButtonLoadMore onClick={loadMorePosts} loading={loading} />}

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
