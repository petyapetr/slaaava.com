include .env

help:
	@echo "Available targets:"
	@echo " serve      — serve static for dev"
	@echo " deploy     — rsync files to vps"
	@echo " build      — build templates and markup to static pages"

build:
	rm -rf ./dist/
	node index.js
	cp -r ./src/assets/ ./dist/assets/
	@echo "✔︎ Site build"

serve:
	serve dist/

deploy:
	@echo "Syncing to VPS..."
	rsync -azP $(CURDIR)/dist/ $(VPS_PATH)
	@echo "✔︎ Deployed"
