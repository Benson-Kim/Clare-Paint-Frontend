'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Maximize2 } from 'lucide-react';
import { ProductColor } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  selectedColor: ProductColor;
  colors: ProductColor[];
  productName: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  selectedColor,
  colors,
  productName
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  // High-resolution images for better zoom experience
  const images = [
    {
      url: selectedColor.image.replace('w=800', 'w=1600'),
      alt: `${productName} in ${selectedColor.name} - Main view`,
      type: 'product'
    },
    {
      url: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: `${productName} - Application view`,
      type: 'application'
    },
    {
      url: 'https://images.pexels.com/photos/6585759/pexels-photo-6585759.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: `${productName} - Texture detail`,
      type: 'texture'
    },
    {
      url: 'https://images.pexels.com/photos/6782367/pexels-photo-6782367.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: `${productName} - Room setting`,
      type: 'room'
    },
    {
      url: 'https://images.pexels.com/photos/6782368/pexels-photo-6782368.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: `${productName} - Before and after`,
      type: 'comparison'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setZoomLevel(1);
    setIsZoomed(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoomLevel(1);
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setZoomLevel(isZoomed ? 1 : 2);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setZoomLevel(1);
      setIsZoomed(false);
    }
  };

  const increaseZoom = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 4));
    setIsZoomed(true);
  };

  const decreaseZoom = () => {
    const newZoom = Math.max(zoomLevel - 0.5, 1);
    setZoomLevel(newZoom);
    if (newZoom === 1) setIsZoomed(false);
  };
  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative bg-neutral-100 rounded-lg overflow-hidden group">
          <div 
            className="relative w-full h-96 md:h-[500px] overflow-hidden cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setZoomPosition({ x: 50, y: 50 })}
          >
            <img
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].alt}
              className={cn(
                "w-full h-full object-cover transition-transform duration-300",
                isZoomed && "cursor-zoom-out"
              )}
              style={{
                transform: isZoomed 
                  ? `scale(${zoomLevel})` 
                  : 'scale(1)',
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
              }}
              onClick={toggleZoom}
              loading="lazy"
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && !isZoomed && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
              <button
                onClick={increaseZoom}
                className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={decreaseZoom}
                className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                aria-label="View fullscreen"
              >
                <Maximize2 className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Image Type Badge */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {images[currentImageIndex].type === 'product' && 'Product View'}
              {images[currentImageIndex].type === 'application' && 'Application'}
              {images[currentImageIndex].type === 'texture' && 'Texture Detail'}
              {images[currentImageIndex].type === 'room' && 'Room Setting'}
              {images[currentImageIndex].type === 'comparison' && 'Before & After'}
            </div>

            {/* Zoom Level Indicator */}
            {isZoomed && (
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                {Math.round(zoomLevel * 100)}%
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentImageIndex(index);
                setZoomLevel(1);
                setIsZoomed(false);
              }}
              className={cn(
                "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 relative group",
                currentImageIndex === index
                  ? "border-[#5B7B7A] ring-2 ring-[#5B7B7A]/20"
                  : "border-gray-200 hover:border-gray-300"
              )}
              aria-label={image.alt}
            >
              <img
                src={image.url.replace('w=1600', 'w=400')}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>

        {/* Color Swatches */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-[#2C2C2C] mb-3">Available Colors</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <div
                key={color.id}
                className={cn(
                  "relative group cursor-pointer transition-all duration-200",
                  color.id === selectedColor.id && "scale-110"
                )}
                title={color.name}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full border-2 transition-all duration-200",
                    color.id === selectedColor.id
                      ? "border-[#5B7B7A] ring-2 ring-[#5B7B7A]/20"
                      : "border-gray-200 hover:border-gray-300",
                    !color.inStock && "opacity-50 cursor-not-allowed"
                  )}
                  style={{ backgroundColor: color.hex }}
                />
                {!color.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-0.5 bg-red-500 rotate-45 rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-200 z-10"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <div className="relative max-w-7xl max-h-full p-4">
            <img
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].alt}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Fullscreen Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};