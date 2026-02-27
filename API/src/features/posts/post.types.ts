export interface Post {
  id: string;
  img_url: string;
  title: string;
  description: string;
}

export interface CreatePostDTO {
  img_url: string;
  title: string;
  description: string;
}