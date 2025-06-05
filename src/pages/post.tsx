import { GetServerSideProps } from "next";
import { fetchPosts, Post } from "../../api/posts-api";

interface Props {
  posts: Post[];
}

export default function PostsPage({ posts }: Props) {
  return (
    <div>
      <h1>Post List</h1>
      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: '1rem' }}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p><strong>Tags:</strong> {post.tags.join(', ')}</p>
          <p><strong>Likes:</strong> {post.reactions?.likes}</p>
          <p><strong>Dislikes:</strong> {post.reactions?.dislikes}</p>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetchPosts();

  return {
    props: {
      posts: data.posts,
    },
  };
};
