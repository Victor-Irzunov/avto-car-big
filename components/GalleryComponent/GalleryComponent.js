"use client"
import ImageGallery from 'react-image-gallery'
import React, { useRef, useState } from 'react'
import 'react-image-gallery/styles/css/image-gallery.css'
import Image from 'next/image'

const GalleryComponent = ({ images, title }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const galleryRef = useRef(null)

	// Constructing items array for ImageGallery using the images prop
	const galleryItems = images.map((image) => ({
		original: `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${image.original}`,
		thumbnail: `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${image.thumbnail}`,
	}))

	// Open modal
	const openModal = (index) => {
		setCurrentIndex(index)
		setIsModalOpen(true)
	}

	// Close modal
	const closeModal = () => setIsModalOpen(false)

	// Change the main image in the gallery
	const changeMainImage = (index) => {
		setCurrentIndex(index)
		if (galleryRef.current) {
			galleryRef.current.slideToIndex(index)
		}
	}

	return (
		<div className='mt-8'>
			<div className="relative">
				<div className="relative rounded-lg overflow-hidden">
					<ImageGallery
						ref={galleryRef}
						items={galleryItems}
						showFullscreenButton={true}
						showPlayButton={true}
						showThumbnails={false}
						startIndex={currentIndex}
						onClick={() => openModal(currentIndex)}
						onSlide={(index) => setCurrentIndex(index)}
					/>
				</div>

				<div className="flex overflow-x-scroll mt-4 space-x-2">
					{galleryItems.map((item, index) => (
						<Image
							width={112}
							height={80}
							key={index}
							src={item.thumbnail}
							className={`w-28 h-20 cursor-pointer ${currentIndex === index ? 'border-2 border-blue-500' : ''}`}
							onClick={() => changeMainImage(index)}
							alt={title}
						/>
					))}
				</div>
			</div>

			{isModalOpen && (
				<div className="modal modal-open">
					<div className="modal-box relative w-11/12 max-w-4xl">
						<button
							onClick={closeModal}
							className="btn btn-sm btn-circle absolute right-2 top-2"
						>
							✕
						</button>
						<img
							src={galleryItems[currentIndex].original}
							alt={title}
							className="rounded-lg w-full h-auto"
						/>
						<div className="flex justify-between mt-4">
							<button
								onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
								className="btn btn-outline"
							>
								&#10094; Назад
							</button>
							<button
								onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
								className="btn btn-outline"
							>
								Вперед &#10095;
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default GalleryComponent
