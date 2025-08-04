'use client';

import React, { useState } from 'react';
import { Palette, Camera, Upload, Eye, Pipette, Download } from 'lucide-react';
import { ProductColor } from '@/types/product';
import { cn } from '@/lib/utils';

interface ColorMatchingToolsProps {
  selectedColor: ProductColor;
  colors: ProductColor[];
  onColorSelect: (color: ProductColor) => void;
}

export const ColorMatchingTools: React.FC<ColorMatchingToolsProps> = ({
  selectedColor,
  colors,
  onColorSelect
}) => {
  const [activeTab, setActiveTab] = useState<'visualizer' | 'matcher' | 'samples'>('visualizer');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [roomType, setRoomType] = useState('living-room');

  const roomTypes = [
    { id: 'living-room', name: 'Living Room', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'bedroom', name: 'Bedroom', image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'kitchen', name: 'Kitchen', image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 'bathroom', name: 'Bathroom', image: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=800' }
  ];

  const complementaryColors = [
    { name: 'Warm White', hex: '#F8F6F0', match: '95%' },
    { name: 'Soft Gray', hex: '#E5E5E5', match: '88%' },
    { name: 'Deep Charcoal', hex: '#2C2C2C', match: '92%' },
    { name: 'Cream Beige', hex: '#F5F5DC', match: '85%' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentRoom = roomTypes.find(room => room.id === roomType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#2C2C2C]">Color Tools</h3>
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('visualizer')}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-all duration-200",
              activeTab === 'visualizer'
                ? "bg-white text-[#5B7B7A] shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            Visualizer
          </button>
          <button
            onClick={() => setActiveTab('matcher')}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-all duration-200",
              activeTab === 'matcher'
                ? "bg-white text-[#5B7B7A] shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            Matcher
          </button>
          <button
            onClick={() => setActiveTab('samples')}
            className={cn(
              "px-3 py-1 rounded-md text-sm font-medium transition-all duration-200",
              activeTab === 'samples'
                ? "bg-white text-[#5B7B7A] shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            Samples
          </button>
        </div>
      </div>

      {/* Room Visualizer */}
      {activeTab === 'visualizer' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <Eye className="w-5 h-5 text-[#5B7B7A]" />
            <h4 className="font-medium text-[#2C2C2C]">Room Visualizer</h4>
          </div>

          {/* Room Type Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {roomTypes.map((room) => (
              <button
                key={room.id}
                onClick={() => setRoomType(room.id)}
                className={cn(
                  "p-2 rounded-lg border-2 transition-all duration-200",
                  roomType === room.id
                    ? "border-[#5B7B7A] bg-[#5B7B7A]/5"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-16 object-cover rounded mb-2"
                />
                <p className="text-xs font-medium text-[#2C2C2C]">{room.name}</p>
              </button>
            ))}
          </div>

          {/* Room Preview */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={currentRoom?.image}
              alt={currentRoom?.name}
              className="w-full h-64 object-cover"
            />
            <div 
              className="absolute inset-0 mix-blend-multiply opacity-30"
              style={{ backgroundColor: selectedColor.hex }}
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg">
              <p className="text-sm font-medium">{selectedColor.name}</p>
              <p className="text-xs opacity-90">{selectedColor.hex}</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 py-2 px-4 bg-[#5B7B7A] text-white rounded-lg hover:bg-[#5B7B7A]/90 transition-colors duration-200 flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Save Visualization</span>
            </button>
            <button className="flex-1 py-2 px-4 border border-[#5B7B7A] text-[#5B7B7A] rounded-lg hover:bg-[#5B7B7A]/5 transition-colors duration-200 flex items-center justify-center space-x-2">
              <Camera className="w-4 h-4" />
              <span>Try AR View</span>
            </button>
          </div>
        </div>
      )}

      {/* Color Matcher */}
      {activeTab === 'matcher' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <Pipette className="w-5 h-5 text-[#5B7B7A]" />
            <h4 className="font-medium text-[#2C2C2C]">Color Matcher</h4>
          </div>

          {/* Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#5B7B7A] transition-colors duration-200">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Upload an image to match colors</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </label>
          </div>

          {uploadedImage && (
            <div className="space-y-4">
              <img
                src={uploadedImage}
                alt="Uploaded for color matching"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {colors.slice(0, 4).map((color) => (
                  <button
                    key={color.id}
                    onClick={() => onColorSelect(color)}
                    className="p-3 border border-gray-200 rounded-lg hover:border-[#5B7B7A] transition-colors duration-200"
                  >
                    <div
                      className="w-full h-12 rounded mb-2"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-xs font-medium text-[#2C2C2C]">{color.name}</p>
                    <p className="text-xs text-green-600">94% match</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Complementary Colors */}
          <div>
            <h5 className="font-medium text-[#2C2C2C] mb-3">Complementary Colors</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {complementaryColors.map((color, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div
                    className="w-full h-12 rounded mb-2"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-xs font-medium text-[#2C2C2C]">{color.name}</p>
                  <p className="text-xs text-[#5B7B7A]">{color.match} match</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Color Samples */}
      {activeTab === 'samples' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-4">
            <Palette className="w-5 h-5 text-[#5B7B7A]" />
            <h4 className="font-medium text-[#2C2C2C]">Color Samples</h4>
          </div>

          <div className="bg-[#F5F5DC]/30 p-4 rounded-lg">
            <h5 className="font-medium text-[#2C2C2C] mb-2">Free Sample Program</h5>
            <p className="text-sm text-gray-600 mb-4">
              Order up to 5 free color samples to see how they look in your space.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#5B7B7A] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2C2C2C]">Select Colors</p>
                  <p className="text-xs text-gray-600">Choose up to 5 colors</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#5B7B7A] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2C2C2C]">Free Shipping</p>
                  <p className="text-xs text-gray-600">Delivered in 3-5 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Color Sample */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium text-[#2C2C2C]">Current Selection</h5>
              <span className="text-xs bg-[#5B7B7A] text-white px-2 py-1 rounded-full">1 of 5</span>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className="w-16 h-16 rounded-lg border-2 border-gray-200"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <div>
                <p className="font-medium text-[#2C2C2C]">{selectedColor.name}</p>
                <p className="text-sm text-gray-600">{selectedColor.hex}</p>
                <p className="text-xs text-gray-500">8oz sample size</p>
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-[#5B7B7A] text-white rounded-lg hover:bg-[#5B7B7A]/90 transition-colors duration-200 font-medium">
            Order Free Samples
          </button>
        </div>
      )}
    </div>
  );
};