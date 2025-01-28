import dynamic from "next/dynamic";

const OptionsClient = dynamic(() => import("./OptionsClient"), {
	ssr: false,
});

export default function Options() {
	return (
		<div>
			<h2>Options</h2>
			<OptionsClient />
		</div>
	);
}
