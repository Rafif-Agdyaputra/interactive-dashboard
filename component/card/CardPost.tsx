import { Post } from "../../api/posts-api";

type CardPostType = {
    post: Post,
    onClick: (post: Post) => void,
}

const CardPost = ({post, onClick}: CardPostType) => {
  return (
    <article
      key={post.id}
      className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h2>

      <p className="text-gray-600 text-sm">
        {post.body.length > 300 ? (
          <>
            {post.body.slice(0, 300)}...
            <button
              onClick={() => onClick(post)}
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
  );
};

export default CardPost;
