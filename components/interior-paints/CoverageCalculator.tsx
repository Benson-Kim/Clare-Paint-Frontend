'use client';

import React, { useState } from 'react';
import { X, Calculator, Home, Ruler, Info, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoverageCalculatorProps {
  onClose: () => void;
}

interface Room {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  doors: number;
  windows: number;
}

export const CoverageCalculator: React.FC<CoverageCalculatorProps> = ({ onClose }) => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', name: 'Living Room', length: 0, width: 0, height: 8, doors: 2, windows: 2 }
  ]);
  const [coats, setCoats] = useState(2);
  const [coverage, setCoverage] = useState(350); // sq ft per gallon
  const [activeTab, setActiveTab] = useState<'simple' | 'detailed'>('simple');

  const addRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name: `Room ${rooms.length + 1}`,
      length: 0,
      width: 0,
      height: 8,
      doors: 1,
      windows: 1
    };
    setRooms([...rooms, newRoom]);
  };

  const updateRoom = (id: string, field: keyof Room, value: string | number) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, [field]: value } : room
    ));
  };

  const removeRoom = (id: string) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== id));
    }
  };

  const calculateRoomArea = (room: Room) => {
    const wallArea = 2 * (room.length * room.height) + 2 * (room.width * room.height);
    const doorArea = room.doors * 20; // Average door is 7ft x 3ft = 21 sq ft
    const windowArea = room.windows * 15; // Average window is 3ft x 5ft = 15 sq ft
    return Math.max(0, wallArea - doorArea - windowArea);
  };

  const totalArea = rooms.reduce((sum, room) => sum + calculateRoomArea(room), 0);
  const totalAreaWithCoats = totalArea * coats;
  const gallonsNeeded = Math.ceil(totalAreaWithCoats / coverage);
  const quartsNeeded = Math.ceil((totalAreaWithCoats % coverage) / (coverage / 4));

  const estimatedCost = {
    premium: gallonsNeeded * 89.99,
    standard: gallonsNeeded * 69.99,
    budget: gallonsNeeded * 49.99
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Calculator className="w-6 h-6 text-[#5B7B7A]" />
            <div>
              <h2 className="text-2xl font-bold text-[#2C2C2C]">Paint Coverage Calculator</h2>
              <p className="text-gray-600">Calculate exactly how much paint you need</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
            aria-label="Close calculator"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab('simple')}
              className={cn(
                "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                activeTab === 'simple'
                  ? "bg-white text-[#5B7B7A] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              Simple Calculator
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={cn(
                "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                activeTab === 'detailed'
                  ? "bg-white text-[#5B7B7A] shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              Room by Room
            </button>
          </div>

          {activeTab === 'simple' ? (
            /* Simple Calculator */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Total Square Feet to Paint
                  </label>
                  <input
                    type="number"
                    placeholder="Enter total sq ft"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Number of Coats
                  </label>
                  <select
                    value={coats}
                    onChange={(e) => setCoats(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent"
                  >
                    <option value={1}>1 Coat</option>
                    <option value={2}>2 Coats (Recommended)</option>
                    <option value={3}>3 Coats</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            /* Detailed Calculator */
            <div className="space-y-6">
              {/* Room Inputs */}
              <div className="space-y-4">
                {rooms.map((room, index) => (
                  <div key={room.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Home className="w-5 h-5 text-[#5B7B7A]" />
                        <input
                          type="text"
                          value={room.name}
                          onChange={(e) => updateRoom(room.id, 'name', e.target.value)}
                          className="font-medium text-[#2C2C2C] bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-[#5B7B7A] rounded px-2"
                        />
                      </div>
                      {rooms.length > 1 && (
                        <button
                          onClick={() => removeRoom(room.id)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Length (ft)
                        </label>
                        <input
                          type="number"
                          value={room.length || ''}
                          onChange={(e) => updateRoom(room.id, 'length', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Width (ft)
                        </label>
                        <input
                          type="number"
                          value={room.width || ''}
                          onChange={(e) => updateRoom(room.id, 'width', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Height (ft)
                        </label>
                        <input
                          type="number"
                          value={room.height || ''}
                          onChange={(e) => updateRoom(room.id, 'height', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent"
                          placeholder="8"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Doors
                        </label>
                        <input
                          type="number"
                          value={room.doors || ''}
                          onChange={(e) => updateRoom(room.id, 'doors', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent"
                          placeholder="1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Windows
                        </label>
                        <input
                          type="number"
                          value={room.windows || ''}
                          onChange={(e) => updateRoom(room.id, 'windows', Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent"
                          placeholder="1"
                        />
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                      Wall area: {calculateRoomArea(room).toFixed(0)} sq ft
                    </div>
                  </div>
                ))}

                <button
                  onClick={addRoom}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#5B7B7A] hover:text-[#5B7B7A] transition-colors duration-200"
                >
                  + Add Another Room
                </button>
              </div>

              {/* Paint Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Number of Coats
                  </label>
                  <select
                    value={coats}
                    onChange={(e) => setCoats(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent"
                  >
                    <option value={1}>1 Coat</option>
                    <option value={2}>2 Coats (Recommended)</option>
                    <option value={3}>3 Coats</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Paint Coverage (sq ft per gallon)
                  </label>
                  <select
                    value={coverage}
                    onChange={(e) => setCoverage(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B7B7A] focus:border-transparent"
                  >
                    <option value={300}>300 sq ft (Budget Paint)</option>
                    <option value={350}>350 sq ft (Standard Paint)</option>
                    <option value={400}>400 sq ft (Premium Paint)</option>
                    <option value={450}>450 sq ft (Ultra-Premium Paint)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mt-8 bg-[#5B7B7A]/5 border border-[#5B7B7A]/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#2C2C2C] mb-4 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-[#5B7B7A]" />
              <span>Paint Requirements</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5B7B7A] mb-2">
                  {totalArea.toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Total Square Feet</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5B7B7A] mb-2">
                  {gallonsNeeded}
                </div>
                <div className="text-sm text-gray-600">Gallons Needed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5B7B7A] mb-2">
                  {coats}
                </div>
                <div className="text-sm text-gray-600">Coats</div>
              </div>
            </div>

            {/* Cost Estimates */}
            <div className="mt-6">
              <h4 className="font-semibold text-[#2C2C2C] mb-3">Estimated Cost by Paint Quality</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="font-medium text-[#2C2C2C]">Budget Paint</div>
                  <div className="text-2xl font-bold text-[#5B7B7A]">
                    ${estimatedCost.budget.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600">~$50/gallon</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="font-medium text-[#2C2C2C]">Standard Paint</div>
                  <div className="text-2xl font-bold text-[#5B7B7A]">
                    ${estimatedCost.standard.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600">~$70/gallon</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="font-medium text-[#2C2C2C]">Premium Paint</div>
                  <div className="text-2xl font-bold text-[#5B7B7A]">
                    ${estimatedCost.premium.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600">~$90/gallon</div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Pro Tips</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Always buy 10-15% extra paint for touch-ups</li>
                    <li>• Primer may be needed for dramatic color changes</li>
                    <li>• Textured surfaces may require more paint</li>
                    <li>• Consider ceiling paint if painting ceilings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="flex-1 py-3 bg-[#5B7B7A] text-white rounded-lg hover:bg-[#5B7B7A]/90 transition-colors duration-200 font-medium">
              Shop Recommended Paints
            </button>
            <button className="flex-1 py-3 border border-[#5B7B7A] text-[#5B7B7A] rounded-lg hover:bg-[#5B7B7A]/5 transition-colors duration-200 font-medium">
              Save Calculation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};