include .env

help:
	@echo "Available targets:"
	@echo " serve      — serve static for dev"
	@echo " deploy     — rsync files to vps"

serve:
	serve

deploy:
	@echo "Syncing to VPS..."
	rsync -azP --delete \
		--exclude="CC.md" \
		--exclude="LICENSE" \
		--exclude="README.md" \
		--exclude="Makefile" \
		--exclude=".git" \
		--exclude=".env" \
		--exclude=".gitignore" \
		$(CURDIR)/ $(VPS_PATH)
	@echo "✔︎ Deployed"
