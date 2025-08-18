import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Phone, Mail } from "lucide-react";

const contactOptions = [
	{
		icon: MessageSquare,
		title: "Live Chat",
		description: "Chat with a support agent now. (Mon-Fri, 9am-5pm EST)",
		action: "Start Chat",
		bgColor: "bg-blue-100",
		textColor: "text-blue-800",
		buttonColor: "bg-blue-600 hover:bg-blue-700",
		ariaLabel: "Start a live chat session",
	},
	{
		icon: Phone,
		title: "Phone Support",
		description: "Call us at 1-800-PAINT-IT. (Mon-Fri, 9am-5pm EST)",
		action: "Call Now",
		bgColor: "bg-green-100",
		textColor: "text-green-800",
		buttonColor: "bg-green-600 hover:bg-green-700",
		ariaLabel: "Call our phone support line",
	},
	{
		icon: Mail,
		title: "Email Us",
		description: "Send us an email at support@paintco.com.",
		action: "Send Email",
		bgColor: "bg-orange-100",
		textColor: "text-orange-800",
		buttonColor: "bg-orange-500 hover:bg-orange-600",
		ariaLabel: "Send an email to our support team",
	},
];

export const ContactOptionsGrid = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
			{contactOptions.map((option) => (
				<Card
					key={option.title}
					className="text-center flex flex-col justify-between"
				>
					<CardHeader>
						<div
							className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${option.bgColor}`}
						>
							<option.icon className={`w-8 h-8 ${option.textColor}`} />
						</div>
						<CardTitle className="mt-4 text-ds-primary-charcoal">
							{option.title}
						</CardTitle>
					</CardHeader>
					<CardContent className="flex-grow flex flex-col justify-between">
						<p className="text-ds-neutral-mediumGray mb-6">
							{option.description}
						</p>
						<a
							href="#"
							onClick={(e) => e.preventDefault()} // Mock action
							className={`w-full inline-block px-4 py-2 text-white font-semibold rounded-lg transition-colors duration-200 ${option.buttonColor}`}
							aria-label={option.ariaLabel}
						>
							{option.action}
						</a>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
