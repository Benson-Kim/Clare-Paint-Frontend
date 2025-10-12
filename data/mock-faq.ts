import { FAQItem } from "@/types/faq";

export const mockFAQData: FAQItem[] = [
	{
		id: "faq-001",
		question: "What is the best paint for a living room?",
		answer:
			"For living rooms, we recommend our Premium Interior Latex Paint. It offers excellent durability, washability, and a smooth finish, perfect for high-traffic areas. Eggshell or satin finishes are popular choices for their subtle sheen and easy maintenance.",
		category: "product_questions",
		keywords: ["living room", "interior paint", "best paint", "finish"],
		helpfulVotes: 45,
		unhelpfulVotes: 2,
		relatedQuestions: ["faq-002", "faq-003"],
	},
	{
		id: "faq-002",
		question: "How many gallons of paint do I need for a room?",
		answer:
			"A general rule of thumb is that one gallon of paint covers approximately 350-400 square feet with one coat. To calculate your needs, measure the length and height of each wall, multiply them to get the square footage, and add them together. Subtract the area of windows and doors. We recommend two coats for optimal coverage and durability. Our online paint calculator can help you get a precise estimate!",
		category: "product_questions",
		keywords: ["gallons", "coverage", "calculator", "quantity"],
		helpfulVotes: 60,
		unhelpfulVotes: 5,
		relatedQuestions: ["faq-001", "faq-003"],
	},
	{
		id: "faq-003",
		question:
			"What is the difference between matte, eggshell, and satin finishes?",
		answer:
			"These terms refer to the sheen level of the paint. Matte has the least shine, offering a smooth, non-reflective surface that hides imperfections well. Eggshell has a very subtle, low sheen, resembling an eggshell, and is more durable than matte. Satin has a soft, velvety sheen, is highly durable, and easy to clean, making it ideal for high-traffic areas like kitchens and bathrooms. Semi-gloss and gloss have progressively higher sheens and are best for trim, doors, and cabinets.",
		category: "product_questions",
		keywords: [
			"finish",
			"sheen",
			"matte",
			"eggshell",
			"satin",
			"semi-gloss",
			"gloss",
		],
		helpfulVotes: 75,
		unhelpfulVotes: 3,
		relatedQuestions: ["faq-001"],
	},
	{
		id: "faq-004",
		question: "What is your return policy?",
		answer:
			"We offer a 30-day return policy for unopened, unused paint and supplies in their original condition. Custom-tinted paints are non-returnable. Please bring your original receipt for a full refund or exchange. For online orders, please contact customer service to arrange a return.",
		category: "shipping_returns",
		keywords: ["return", "policy", "refund", "exchange"],
		helpfulVotes: 30,
		unhelpfulVotes: 1,
		relatedQuestions: ["faq-005"],
	},
	{
		id: "faq-005",
		question: "How long does shipping take?",
		answer:
			"Standard shipping typically takes 5-7 business days. Expedited shipping is available for 2-3 business days, and overnight shipping delivers on the next business day. Delivery times may vary based on your location and product availability.",
		category: "shipping_returns",
		keywords: ["shipping", "delivery", "time", "expedited", "overnight"],
		helpfulVotes: 25,
		unhelpfulVotes: 0,
		relatedQuestions: ["faq-004"],
	},
	{
		id: "faq-006",
		question: "How can I get help with color matching?",
		answer:
			"We offer several resources for color matching! You can use our online color matching tool by uploading a photo, order free color samples to test at home, or book a virtual or in-home color consultation with our expert designers. For precise matches, visit one of our stores with a sample of the color you wish to match.",
		category: "color_matching",
		keywords: ["color match", "consultation", "samples", "tool"],
		helpfulVotes: 55,
		unhelpfulVotes: 1,
		relatedQuestions: ["faq-007"],
	},
	{
		id: "faq-007",
		question: "Can I get a custom paint color mixed?",
		answer:
			"Yes, we offer custom paint color mixing services! Bring in a sample of the color you want to match (e.g., a fabric swatch, a piece of trim, or a photo), and our in-store experts will use our advanced color-matching technology to create your perfect custom shade. Please note that custom-mixed paints are non-returnable.",
		category: "color_matching",
		keywords: ["custom color", "mixed paint", "match", "shade"],
		helpfulVotes: 40,
		unhelpfulVotes: 0,
		relatedQuestions: ["faq-006"],
	},
	{
		id: "faq-008",
		question: "My paint looks different on the wall than in the can. Why?",
		answer:
			"Several factors can influence how paint color appears. Lighting (natural vs. artificial, warm vs. cool), surrounding colors in the room, and the texture of the wall can all affect perception. Always test a sample on your wall and observe it throughout the day under different lighting conditions before committing to the entire room.",
		category: "color_matching",
		keywords: ["color difference", "lighting", "swatch", "sample"],
		helpfulVotes: 38,
		unhelpfulVotes: 1,
		relatedQuestions: ["faq-006"],
	},
	{
		id: "faq-009",
		question: "I am having trouble applying the paint. What should I do?",
		answer:
			"Ensure your surface is properly prepared (clean, dry, smooth). Check the paint can for specific application instructions, including recommended tools (brush, roller, sprayer) and temperature/humidity conditions. If the paint is too thick, it might need thinning (check the label first, as not all paints can be thinned). Watch our application guide videos for step-by-step tutorials.",
		category: "technical_support",
		keywords: ["application", "trouble", "paint", "thick", "thinning", "guide"],
		helpfulVotes: 28,
		unhelpfulVotes: 0,
		relatedQuestions: ["faq-010"],
	},
	{
		id: "faq-010",
		question: "How do I clean paint brushes and rollers?",
		answer:
			"For latex or water-based paints, rinse brushes and rollers thoroughly with warm, soapy water until the water runs clear. Squeeze out excess water and reshape brushes before drying. For oil-based paints, use mineral spirits or a paint thinner for cleaning, then wash with soap and water. Always clean tools immediately after use for best results.",
		category: "technical_support",
		keywords: ["clean", "brushes", "rollers", "latex", "oil-based"],
		helpfulVotes: 35,
		unhelpfulVotes: 1,
		relatedQuestions: ["faq-009"],
	},
];
