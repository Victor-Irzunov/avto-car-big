"use client";
// components/GalleryComponent/GalleryComponent.js
import ImageGallery from 'react-image-gallery';
import React, { useRef, useState } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import Image from 'next/image';

const GalleryComponent = ({ images, title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const galleryRef = useRef(null);

  // используем относительные пути — nginx уже раздаёт /uploads
  const galleryItems = images.map((image) => ({
    original: `/uploads/${image.original}`,
    thumbnail: `/uploads/${image.thumbnail}`,
  }));

  const openModal = (index) => { setCurrentIndex(index); setIsModalOpen(true); };
  const closeModal = () => setIsModalOpen(false);

  const changeMainImage = (index) => {
    setCurrentIndex(index);
    galleryRef.current?.slideToIndex(index);
  };

  // главный кадр: грузим только нужный размер + ленивую загрузку дальше
  const renderImage = (item) => (
    <div className="relative w-full" style={{ paddingTop: '75%', overflow: 'hidden', borderRadius: 8 }}>
      <Image
        src={item.original}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 700px"
        priority={currentIndex === 0}
        loading={currentIndex === 0 ? 'eager' : 'lazy'}
        style={{ objectFit: 'cover' }}
      />
    </div>
  );

  return (
    <div className='mt-8'>
      <div className="relative">
        <div className="relative rounded-lg overflow-hidden">
          <ImageGallery
            ref={galleryRef}
            items={galleryItems}
            showFullscreenButton={true}
            showPlayButton={false}
            showThumbnails={false}
            startIndex={currentIndex}
            onClick={() => openModal(currentIndex)}
            onSlide={(index) => setCurrentIndex(index)}
            renderItem={renderImage}
          />
        </div>

        <div className="flex overflow-x-scroll mt-4 space-x-2">
          {galleryItems.map((item, index) => (
            <button
              key={index}
              className={`min-w-28 min-h-20 cursor-pointer ${currentIndex === index ? 'border-2 border-blue-500' : ''}`}
              onClick={() => changeMainImage(index)}
              style={{ position: 'relative', width: 112, height: 84, overflow: 'hidden', borderRadius: 8 }}
              aria-label={`К изображению ${index + 1}`}
            >
              <Image
                src={item.thumbnail}
                width={112}
                height={84}
                alt={title}
                loading="lazy"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative w-11/12" style={{ background: 'transparent' }}>
            <button onClick={closeModal} className="btn btn-sm border-none text-black btn-circle bg-white absolute right-2 top-2 text-2xl">✕</button>
            <div className="relative w-full" style={{ paddingTop: '66.66%' }}>
              <Image
                src={galleryItems[currentIndex].original}
                alt={title}
                fill
                sizes="100vw"
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)} className="btn btn-outline">
                &#10094; Назад
              </button>
              <button onClick={() => setCurrentIndex((currentIndex + 1) % images.length)} className="btn btn-outline">
                Вперед &#10095;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryComponent;
