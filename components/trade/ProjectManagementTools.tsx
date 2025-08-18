"use client";

import React, { useState } from "react";
import {
	FolderOpen,
	Calendar,
	Users,
	MapPin,
	Calculator,
	FileText,
	Clock,
	DollarSign,
	CheckCircle,
	AlertTriangle,
	Plus,
	Eye,
	Edit,
	Trash2,
	Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
	id: string;
	name: string;
	client: string;
	address: string;
	status: "planning" | "in_progress" | "completed" | "on_hold";
	startDate: string;
	endDate: string;
	budget: number;
	spent: number;
	paintUsed: number;
	paintOrdered: number;
	crew: string[];
	notes: string;
}

export const ProjectManagementTools: React.FC = () => {
	const [activeTab, setActiveTab] = useState<
		"overview" | "projects" | "calendar" | "reports"
	>("overview");
	const [projects, setProjects] = useState<Project[]>([
		{
			id: "1",
			name: "Downtown Office Complex",
			client: "ABC Corporation",
			address: "123 Business Ave, Downtown",
			status: "in_progress",
			startDate: "2024-01-15",
			endDate: "2024-02-28",
			budget: 45000,
			spent: 32000,
			paintUsed: 85,
			paintOrdered: 120,
			crew: ["Mike Johnson", "Sarah Davis", "Tom Wilson"],
			notes: "Client requested color change for lobby area",
		},
		{
			id: "2",
			name: "Residential Exterior Refresh",
			client: "Johnson Family",
			address: "456 Maple Street, Suburbs",
			status: "planning",
			startDate: "2024-02-01",
			endDate: "2024-02-15",
			budget: 12000,
			spent: 0,
			paintUsed: 0,
			paintOrdered: 35,
			crew: ["Mike Johnson", "Alex Brown"],
			notes: "Weather dependent - monitor forecast",
		},
		{
			id: "3",
			name: "Restaurant Chain Renovation",
			client: "Tasty Bites Inc.",
			address: "Multiple Locations",
			status: "completed",
			startDate: "2023-12-01",
			endDate: "2024-01-10",
			budget: 75000,
			spent: 73500,
			paintUsed: 180,
			paintOrdered: 185,
			crew: ["Sarah Davis", "Tom Wilson", "Lisa Chen", "Mark Rodriguez"],
			notes: "Completed ahead of schedule",
		},
	]);

	const [showNewProjectForm, setShowNewProjectForm] = useState(false);

	const getStatusColor = (status: Project["status"]) => {
		switch (status) {
			case "planning":
				return "bg-blue-100 text-blue-800 border-blue-200";
			case "in_progress":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "completed":
				return "bg-green-100 text-green-800 border-green-200";
			case "on_hold":
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const getStatusIcon = (status: Project["status"]) => {
		switch (status) {
			case "planning":
				return <Calendar className="w-4 h-4" />;
			case "in_progress":
				return <Clock className="w-4 h-4" />;
			case "completed":
				return <CheckCircle className="w-4 h-4" />;
			case "on_hold":
				return <AlertTriangle className="w-4 h-4" />;
			default:
				return <FolderOpen className="w-4 h-4" />;
		}
	};

	const calculateProgress = (project: Project) => {
		return Math.round((project.spent / project.budget) * 100);
	};

	const totalBudget = projects.reduce(
		(sum, project) => sum + project.budget,
		0
	);
	const totalSpent = projects.reduce((sum, project) => sum + project.spent, 0);
	const totalPaintUsed = projects.reduce(
		(sum, project) => sum + project.paintUsed,
		0
	);
	const activeProjects = projects.filter(
		(p) => p.status === "in_progress"
	).length;

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<FolderOpen className="w-6 h-6 text-ds-primary-sage" />
					<h2 className="text-2xl font-bold text-ds-primary-charcoal">
						Project Management Tools
					</h2>
				</div>
				<button
					onClick={() => setShowNewProjectForm(true)}
					className="flex items-center space-x-4 px-8 py-2 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium"
				>
					<Plus className="w-4 h-4" />
					<span>New Project</span>
				</button>
			</div>

			{/* Tab Navigation */}
			<div className="flex space-x-2 bg-ds-neutral-lightGray/20 rounded-lg p-2">
				{[
					{
						id: "overview",
						label: "Overview",
						icon: <FolderOpen className="w-4 h-4" />,
					},
					{
						id: "projects",
						label: "Projects",
						icon: <FileText className="w-4 h-4" />,
					},
					{
						id: "calendar",
						label: "Calendar",
						icon: <Calendar className="w-4 h-4" />,
					},
					{
						id: "reports",
						label: "Reports",
						icon: <Download className="w-4 h-4" />,
					},
				].map((tab) => (
					<button
						key={tab.id}
						onClick={() =>
							setActiveTab(
								tab.id as "overview" | "projects" | "calendar" | "reports"
							)
						}
						className={cn(
							"flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
							activeTab === tab.id
								? "bg-ds-neutral-white text-ds-primary-sage shadow-sm"
								: "text-ds-neutral-mediumGray hover:text-ds-primary-charcoal"
						)}
					>
						{tab.icon}
						<span>{tab.label}</span>
					</button>
				))}
			</div>

			{/* Overview Tab */}
			{activeTab === "overview" && (
				<div className="space-y-8">
					{/* Stats Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-4">
							<div className="flex items-center space-x-4 mb-4">
								<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
									<FolderOpen className="w-5 h-5 text-blue-600" />
								</div>
								<div>
									<p className="text-2xl font-bold text-ds-primary-charcoal">
										{projects.length}
									</p>
									<p className="text-sm text-ds-neutral-mediumGray">
										Total Projects
									</p>
								</div>
							</div>
						</div>

						<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-4">
							<div className="flex items-center space-x-4 mb-4">
								<div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
									<Clock className="w-5 h-5 text-yellow-600" />
								</div>
								<div>
									<p className="text-2xl font-bold text-ds-primary-charcoal">
										{activeProjects}
									</p>
									<p className="text-sm text-ds-neutral-mediumGray">
										Active Projects
									</p>
								</div>
							</div>
						</div>

						<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-4">
							<div className="flex items-center space-x-4 mb-4">
								<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
									<DollarSign className="w-5 h-5 text-green-600" />
								</div>
								<div>
									<p className="text-2xl font-bold text-ds-primary-charcoal">
										${totalBudget.toLocaleString()}
									</p>
									<p className="text-sm text-ds-neutral-mediumGray">
										Total Budget
									</p>
								</div>
							</div>
						</div>

						<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-4">
							<div className="flex items-center space-x-4 mb-4">
								<div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
									<Calculator className="w-5 h-5 text-purple-600" />
								</div>
								<div>
									<p className="text-2xl font-bold text-ds-primary-charcoal">
										{totalPaintUsed}
									</p>
									<p className="text-sm text-ds-neutral-mediumGray">
										Gallons Used
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Recent Projects */}
					<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8">
						<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
							Recent Projects
						</h3>
						<div className="space-y-4">
							{projects.slice(0, 3).map((project) => (
								<div
									key={project.id}
									className="flex items-center justify-between p-4 bg-ds-neutral-lightGray/10 rounded-lg"
								>
									<div className="flex items-center space-x-4">
										<div
											className={cn(
												"flex items-center space-x-2 px-2 py-2 rounded-full text-xs font-medium border",
												getStatusColor(project.status)
											)}
										>
											{getStatusIcon(project.status)}
											<span className="capitalize">
												{project.status.replace("_", " ")}
											</span>
										</div>
										<div>
											<h4 className="font-medium text-ds-primary-charcoal">
												{project.name}
											</h4>
											<p className="text-sm text-ds-neutral-mediumGray">
												{project.client}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-bold text-ds-primary-charcoal">
											${project.budget.toLocaleString()}
										</p>
										<p className="text-sm text-ds-neutral-mediumGray">
											{calculateProgress(project)}% complete
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Projects Tab */}
			{activeTab === "projects" && (
				<div className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{projects.map((project) => (
							<div
								key={project.id}
								className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
							>
								<div className="flex items-center justify-between mb-4">
									<div
										className={cn(
											"flex items-center space-x-2 px-2 py-2 rounded-full text-xs font-medium border",
											getStatusColor(project.status)
										)}
									>
										{getStatusIcon(project.status)}
										<span className="capitalize">
											{project.status.replace("_", " ")}
										</span>
									</div>
									<div className="flex items-center space-x-2">
										<button className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200">
											<Eye className="w-4 h-4" />
										</button>
										<button className="p-2 text-ds-neutral-mediumGray hover:text-ds-primary-sage transition-colors duration-200">
											<Edit className="w-4 h-4" />
										</button>
									</div>
								</div>

								<h3 className="font-semibold text-ds-primary-charcoal mb-2">
									{project.name}
								</h3>
								<p className="text-sm text-ds-neutral-mediumGray mb-4">
									{project.client}
								</p>
								<p className="text-xs text-ds-neutral-mediumGray mb-4 flex items-center space-x-2">
									<MapPin className="w-3 h-3" />
									<span>{project.address}</span>
								</p>

								<div className="space-y-2 mb-4">
									<div className="flex justify-between text-sm">
										<span className="text-ds-neutral-mediumGray">Budget:</span>
										<span className="font-medium text-ds-primary-charcoal">
											${project.budget.toLocaleString()}
										</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-ds-neutral-mediumGray">Spent:</span>
										<span className="font-medium text-ds-primary-charcoal">
											${project.spent.toLocaleString()}
										</span>
									</div>
									<div className="w-full bg-ds-neutral-lightGray rounded-full h-2">
										<div
											className="bg-ds-primary-sage h-2 rounded-full transition-all duration-300"
											style={{ width: `${calculateProgress(project)}%` }}
										/>
									</div>
								</div>

								<div className="flex items-center space-x-4 text-xs text-ds-neutral-mediumGray">
									<div className="flex items-center space-x-2">
										<Users className="w-3 h-3" />
										<span>{project.crew.length} crew</span>
									</div>
									<div className="flex items-center space-x-2">
										<Calculator className="w-3 h-3" />
										<span>{project.paintUsed}gal used</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Calendar Tab */}
			{activeTab === "calendar" && (
				<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8">
					<div className="text-center py-8">
						<Calendar className="w-16 h-16 text-ds-neutral-lightGray mx-auto mb-4" />
						<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
							Project Calendar
						</h3>
						<p className="text-ds-neutral-mediumGray mb-8">
							Visual timeline and scheduling for all your projects
						</p>
						<button className="px-8 py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
							Launch Calendar View
						</button>
					</div>
				</div>
			)}

			{/* Reports Tab */}
			{activeTab === "reports" && (
				<div className="space-y-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8">
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								Financial Summary
							</h3>
							<div className="space-y-4">
								<div className="flex justify-between">
									<span className="text-ds-neutral-mediumGray">
										Total Revenue:
									</span>
									<span className="font-bold text-ds-primary-charcoal">
										${totalBudget.toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-ds-neutral-mediumGray">
										Total Spent:
									</span>
									<span className="font-bold text-ds-primary-charcoal">
										${totalSpent.toLocaleString()}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-ds-neutral-mediumGray">
										Profit Margin:
									</span>
									<span className="font-bold text-green-600">
										{Math.round(
											((totalBudget - totalSpent) / totalBudget) * 100
										)}
										%
									</span>
								</div>
							</div>
						</div>

						<div className="bg-ds-neutral-white border border-ds-neutral-lightGray rounded-lg p-8">
							<h3 className="text-lg font-semibold text-ds-primary-charcoal mb-4">
								Material Usage
							</h3>
							<div className="space-y-4">
								<div className="flex justify-between">
									<span className="text-ds-neutral-mediumGray">
										Paint Used:
									</span>
									<span className="font-bold text-ds-primary-charcoal">
										{totalPaintUsed} gallons
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-ds-neutral-mediumGray">
										Avg per Project:
									</span>
									<span className="font-bold text-ds-primary-charcoal">
										{Math.round(totalPaintUsed / projects.length)} gallons
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-ds-neutral-mediumGray">
										Efficiency:
									</span>
									<span className="font-bold text-green-600">92%</span>
								</div>
							</div>
						</div>
					</div>

					<div className="flex space-x-4">
						<button className="flex items-center space-x-4 px-8 py-4 bg-ds-primary-sage text-ds-neutral-white rounded-lg hover:bg-ds-primary-sage/90 transition-colors duration-200 font-medium">
							<Download className="w-4 h-4" />
							<span>Export Report</span>
						</button>
						<button className="flex items-center space-x-4 px-8 py-4 border border-ds-primary-sage text-ds-primary-sage rounded-lg hover:bg-ds-primary-sage/5 transition-colors duration-200 font-medium">
							<FileText className="w-4 h-4" />
							<span>Generate Invoice</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
