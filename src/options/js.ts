import type { MinifyOptions } from "terser";

export interface JS extends MinifyOptions {
	[key: string]: unknown;
}

export default {
	// rome-ignore lint/nursery/noPrecisionLoss:
	ecma: 5,
	enclose: false,
	keep_classnames: false,
	keep_fnames: false,
	ie8: false,
	module: false,
	safari10: false,
	toplevel: false,
} satisfies JS;
