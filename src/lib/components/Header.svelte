<script lang="ts">
	import {onMount} from "svelte";

	let currentTheme = $state("light");

	onMount(() => {
		setDefaultScheme();
	});

	function setDefaultScheme() {
		const localStorageTheme = localStorage?.getItem("theme");
		if (localStorageTheme !== null) {
			currentTheme = localStorageTheme;
			return;
		}

		const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
		if (systemSettingDark.matches) {
			currentTheme = "dark";
		}

		setTheme(currentTheme);
	}

	function toggleTheme() {
		currentTheme = currentTheme === "light" ? "dark" : "light";
		setTheme(currentTheme);
	}

	function setTheme(theme: string) {
		document.querySelector("html")?.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}
</script>

<header
	class="flex flex-wrap items-baseline justify-between gap-x-24 gap-y-0 px-4 lg:px-8"
>
	<a href="/" class="pt-6 font-medium text-nowrap no-underline">
		Slava Zakharov
	</a>

	<div class="flex flex-wrap items-baseline">
		<nav class="contents" aria-label="Main navigation">
			<ul class="contents">
				<li>
					<a href="/"><div class="py-6 pr-4">Home</div></a>
				</li>
				<li>
					<a href="#all-pages" class="px-4 py-6">All</a>
				</li>
				<li>
					<a href="/notes" class="px-4 py-6">Notes</a>
				</li>
				<li>
					<a href="/about" class="px-4 py-6">About</a>
				</li>
			</ul>
		</nav>
		<button type="button" class="pb-6 pl-4" onclick={toggleTheme}>
			<svg class="size-4 fill-current" viewBox="0 0 500 500"
				><title>Change to {currentTheme} theme</title><circle
					cx="248.48"
					cy="252.55"
					r="97.03"
				></circle><rect height="112.39" width="27.9" x="234.53" y="17.45"
				></rect><rect height="112.39" width="27.9" x="234.53" y="375.25"
				></rect><rect
					height="112.39"
					transform="translate(679.92 -174.83) rotate(90)"
					width="27.9"
					x="413.42"
					y="196.35"
				></rect><rect
					height="112.39"
					transform="translate(322.12 182.97) rotate(90)"
					width="27.9"
					x="55.63"
					y="196.35"
				></rect><rect
					height="112.39"
					transform="translate(198.96 -228.23) rotate(45)"
					width="27.9"
					x="361.03"
					y="69.85"
				></rect><rect
					height="112.39"
					transform="translate(303.75 24.77) rotate(45)"
					width="27.9"
					x="108.03"
					y="322.85"
				></rect><rect
					height="112.39"
					transform="translate(908.15 381.93) rotate(135)"
					width="27.9"
					x="361.03"
					y="322.85"
				></rect><rect
					height="112.39"
					transform="translate(297.35 128.93) rotate(135)"
					width="27.9"
					x="108.03"
					y="69.85"
				></rect></svg
			>
		</button>
	</div>
</header>
