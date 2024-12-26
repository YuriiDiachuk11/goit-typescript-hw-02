export type ImageData = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string | null;
  description?: string | null;
  likes: number;
  user: {
    name: string;
    profile_image: string;
  };
};

export type ApiResponse = {
  results: ImageData[];
  total_pages: number;
};
