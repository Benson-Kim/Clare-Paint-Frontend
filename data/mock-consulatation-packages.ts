import { ConsultationPackage } from "@/types/consultation";

export const mockConsultationPackages: ConsultationPackage[] = [
	{
		id: "virtual-basic",
		name: "Virtual Color Kickstart",
		type: "virtual",
		price: 75.0,
		description:
			"A quick virtual session to get your color journey started. Perfect for small projects or initial ideas.",
		features: [
			"30-minute video call",
			"Personalized color palette (3-5 colors)",
			"Digital mood board",
			"Follow-up email with recommendations",
		],
		duration: "30 minutes",
		image:
			"https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800",
	},
	{
		id: "in-home-standard",
		name: "In-Home Color Harmony",
		type: "in-home",
		price: 250.0,
		description:
			"Comprehensive in-home consultation for a cohesive color scheme throughout your space.",
		features: [
			"90-minute in-home visit",
			"Detailed color scheme for up to 3 rooms",
			"Paint sample recommendations",
			"Lighting analysis",
			"Post-consultation summary report",
		],
		duration: "90 minutes",
		image:
			"https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
	},
	{
		id: "commercial-pro",
		name: "Commercial Space Transformation",
		type: "commercial",
		price: 500.0,
		description:
			"Expert color strategy for commercial properties, focusing on brand identity and functionality.",
		features: [
			"2-hour on-site consultation",
			"Brand-aligned color palette",
			"Durability and maintenance recommendations",
			"Project timeline guidance",
			"Priority support",
		],
		duration: "120 minutes",
		image:
			"https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800",
	},
];
