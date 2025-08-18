"use client";

import React from "react";
import { Home, Palette, Shield, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";

interface InteriorPaintHeroProps {
	onRoomSelect: (roomType: string) => void;
}

export const InteriorPaintHero: React.FC<InteriorPaintHeroProps> = ({
	onRoomSelect,
}) => {
	const roomTypes = [
		{
			id: "living-room",
			name: "Living Room",
			description: "Durable paints for high-traffic areas",
			image:
				"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
			icon: <Home className="w-6 h-6" />,
		},
		{
			id: "bedroom",
			name: "Bedroom",
			description: "Calming colors for peaceful sleep",
			image:
				"https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800",
			icon: <Sparkles className="w-6 h-6" />,
		},
		{
			id: "kitchen",
			name: "Kitchen",
			description: "Easy-clean finishes for cooking areas",
			image:
				"https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
			icon: <Shield className="w-6 h-6" />,
		},
		{
			id: "bathroom",
			name: "Bathroom",
			description: "Moisture-resistant formulations",
			image:
				"https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=800",
			icon: <Palette className="w-6 h-6" />,
		},
	];

	const features = [
		{
			icon: <Palette className="w-6 h-6" />,
			title: "Room-Specific Formulas",
			description: "Specially designed for each room's unique needs",
		},
		{
			icon: <Shield className="w-6 h-6" />,
			title: "Zero-VOC Options",
			description: "Safe for your family and indoor air quality",
		},
		{
			icon: <Sparkles className="w-6 h-6" />,
			title: "Premium Finishes",
			description: "From flat to semi-gloss for every application",
		},
		{
			icon: <Home className="w-6 h-6" />,
			title: "Color Coordination",
			description: "Tools to create perfect color schemes",
		},
	];

	return (
		<div className="relative bg-gradient-to-r from-ds-primary-sage to-ds-primary-charcoal text-white overflow-hidden">
			<div className="absolute inset-0 bg-black/20" />
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Transform Every Room with Premium Interior Paints
					</h1>
					<p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
						Discover our curated collection of interior paints designed for
						every room in your home. From calming bedrooms to vibrant kitchens,
						find the perfect color and finish.
					</p>
				</div>

				{/* Room Selection */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
					{roomTypes.map((room) => (
						<button
							key={room.id}
							onClick={() => onRoomSelect(room.id)}
							className="group bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-200 text-left"
						>
							<div className="relative h-32 mb-4 rounded-lg overflow-hidden">
								<Image
									src={room.image}
									alt={room.name}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-300"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-200" />
								<div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
									{room.icon}
								</div>
							</div>
							<h3 className="text-lg font-semibold mb-2">{room.name}</h3>
							<p className="text-white/80 text-sm mb-3">{room.description}</p>
							<div className="flex items-center space-x-2 text-white/90 group-hover:text-white transition-colors duration-200">
								<span className="text-sm font-medium">Explore Options</span>
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
							</div>
						</button>
					))}
				</div>

				{/* Features */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<div key={index} className="text-center group">
							<div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 group-hover:bg-white/20 transition-colors duration-200">
								<div className="text-white">{feature.icon}</div>
							</div>
							<h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
							<p className="text-white/80 text-sm">{feature.description}</p>
						</div>
					))}
				</div>

				{/* CTA Section */}
				<div className="text-center mt-12">
					<div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4">
						<span className="text-white/90">
							Need help choosing the right paint?
						</span>
						<button className="bg-white text-ds-primary-sage px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-200">
							Get Room Recommendations
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
