const styleLight = document.querySelector(
	"link[rel=stylesheet][media*=prefers-color-scheme][media*=light]"
);
const styleDark = document.querySelector(
	"link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]"
);

const definedTheme = globalThis.localStorage.getItem("theme");
if (definedTheme !== null) {
	switchScheme(definedTheme);
}

globalThis.document
	.querySelector("[data-theme-switch]")
	?.addEventListener("click", () => {
		if (styleLight.media === "all") {
			switchScheme("dark");
			return;
		}
		if (styleDark.media === "all") {
			switchScheme("light");
			return;
		}
		const schema = globalThis.matchMedia("(prefers-color-scheme: dark)").matches
			? "light"
			: "dark";
		switchScheme(schema);
	});

globalThis.document.querySelectorAll("[data-anchor]").forEach((el) => {
	el?.addEventListener("click", () => {
		const anchorUrl = globalThis.location + "#" + el.dataset.anchor;
		navigator.clipboard.writeText(anchorUrl);
	});
});

function switchScheme(scheme) {
	styleLight.media = scheme === "light" ? "all" : "not all";
	styleDark.media = scheme === "dark" ? "all" : "not all";
	globalThis.localStorage.setItem("theme", scheme);
}
