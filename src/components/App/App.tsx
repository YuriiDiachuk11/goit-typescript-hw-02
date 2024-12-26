import React, { useState, useEffect } from "react";
import { ApiResponse, ImageData } from "./App.types";
import fetchImages from "../../services/api";
import Loader from "../Loader/Loader";
import { Toaster } from "react-hot-toast";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!query) return;

      try {
        setIsLoading(true);
        setIsError(false);
        const data: ApiResponse = await fetchImages(query, page);
        setImages((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [query, page]);

  const handleSearchSubmit = (searchTerm: string): void => {
    setImages([]);
    setQuery(searchTerm);
    setPage(1);
    setTotalPages(0);
  };

  const openModal = (imageData: ImageData): void => {
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      <Toaster />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isError && <ErrorMessage />}
      {images.length > 0 && page < totalPages && !isLoading && (
        <LoadMoreBtn
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isLoading}
        />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          imageData={selectedImage}
        />
      )}
      <ScrollToTop />
    </div>
  );
}

export default App;
