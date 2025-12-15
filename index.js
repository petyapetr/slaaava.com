import {readFileSync} from "node:fs";
import {SiteBuilder, jinjaRenderer, mdRenderer} from "./utils.js";

const site = new SiteBuilder();
site.collection(
	"content/writing",
	"post.html",
	"writing",
	(item) => item.date !== undefined
);
site.page("/", () => {
	return site.njk.render("home.html", {
		items: site.collections
			.get("writing")
			.items.toSorted((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, 5),
	});
});
site.page("/writing/", () => {
	const collection = site.collections.get("writing");
	collection.items = collection.items.toSorted(
		(a, b) => new Date(b.date) - new Date(a.date)
	);
	return jinjaRenderer(collection, "writing.html");
});
site.page("/about/", () => {
	const content = readFileSync("content/about.md", "utf-8");
	return mdRenderer({content, title: "About", group: "about"});
});
site.page("/blogroll/", () => {
	const content = readFileSync("content/blogroll.md", "utf-8");
	return mdRenderer({content, title: "Blogroll", group: "blogroll"});
});
site.page("/cv/", () => {
	const content = readFileSync("content/cv.md", "utf-8");
	return mdRenderer({content, title: "CV"}, "cv.html");
});

site.build();
