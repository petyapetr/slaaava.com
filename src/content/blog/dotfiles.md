---
title: "Dotfiles Simple Setup"
publishDate: "2024-10-28"
updateDate: "2024-10-29"
---

Here I outline my process for creating a simple yet convenient development environment. Which is easy to reproduce anywhere.

You can checkout repo itself on [github]().

**WIP:** Needs an update for automated package and app downloads.

## Prerequisites

My ideal setup is declarative and easily reproducible (yes, I know about Nix). I hate closed ecosystems and prefer plain text. Although I stick to one device for ecological reasons, I also manage a second device at work and want to ensure my workflow remains intact if I need to switch devices.

Despite already thrown shots at closed ecosystem, my main driver is a Mac (bruh). And my work is on Windows due to the GIS industry and proprietary APIs (what a hypocrite). That is just how things are. 

I aim to sync my workflow across both OSs and might switch to Linux in the future (Nix is living rent free in my head).

So, I am looking for a cross-platform apps or at least similar experiences.

I seek applications with minimal dependencies, leaning on defaults to avoid unnecessary complexity. As a web dev, I just do not want to deal with the same pain here. 

> If it ain't broke — don't fix it.

I want a setup that is not overly exotic, allowing me to work on any device when necessary.

## Setup

The setup is straightforward — a git repo with a Makefile, largely adapted from [Thorsten Ball](https://github.com/mrnugget/dotfiles). Makefile creates symlinks from `dotefiles` to my home directory. No additional tools like `stow` are needed, just `make`. This was inspired by this [guide](https://guides.hexlet.io/ru/makefile-as-task-runner/) (ru).

I am no `bash` expert. Luckily, llms this days can help with that. Be careful, though; `bash` scripts hold ultimate power. Always understand what they do first. On that topic, this [video](https://www.youtube.com/watch?v=mSXOYhfDFYo) is pretty helpful.

## Shell

I chose Zsh as my shell, primarily because it is the default on Mac. My `.zshrc` is concise, pointing to a custom directory within my dotfiles.

This directory holds my git aliases (which replace `cat` → `bat` and `vim` → `nvim`) and a simple theme for my command line prompt. Aliases were influenced by [Thorsten Ball](https://registerspill.thorstenball.com/i/150226089/technicalities), and I am still getting accustomed to them.

My `petr-dracula` theme was custom-tailored by me some time ago. It features no custom icons or other trickery. Just plain text, which show a full path to your current directory, git status if avaliable, and time.

There are way too many "simple" oh-my-zsh themes. They are either too minimal and lack features, or not "simple" at all. I did not need to know my user name; I have one. The same goes for my machine name; I do not connect to many remotes day to day. With my prompt, I look for those four features:

- Full path to a current directory. This is the easiest way for me to know where I am.

- Break line for a command. Full paths can get unwieldy.

- Time stamp. A short one. Why on earth would you need to know seconds?

- Git status. A must-have. Thorsten also [writes](https://registerspill.thorstenball.com/p/how-i-use-git?open=false#%C2%A7technicalities) on importance of that.

There is not much to say about the first three features; git status on the other hand, is interesting. This was my main issue with ready-to-use themes. Most of them overcomplicate it. I do not need to know my commit hash or see five different statuses.

Simple branch name, `OK` or `*` for untracked changes, and my most beloved feature of ahead/behind status in a form of `↑xx ↓xx`.

I am used to see it in my editor (VS Code). And even though I interact with git from the terminal a solid 80% of a time, I can not stop checking it in a sidebar. It is beautiful and comes in handy. So I have replicated it for my prompt.

The way it is done, you guested it, is SIMPLE. There is no need for an async plugin, it is done with prompt abbreviations. They event prevent you from writing conditionals; zsh does it for you.

And finally, the colors. I opted for [dracula](https://draculatheme.com/) inspired color scheme featuring blue, cyan, green, and yellow.

## gitconfig

Creating a consistent git workflow motivated me to streamline my dotfiles at the first place.

My Git config consists of three files: `.gitconfig`, `.githelpers`, and `.gitignore`. Here’s a quick breakdown:

- `.gitconfig`: Sets user info, credentials via gh cli, default rebase preferences, aliases for pretty logs, and a global `.gitignore` file. 
	
	- I simplified my config from the past, dropping multiple credentials and SSH setups as they weren’t necessary.

- `.githelpers`: Essentially, it is `git log --oneline` with a bit more useful information. This is a direct copy from same Thorsten Bell's article; he himself got it from [somewhere](https://www.destroyallsoftware.com/screencasts/catalog/pretty-git-logs?utm_source=substack&utm_medium=email) else. One thing I did was set the colors to match my dracula theme.

- `.gitignore`: Helps me avoid committing node modules on a poorly though-out "Initial commit".

## Terminal

I have recently switched from iTerm to [wezterm](https://wezfurlong.org/wezterm/index.html) for its cross-platform capabilities and lua-based config. So far so good, looks pretty and works fast.

While I wanted to use the default Mac terminal, I struggled with Windows'. So, I have settled on a wezterm, grabbed a first option that was easy to begin with.

My main issue with terminal emulators is keymaps. I want my to know my hotkeys. I turn red when something does not behave as expected.

Here, wezterm shines; you can setup hotkeys for different platforms. You have to paste same command object couple of times in the configuration, but I honestly could not care less. I spent some time tinkering with it and hope to return to it when it becomes obsolete. 

For a long time, I wanted to start using tmux; it seemed like every cool person in dev space uses it. However, while researching, I quickly understood that I would not use even a fraction of it. Do not get me wrong; I enjoyed dearly my split tab view in my iTerm from time to time. I missed it in wsl and thought tmux would be a solution for it. 

On that note, wezterm's capabilities are more than enough for me. I do not even use sessions, which they also support (not sure what that really means, tbh).

For remapping default key bindings in wezterm, I would refer you to the list of default mapping from official [docs](https://wezfurlong.org/wezterm/config/default-keys.html?h=defa) and that [article](https://wezfurlong.org/wezterm/config/default-keys.html?h=defa) on hacker news.

Theme! Easy — dracula [supports](https://draculatheme.com/wezterm) wezterm. So you just have to:

1. Download a `.toml` file; 

1. Put it into a subdirectory in your dotfiles; 

1. Set to as a `color_scheme_dirs`;

1. Set `color_scheme="Dracula (Official)"`.

Terminal is the only thing on my machine that is in dark mode. Everything else is light. I do not know why, but a bright terminal feels uncanny. ~~Pop culture~~ Capitalism must have got me on that one. 

### WSL

A word on a couple caveats for a Windows setup. There was not a single chance, that it would be that simple to sync everything to work seamlessly between platforms. And it does not.

The Makefile runs a script in a linux shell on wsl, and it works perfectly for everything that shell-related. However, wezterm itself runs under Windows and takes its config from Windows user's home folder. It does not consume symlinks.

To solve that problem and to ensure wezterm applies, I have created a  `wezterm-wsl` target to copy `wezterm.lua` into a Windows user's home folder.

Another problem is a start up of a wezterm, by default on Windows it launches a powershell. 

> — And what do we say to a powershell?
>
> — Not today, powershell! (in chorus)

To change this, we have to set a `default_domain` to wsl distro in a config. I use `sed` to insert a line into a config right before the return statement in the end. To automate, I have added that script to the same `wezterm-wsl` target. So it runs every time before we copy it to Windows user's home folder.

## There Are Always More Things to Configure

Going forward, to ensure my dotfiles are truly portable, I need to outline the installation steps, particularly for `brew`.

In the future, I might require additional configurations for standalone apps. For now, though, both of my main apps (VS Code, Firefox, and Obsidian) sync their configurations from the cloud.

I might also find way to keep some parts of my dotfiles private.

Overall, I’m quite satisfied with how everything has turned out. I love that my experience is now similar across different devices. Plus, I’m thrilled to have finally learned how to use a Makefile!

Thanks!

---

## Side Notes

After writing this arcticle I actually found a simple prompt called [pure](https://github.com/sindresorhus/pure). You might use that one, if you do not want to spent time on creating custom one. However, I still prefer mine though.
