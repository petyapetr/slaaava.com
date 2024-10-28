import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	redirects: {
		"/podcasts": {
			status: 302,
			destination: "https://deepcuts.ru/podcast",
		},
		"/running": {
			status: 302,
			destination: "https://www.strava.com/athletes/petyapetr",
		},
	},
});
