import { fetchMostLikedPost, Post } from "../../api/posts-api";
import { useEffect, useState } from "react";
import CardLikedPostSkeleton from "../skeleton/CardLikedPostSkeleton";

const CardLikedPost = () => {
  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const data = await fetchMostLikedPost();
      setPost(data);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [post]);

  return (
    <main className="bg-gradient-to-b from-white to-blue-50 py-12 px-6">
      {loading ? (
        <CardLikedPostSkeleton/>
      ) : (
        <div className="max-w-2xl mx-auto bg-white border border-blue-200 rounded-3xl shadow-md p-8 transition hover:shadow-lg">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            🔥 Most Liked Post
          </h1>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {post?.title}
          </h2>

          <p className="text-gray-600 mb-4">{post?.body}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post?.tags.map((tag: any) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 text-sm text-gray-500">
            <span>👍 {post?.reactions.likes} Likes</span>
          </div>
        </div>
      )}
    </main>
  );
};

export default CardLikedPost;
