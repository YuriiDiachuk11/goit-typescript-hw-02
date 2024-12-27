import axios from "axios";
import { ApiResponse } from "../components/App/App.types";

const fetchImages = async (
  query: string,
  page: number
): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    `https://api.unsplash.com/search/photos?client_id=5UD8DYrMxBo-IEihraDNL4h45xfwBbotn8LZ1CUQDX4&query=${query}&page=${page}&per_page=10`
  );
  return response.data;
};

export default fetchImages;
