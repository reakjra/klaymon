import { Guild, GuildMember, Message, User } from 'discord.js';

interface ttt {
	message: Message;
	opponent?: string;
	xColor?: { yes: string; no: string };
	oColor?: { yes: string; no: string };
	xEmoji?: string;
	oEmoji?: string;
	embed?: {
		color?: string;
	},
	fightBot?: string; 
	fightEmoji?: { yes: string; no: string };
}


interface rev {
	message: Message;
	content?: string;
}

interface phcomm {
	message: Message;
	embed?: {
		color?: string;
		timestamp?: boolean;
		footer?: boolean;
	};
	NSFWchannel?: boolean;
	noNSFWcontent?: string;
	thoseEmbeds?: boolean;
	thoseEmbedsColor?: string;
}

interface rmeme {
	message: Message;
	embed?: {
		color?: string;
		timestamp?: boolean;
		footer?: boolean;
	};

}

interface urban {
	message: Message;
	query?: string;
	embed: {
		color?: string;
	}
}
interface rr {
	message: Message;
	opponent?: string;
	winMessage?: string;
}
interface rhc {
	message: Message;
	embed: {
		color?: string;
		footer?: string;
	}
}



declare module 'klaymon' {

	export function TicTacToe(options: ttt): void;
	export function Reverse(options: rev): void;
	export function PhComment(options: phcomm): void;
	export function RandomMeme(options: rmeme): void;
	export function Urban(options: urban): void;
	export function RoadRace(options: rr): void;
	export function RandomHexColor(options: rhc): void;
}
