import { Contest } from "@/types/gallery";

export const mockContests: Contest[] = [
	{
		id: "contest-001",
		name: "Summer Refresh Challenge",
		description:
			"Show us your best summer home refresh project! Transform a room with a fresh coat of paint and win amazing prizes.",
		startDate: "2024-08-01",
		endDate: "2024-08-31",
		theme: "Bright & Airy Spaces",
		prizes: [
			"Gift Card ($500)",
			"Paint Supply Bundle",
			"Featured on Social Media",
		],
		rulesUrl: "/contest-rules-summer-refresh.pdf",
		imageUrl:
			"https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800",
		status: "active",
	},
	{
		id: "contest-002",
		name: "Kids Room Creativity",
		description:
			"Unleash your creativity in your child's room! Submit your most imaginative and colorful kids' room paint projects.",
		startDate: "2024-09-15",
		endDate: "2024-10-15",
		theme: "Playful & Imaginative",
		prizes: ["Tablet", "Custom Mural Kit", "Paint Store Credit ($200)"],
		rulesUrl: "/contest-rules-kids-room.pdf",
		imageUrl:
			"https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800",
		status: "upcoming",
	},
];
