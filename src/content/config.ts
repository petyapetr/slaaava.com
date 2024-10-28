import {z, defineCollection} from "astro:content";

const blogCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()).optional(),
		publishDate: z.string().transform((str) => new Date(str)),
		updateDate: z.string().transform((str) => new Date(str)),
		heroImage: z.string().optional(),
	}),
});

export const collections = {
	blog: blogCollection,
};
