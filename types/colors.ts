export interface ColorPalette {
	id: string;
	name: string;
	description: string;
	colors: { hex: string; name: string }[];
	category: string;
	popularity: number;
}
