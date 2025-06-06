import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: Reaction;
}

export interface Reaction {
  likes: number;
  dislikes: number;
}

export interface PostResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchPosts = async (skip: number, limit: number): Promise<PostResponse> => {
  const response = await axios.get<PostResponse>(
    `https://dummyjson.com/posts?skip=${skip}&limit=${limit}`
  );
  return response.data;
};

export const fetchMostLikedPost = async (): Promise<Post> => {
  const { posts } = await fetchPosts(0, 200);

  return posts.reduce((mostLiked, post) =>
    post.reactions.likes > mostLiked.reactions.likes ? post : mostLiked
  );
};