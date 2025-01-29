---
title: "CSS Divider in Flow"
publishDate: "2025-01-28"
updateDate: "2024-01-28"
---

Context-aware divider utility implemented with CSS.

## Useful Empty div

Vertical lines in content are my favorite. From a design standpoint, they might seem like a lazy way to separate content, but they're incredibly effective. I adore them everywhere — in markdown files with `---`, in Notion, even in Google Docs. I I bring them with me everywhere, even to places that don't support them (looking at you, Apple Notes[^apple-notes]). So why not bring them to your sites?

[^apple-notes]: Actually, they might support divider lines, not sure. I found them once but have struggled to find them in the menus ever since.

It's a common pattern to have a divider tag with bottom and top margin on it. Just slap it on empty `div`, put it between pieces of content, you would like to separate, and you're golden. 

Here's a basic implementation with configurable variables:

```css
:root {
	--divider-thickness: 1px;
	--divider-space: 2rem;
	--divider-width: auto;
}

.divider {
	border-top-color: rgba(0 0 0 0.2);
	border-top-style: solid;
	border-top-width: var(--divider-thickness, 1px);
	margin-block: var(--divider-space, 2rem);
	max-width: var(--divider-width, auto);
}
```

That will do in most of the cases. However, it clashes with most useful css utility of all.

## Not-normal Flow

Let me introduce you to flow — perhaps the most useful CSS utility.

Regarding their tech stack, year after year, web developers start their projects with good old `* {margin: 0}` to eliminate the annoying default white spaces in the `body` tag. However, this also breaks the “normal flow” of semantic text documents.

For those of us who appreciate well-thought-out defaults while wanting more control, we can bring the flow back with this magical rule: .flow > * + *. If you're not using it yet, you probably should.

To understand the details, you might want to read this [article](https://piccalil.li/blog/flow-utility/) by Andy Bell. In short, this utility creates a top margin between direct siblings of a .flow parent (except the first one) — providing flow and rhythm to a stack of elements.

Pretty neat, but as mentioned above, `.flow` doesn't play well with another one of my beloved utilities: `.divider`.

## Contextual Problem

Flow controls margins from a parent down to its children. When the divider class is applied directly, it regains control over component margins, which breaks the “flow.” And we can't `unset`, `revert`, or `inherit` that control due to specificity complications.

So, we need to contextualize our divider than. One might suggest a BEM approach with two separate classes — `divider__default` and `divider__in-flow` — using the same set of variables.

Yeah, it works, but now you have to consider the context every time you add a divider to your markup. It stops me from slapping dividers recklessly. And I don’t want that!

## Complex (Selector) Made (Markup) Easy

Let's make our divider class context aware then.

First, we need to avoid setting margins in the default class rule since we can't remove them later.

Second, we need to inverse our selection and slap margins in place, there they will rule explicitly. For that purposes let's use `:not()` pseudo-class together with direct child selector (`>`).

Second, we need to invert our selection and apply margins explicitly, ensuring they only create space when the divider is outside of the “flow.” To achieve this, we can use the `:not()` pseudo-class together with the direct child selector (`>`).

This results in the following rules:

```css
:root {
	--divider-thickness: 1px;
	--divider-space: 2rem;
	--divider-width: auto;
}

.divider {
	border-top-color: rgba(0 0 0 0.2);
	border-top-style: solid;
	border-top-width: var(--divider-thickness, 1px);
	max-width: var(--divider-width, auto);
}

:not(.flow) > .divider {
	margin-block: var(--divider-space, 2rem);
}
```

Now you can freely use this divider in text streams or to separate visual blocks on your page.

---

Cheers!
