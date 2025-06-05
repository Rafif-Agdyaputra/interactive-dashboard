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

export const fetchPosts = async (): Promise<PostResponse> => {
  const response = await axios.get<PostResponse>('https://dummyjson.com/posts');
  return response.data;
};
