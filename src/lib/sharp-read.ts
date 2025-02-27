import type { IMG } from "../options/img.js";

import type { optionExecutionsFile } from "files-pipe/dist/options/index.js";
import type { Sharp } from "sharp";

import defaults from "../options/index.js";

export interface sharpBuffer extends Sharp {
	[key: string]: unknown;
}

export interface ongoingSharp extends Omit<optionExecutionsFile, "buffer"> {
	buffer: sharpBuffer;
}

export default async (options: IMG, ongoing: ongoingSharp) => {
	const fileType = ongoing["inputPath"].split(".").pop();

	if (!fileType) {
		return;
	}

	const typeToOption: {
		[key: string]: string;
	} = {
		"avci": "avif",
		"avcs": "avif",
		"avifs": "avif",
		"heic": "heif",
		"heics": "heif",
		"heifs": "heif",
		"jfif": "jpeg",
		"jif": "jpeg",
		"jpe": "jpeg",
		"apng": "png",
		"jpg": "jpeg",
	};

	const optionType =
		typeof typeToOption[fileType] !== "undefined"
			? typeToOption[fileType]
			: typeof options[fileType] !== "undefined"
			? fileType
			: false;

	const validOptionCalls = [
		"avif",
		"gif",
		"heif",
		"jpeg",
		"png",
		"raw",
		"tiff",
		"webp",
	];

	if (
		optionType &&
		validOptionCalls.includes(optionType) &&
		typeof options[optionType] !== "undefined" &&
		options[optionType] !== false
	) {
		if (optionType in ongoing.buffer) {
			return await ongoing.buffer[optionType](
				options[optionType] !== true
					? options[optionType]
					: defaults["img"]
			).toBuffer();
		}
	}
};
