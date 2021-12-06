export interface NFT {
	base: NFTPiece;
	eyes: NFTPiece;
	mouth: NFTPiece;
}

export interface NFTPiece {
	url: string;
	name: string;
	index: number;
}

export const bases: NFTPiece[] = [
	{
		url: "/pieces/base-alt-icingbrown.png",
		name: "Donut Icing Brown",
		index: 50,
	},
	{
		url: "/pieces/base-alt-icingrainbow.png",
		name: "Donut Icing Rainbow",
		index: 50,
	},

	{
		url: "/pieces/base-donut.png",
		name: "Donut",
		index: 50,
	},
];

export const eyes: NFTPiece[] = [
	{
		url: "/pieces/eyes/eyes-1.png",
		name: "Anime Eyes",
		index: 60,
	},
	{
		url: "/pieces/eyes/eyes-bluelashes.png",
		name: "Blue Lashes",
		index: 60,
	},

	{
		url: "/pieces/eyes/eyes-dazed.png",
		name: "Dazed",
		index: 60,
	},
	{
		url: "/pieces/eyes/eyes-demonlashes.png",
		name: "Demon Lashes",
		index: 60,
	},
	{
		url: "/pieces/eyes/eyes-dopeylashes.png",
		name: "Dopey Lashes",
		index: 60,
	},
	{
		url: "/pieces/eyes/eyes-drugs.png",
		name: "Drugs",
		index: 60,
	},
	{
		url: "/pieces/eyes/eyes-eyepatch.png",
		name: "Eye Patch",
		index: 60,
	},
	{
		url: "/pieces/eyes/eyes-hazellashes.png",
		name: "Hazel Lashes",
		index: 60,
	},
	{
		url: "/pieces/eyes/eyes-rubberhose.png",
		name: "Rubber Hose",
		index: 60,
	},
	{
		url: "/pieces/eyes/eyes-wide.png",
		name: "Wide",
		index: 60,
	},
];

export const mouths: NFTPiece[] = [
	{
		url: "/pieces/mouth/mouth-1.png",
		name: "Smile",
		index: 60,
	},
	{
		url: "/pieces/mouth/mouth-awkwardcheese.png",
		name: "Awkward Cheese",
		index: 60,
	},
	{
		url: "/pieces/mouth/mouth-smallsmile.png",
		name: "Small Smile",
		index: 60,
	},
];
