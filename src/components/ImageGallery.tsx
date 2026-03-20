import { useState } from 'react';
import ImageModal from './ImageModal';

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return <div className="p-4 text-gray-500">No hay imágenes disponibles para esta propiedad.</div>;
  }

  return (
    <div className="w-full">
      {/* Thumbnails grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="aspect-video overflow-hidden rounded-lg cursor-pointer border border-gray-200 shadow-sm hover:shadow-md transition"
            onClick={() => openModal(idx)}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Abre el Modal a pantalla completa si modalOpen es true */}
      {modalOpen && (
        <ImageModal
          images={images}
          currentIndex={currentIndex}
          onClose={() => setModalOpen(false)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}