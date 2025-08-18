"use client";

import React, { useState } from "react";
import {
	Phone,
	Mail,
	MessageCircle,
	Clock,
	User,
	Calendar,
	CheckCircle,
	ArrowRight,
	Headphones,
	FileText,
	Video,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SupportTicket {
	id: string;
	subject: string;
	priority: "low" | "medium" | "high" | "urgent";
	status: "open" | "in_progress" | "resolved";
	createdAt: string;
	lastUpdate: string;
}

export const TradeSupportContact: React.FC = () => {
	const [activeTab, setActiveTab] = useState<
		"contact" | "tickets" | "resources"
	>("contact");
	const [showContactForm, setShowContactForm] = useState(false);
	const [selectedContactMethod, setSelectedContactMethod] =
		useState<string>("phone");

	const supportHours = [
		{ day: "Monday - Friday", hours: "7:00 AM - 7:00 PM EST" },
		{ day: "Saturday", hours: "8:00 AM - 5:00 PM EST" },
		{ day: "Sunday", hours: "10:00 AM - 4:00 PM EST" },
	];

	const supportTeam = [
		{
			name: "Mike Rodriguez",
			title: "Senior Trade Specialist",
			specialties: ["Volume Pricing", "Project Planning", "Product Selection"],
			phone: "(555) 123-4567",
			email: "mike.rodriguez@paintstore.com",
			image:
				"https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
		{
			name: "Sarah Chen",
			title: "Technical Support Manager",
			specialties: [
				"Application Issues",
				"Product Training",
				"Quality Assurance",
			],
			phone: "(555) 123-4568",
			email: "sarah.chen@paintstore.com",
			image:
				"https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
		{
			name: "David Thompson",
			title: "Account Manager",
			specialties: ["Account Setup", "Credit Terms", "Delivery Coordination"],
			phone: "(555) 123-4569",
			email: "david.thompson@paintstore.com",
			image:
				"https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
	];

	const mockTickets: SupportTicket[] = [
		{
			id: "TKT-001",
			subject: "Color matching for large commercial project",
			priority: "high",
			status: "in_progress",
			createdAt: "2024-01-20",
			lastUpdate: "2024-01-22",
		},
		{
			id: "TKT-002",
			subject: "Delivery scheduling for job site",
			priority: "medium",
			status: "open",
			createdAt: "2024-01-18",
			lastUpdate: "2024-01-18",
		},
		{
			id: "TKT-003",
			subject: "Invoice discrepancy - Order #BO-2024-001",
			priority: "low",
			status: "resolved",
			createdAt: "2024-01-15",
			lastUpdate: "2024-01-16",
		},
	];

	const resources = [
		{
			title: "Product Application Guides",
			description: "Step-by-step guides for professional application",
			type: "PDF",
			downloadUrl: "#",
		},
		{
			title: "Color Matching Specifications",
			description: "Technical specifications for accurate color matching",
			type: "PDF",
			downloadUrl: "#",
		},
		{
			title: "Safety Data Sheets (SDS)",
			description: "Complete safety information for all products",
			type: "PDF",
			downloadUrl: "#",
		},
		{
			title: "Training Video Library",
			description: "Professional techniques and best practices",
			type: "Video",
			downloadUrl: "#",
		},
	];

	const getPriorityColor = (priority: SupportTicket["priority"]) => {
		switch (priority) {
			case "urgent":
				return "bg-red-100 text-red-800 border-red-200";
			case "high":
				return "bg-orange-100 text-orange-800 border-orange-200";
			case "medium":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "low":
				return "bg-green-100 text-green-800 border-green-200";
		}
	};

	const getStatusColor = (status: SupportTicket["status"]) => {
		switch (status) {
			case "open":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "in_progress":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "resolved":
				return "bg-green-100 text-green-800 border-green-200";
		}
	};

	return (
		<div className="bg-ds-neutral-lightGray/10 border-t border-ds-neutral-lightGray">
			<div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-20">
				<div className="text-center mb-8">
					<h2 className="text-3xl md:text-4xl font-bold text-ds-primary-charcoal mb-4">
						Dedicated Trade Support
					</h2>
					<p className="text-lg text-ds-neutral-mediumGray max-w-3xl mx-auto">
						Get expert assistance from our specialized trade support team. We
						understand your business needs and are here to help you succeed.
					</p>
				</div>

				{/* Tab Navigation */}
				<div className="flex justify-center space-x-2 bg-ds-neutral-white rounded-lg p-2 mb-8 max-w-md mx-auto">
					{[
						{
							id: "contact",
							label: "Contact",
							icon: <Phone className="w-4 h-4" />,
						},
						{
							id: "tickets",
							label: "Support Tickets",
							icon: <MessageCircle className="w-4 h-4" />,
						},
						{
							id: "resources",
							label: "Resources",
							icon: <FileText className="w-4 h-4" />,
						},
					].map((tab) => (
						<button
							key={tab.id}
							onClick={() =>
								setActiveTab(tab.id as "contact" | "tickets" | "resources")
							}
							className={cn(
								"flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
								activeTab === tab.id
									? "bg-ds-primary-sage text-ds-neutral-white shadow-sm"
									: "text-ds-neutral-mediumGray hover:text-ds-primary-charcoal"
							)}
						>
							{tab.icon}
							<span>{tab.label}</span>
						</button>
					))}
				</div>

				{/* Contact Tab */}
				{activeTab === "contact" && (
					<div className="space-y-8">
						{/* Contact Methods */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8 text-center hover:shadow-md transition-shadow duration-200">
								<div className="w-16 h-16 bg-ds-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
									<Phone className="w-8 h-8 text-ds-primary-sage" />
								</div>
								<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
									Phone Support
								</h3>
								<p className="text-ds-neutral-mediumGray mb-4">
									Speak directly with our trade specialists
								</p>
								<p className="text-xl font-bold text-ds-primary-sage mb-4">
									(555) 123-TRADE
								</p>
								<button className="w-full py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
									Call Now
								</button>
							</div>

							<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8 text-center hover:shadow-md transition-shadow duration-200">
								<div className="w-16 h-16 bg-ds-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
									<Mail className="w-8 h-8 text-ds-primary-sage" />
								</div>
								<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
									Email Support
								</h3>
								<p className="text-ds-neutral-mediumGray mb-4">
									Get detailed assistance via email
								</p>
								<p className="text-lg font-medium text-ds-primary-sage mb-4">
									trade@paintstore.com
								</p>
								<button
									onClick={() => setShowContactForm(true)}
									className="w-full py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
								>
									Send Message
								</button>
							</div>

							<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8 text-center hover:shadow-md transition-shadow duration-200">
								<div className="w-16 h-16 bg-ds-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
									<Video className="w-8 h-8 text-ds-primary-sage" />
								</div>
								<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
									Video Consultation
								</h3>
								<p className="text-ds-neutral-mediumGray mb-4">
									Schedule a virtual meeting with experts
								</p>
								<p className="text-lg font-medium text-ds-primary-sage mb-4">
									30-60 minutes
								</p>
								<button className="w-full py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
									Schedule Call
								</button>
							</div>
						</div>

						{/* Support Hours */}
						<div className="bg-ds-primary-cream/30 border border-ds-accent-warmBeige/20 rounded-lg p-8">
							<div className="flex items-center space-x-4 mb-4">
								<Clock className="w-6 h-6 text-ds-primary-sage" />
								<h3 className="text-xl font-bold text-ds-primary-charcoal">
									Support Hours
								</h3>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								{supportHours.map((schedule, index) => (
									<div key={index} className="text-center">
										<p className="font-semibold text-ds-primary-charcoal">
											{schedule.day}
										</p>
										<p className="text-ds-neutral-darkSlate">
											{schedule.hours}
										</p>
									</div>
								))}
							</div>
							<div className="text-center mt-4">
								<p className="text-sm text-ds-neutral-mediumGray">
									Emergency support available 24/7 for critical issues
								</p>
							</div>
						</div>

						{/* Support Team */}
						<div>
							<h3 className="text-xl font-bold text-ds-primary-charcoal mb-8 text-center">
								Meet Your Trade Support Team
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								{supportTeam.map((member, index) => (
									<div
										key={index}
										className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8 text-center"
									>
										<Image
											src={member.image}
											alt={member.name}
											width={80}
											height={80}
											className="rounded-full mx-auto mb-4 object-cover"
											loading="lazy"
										/>
										<h4 className="font-semibold text-ds-primary-charcoal mb-2">
											{member.name}
										</h4>
										<p className="text-sm text-ds-neutral-mediumGray mb-4">
											{member.title}
										</p>
										<div className="space-y-2 mb-4">
											{member.specialties.map((specialty, i) => (
												<span
													key={i}
													className="inline-block text-xs bg-ds-primary-sage/10 text-ds-primary-sage px-2 py-2 rounded mr-2"
												>
													{specialty}
												</span>
											))}
										</div>
										<div className="space-y-2">
											<a
												href={`tel:${member.phone}`}
												className="flex items-center justify-center space-x-2 text-sm text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200"
											>
												<Phone className="w-4 h-4" />
												<span>{member.phone}</span>
											</a>
											<a
												href={`mailto:${member.email}`}
												className="flex items-center justify-center space-x-2 text-sm text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200"
											>
												<Mail className="w-4 h-4" />
												<span>{member.email}</span>
											</a>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				{/* Support Tickets Tab */}
				{activeTab === "tickets" && (
					<div className="space-y-8">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-bold text-ds-primary-charcoal">
								Your Support Tickets
							</h3>
							<button
								onClick={() => setShowContactForm(true)}
								className="flex items-center space-x-4 px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
							>
								<MessageCircle className="w-4 h-4" />
								<span>New Ticket</span>
							</button>
						</div>

						<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg overflow-hidden">
							<table className="w-full">
								<thead className="bg-ds-neutral-lightGray/20">
									<tr>
										<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
											Ticket ID
										</th>
										<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
											Subject
										</th>
										<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
											Priority
										</th>
										<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
											Status
										</th>
										<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
											Last Update
										</th>
										<th className="text-left p-4 text-sm font-semibold text-ds-primary-charcoal">
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{mockTickets.map((ticket) => (
										<tr
											key={ticket.id}
											className="border-b border-ds-neutral-lightGray"
										>
											<td className="p-4 text-sm text-ds-primary-charcoal font-medium">
												{ticket.id}
											</td>
											<td className="p-4 text-sm text-ds-neutral-darkSlate">
												{ticket.subject}
											</td>
											<td className="p-4">
												<span
													className={cn(
														"px-2 py-2 rounded-full text-xs font-medium border",
														getPriorityColor(ticket.priority)
													)}
												>
													{ticket.priority.charAt(0).toUpperCase() +
														ticket.priority.slice(1)}
												</span>
											</td>
											<td className="p-4">
												<span
													className={cn(
														"px-2 py-2 rounded-full text-xs font-medium border",
														getStatusColor(ticket.status)
													)}
												>
													{ticket.status
														.replace("_", " ")
														.charAt(0)
														.toUpperCase() +
														ticket.status.replace("_", " ").slice(1)}
												</span>
											</td>
											<td className="p-4 text-sm text-ds-neutral-darkSlate">
												{new Date(ticket.lastUpdate).toLocaleDateString()}
											</td>
											<td className="p-4">
												<button className="text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200">
													View
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{/* Resources Tab */}
				{activeTab === "resources" && (
					<div className="space-y-8">
						<h3 className="text-xl font-bold text-ds-primary-charcoal text-center">
							Trade Resources & Documentation
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{resources.map((resource, index) => (
								<div
									key={index}
									className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8 hover:shadow-md transition-shadow duration-200"
								>
									<div className="flex items-start space-x-4">
										<div className="w-12 h-12 bg-ds-primary-sage/10 rounded-lg flex items-center justify-center flex-shrink-0">
											{resource.type === "PDF" ? (
												<FileText className="w-6 h-6 text-ds-primary-sage" />
											) : (
												<Video className="w-6 h-6 text-ds-primary-sage" />
											)}
										</div>
										<div className="flex-1">
											<h4 className="font-semibold text-ds-primary-charcoal mb-2">
												{resource.title}
											</h4>
											<p className="text-sm text-ds-neutral-mediumGray mb-4">
												{resource.description}
											</p>
											<div className="flex items-center justify-between">
												<span className="text-xs bg-ds-neutral-lightGray/50 text-ds-neutral-mediumGray px-2 py-2 rounded">
													{resource.type}
												</span>
												<button className="flex items-center space-x-2 text-ds-primary-sage hover:text-ds-primary-sage/80 transition-colors duration-200 text-sm font-medium">
													<span>Access</span>
													<ArrowRight className="w-4 h-4" />
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Contact Form Modal */}
				{showContactForm && (
					<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
						<div className="bg-ds-neutral-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
							<div className="flex items-center justify-between p-8 border-b border-ds-neutral-lightGray">
								<h3 className="text-xl font-bold text-ds-primary-charcoal">
									Contact Trade Support
								</h3>
								<button
									onClick={() => setShowContactForm(false)}
									className="p-2 text-ds-neutral-mediumGray hover:text-red-500 transition-colors duration-200"
								>
									<X className="w-5 h-5" />
								</button>
							</div>
							<div className="p-8 space-y-4">
								<div>
									<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
										Subject
									</label>
									<input
										type="text"
										className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										placeholder="Brief description of your inquiry"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
										Priority Level
									</label>
									<select className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent">
										<option value="low">Low - General inquiry</option>
										<option value="medium">Medium - Project assistance</option>
										<option value="high">High - Urgent project need</option>
										<option value="urgent">Urgent - Critical issue</option>
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-ds-neutral-darkSlate mb-2">
										Message
									</label>
									<textarea
										rows={6}
										className="w-full px-4 py-2 border border-ds-neutral-lightGray rounded-lg focus:ring-2 focus:ring-ds-primary-sage focus:border-transparent"
										placeholder="Please provide details about your inquiry..."
									/>
								</div>
								<button className="w-full py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
									Submit Support Request
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
