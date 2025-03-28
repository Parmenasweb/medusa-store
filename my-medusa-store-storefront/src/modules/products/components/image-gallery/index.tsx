"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Dialog } from "@headlessui/react"

type ImageGalleryProps = {
  images: { url: string; id: string }[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-emperor-100 dark:bg-emperor-800">
        <Image
          src={images[selectedImage]?.url || ""}
          alt="Product image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-emperor-950/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-emperor-950 transition-colors"
        >
          <ZoomIn className="w-5 h-5 text-emperor-950 dark:text-white" />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-emperor-950/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-emperor-950 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-emperor-950 dark:text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-emperor-950/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-emperor-950 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-emperor-950 dark:text-white" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                selectedImage === index
                  ? "ring-2 ring-emperor-950 dark:ring-white"
                  : "hover:opacity-80"
              }`}
            >
              <Image
                src={image.url}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <Dialog
        open={isZoomed}
        onClose={() => setIsZoomed(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative max-w-7xl w-full">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 dark:bg-emperor-950/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-emperor-950 transition-colors"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-5 h-5 text-emperor-950 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative aspect-square w-full">
              <Image
                src={images[selectedImage]?.url || ""}
                alt="Product image zoomed"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

export default ImageGallery
