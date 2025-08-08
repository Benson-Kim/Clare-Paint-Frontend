export interface FooterSection {
	title: string;
	links: FooterLink[];
}

export interface FooterLink {
	label: string;
	href: string;
	external?: boolean;
	description?: string;
	icon?: React.ReactNode;
}

export interface ContactInfo {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
	href: string;
	description?: string;
}

export interface SocialLink {
	icon: React.ComponentType<{ className?: string }>;
	href: string;
	label: string;
	color: string;
	platform:
		| "facebook"
		| "instagram"
		| "twitter"
		| "youtube"
		| "linkedin"
		| "pinterest";
}

export interface TrustSignal {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	link?: string;
}

export interface BusinessHours {
	day: string;
	hours: string;
	isToday?: boolean;
}

export interface NewsletterFormData {
	email: string;
	preferences?: string[];
	firstName?: string;
	lastName?: string;
}

export interface NewsletterState {
	status: "idle" | "loading" | "success" | "error";
	message: string;
	email: string;
}

export interface FooterProps {
	id?: string;
	className?: string;
	variant?: "default" | "minimal" | "checkout";
	showNewsletter?: boolean;
	showTrustSignals?: boolean;
	showSocialMedia?: boolean;
	compactMode?: boolean;
}

export interface FooterAnalytics {
	newsletterSignups: number;
	linkClicks: Record<string, number>;
	socialMediaClicks: Record<string, number>;
	contactInteractions: number;
}

// Newsletter subscription preferences
export interface NewsletterPreferences {
	colorTrends: boolean;
	productUpdates: boolean;
	exclusiveOffers: boolean;
	diyTips: boolean;
	professionalContent: boolean;
}

// Footer configuration for different page types
export interface FooterConfig {
	showNewsletter: boolean;
	showTrustSignals: boolean;
	showFullNavigation: boolean;
	compactMode: boolean;
	customSections?: FooterSection[];
}
