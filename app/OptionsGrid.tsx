"use client";

import OptionsGridColor from "./OptionsGridColor";
import OptionsGridEnable from "./OptionsGridEnable";
import OptionsGridRadius from "./OptionsGridRadius";
import OptionsGridSize from "./OptionsGridSize";

export default function OptionsGrid() {
	return (
		<div className="space-y-8">
			<div className="text-center text-sm border p-4 rounded-xl border-gray-600 dark:border-gray-400">
				Check out{" "}
				<a href="https://www.gridify.it" className="font-bold">
					gridify.it
				</a>{" "}
				if you need an image to grid generator with more options.
			</div>

			<div className="space-y-4">
				<OptionsGridEnable />
				<OptionsGridSize />
				<OptionsGridColor />
				<OptionsGridRadius />
			</div>
		</div>
	);
}
