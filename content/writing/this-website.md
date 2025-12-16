+++json
	{
		title: "About This Website",
		date: "2025-12-15"
	}
+++

Exposing the inner workings of this website, sharing some of my thoughts on SSGs and a couple of inspirations.

## State of Static Site Generators

There are tons of static site generators: Astro, 11ty, Hugo, Zola, you name it. They are all similar. They are all do rather simple thing — generate pages. Yet, they are all too complex for my needs.

I initially chose Astro for the personal website. It is nice framework and their marketing is everywhere, but it's too much. Astro has it all — from typed collections to remote functions. I need none of that to share text files.

Eleventy, on the other hand, is a world of its own. With 11ty you assemble your own variation of it from dozens of different pieces. It won over the web standards folks. However, from outsider standpoint even its landing page looks overwhelming.

Hugo comes with golang machinery. It has theme store, and all “new” templating language. Not a fan of that. At this point I wrote in at least three or four different templating languages. And I'm having hard time differentiating between them.

My main issue with all of the existing SSG solutions, is that for they are quick to pick up, but you pay with need to memorize the conventions. There is a need to learn their specific way of doing things. All of the site builders hide complexity beneath the folder structure and “magic” file names.

## DIY Solution

I prefer the simple and explicit approach of defining the routes manually instead. Similar to server router (e.g., express), i want to be able to declare the path for a file and define a handler for it.

This approach lead increases amount of manual work. However, it also relief you burden of learning tool specific quirks. Then coming back to a codebase after a break, you could just read the existing examples and make changes, instead of going back to the docs.

The script I wrote is a trivial [100 lines](https://github.com/petyapetr/slaaava.com/blob/main/utils.js) of js. It has just a couple of dependencies for parsing markdown, and rendering templates with jinja/nunjucks (let's stick with one html templating language across the ecosystem, for every ones’ sake). I define end points, as if I was doing it on the server. Write templates to render content to. Run a script, which turns those end points to html pages.

My script doesn't cover edge cases, it doesn't optimize bundle size, neither it has internationalization or rss feed; but I don't need any of that at the moment. There are no incremental rebuilds, site is build from a ground up, but it literally takes milliseconds.

I'm taking limitations of tailored solutions over complexity of of-the-shelf ones, any day of the week.

> “complexity bad”, as grug famously [said](https://grugbrain.dev/#grug-on-complexity).

What it currently lacks, and what I'm planning to add next: code snippets highlighting, and some kind of image optimization/processing. 

## Inspo

I would like to also mention sites, from there I did stole different bits and pieces for mine.

- From [Tom MacWright](https://macwright.com/), I took the whole layout with a sidebar, and collection pages.
- Home page with underlined section headers were inspired by [Normally Ltd](https://normally.com/).
- Footer is copied from [Artem Zaharchenko](https://kettanaito.com/)'s one.
- To create a theme switch, I consulted with [Vadim Makeev](https://pepelsbey.dev/articles/native-light-dark/)'s article.
- Articles, which taught me site generation: Jan Mikovsky's [writing](https://jan.miksovsky.com/posts/2025/04-17-zero-dependencies) on doing SSG with js, and Jared Krinke's overview of the [mental model](https://log.schemescape.com/posts/static-site-generators/lisp-ssg.html) behind it.

For more, sites I admire see the [blogroll](/blogroll).
