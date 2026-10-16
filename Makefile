# Node version must satisfy package.json "engines" (^22.22.3 || ^24.15.0 || >=26)
NODE_VERSION ?= 24
NVM_VERSION  ?= v0.40.3
NVM_DIR      ?= $(HOME)/.nvm
PORT         ?= 4200
HOST         ?= 127.0.0.1

# Load nvm (if installed) before each command so node/npm resolve correctly
NVM_LOAD = export NVM_DIR="$(NVM_DIR)"; [ -s "$$NVM_DIR/nvm.sh" ] && . "$$NVM_DIR/nvm.sh";

.PHONY: help all serve-vm setup install-node install dev serve build clean distclean

help:
	@echo "Targets:"
	@echo "  setup      Install nvm + Node $(NODE_VERSION) + npm, then project deps (from scratch)"
	@echo "  install-node  Install nvm, Node and npm only"
	@echo "  install    npm ci (uses existing node/npm)"
	@echo "  dev        Run Angular dev server on port $(PORT)"
	@echo "  build      Production build into dist/"
	@echo "  clean      Remove dist/ and .angular/"
	@echo "  distclean  clean + remove node_modules/"

all: install build

setup: install-node
	@$(NVM_LOAD) npm ci
	@echo "Setup complete. Run: make dev"

install-node:
	@if [ ! -s "$(NVM_DIR)/nvm.sh" ]; then \
		echo "Installing nvm $(NVM_VERSION)..."; \
		curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/$(NVM_VERSION)/install.sh | PROFILE=/dev/null bash; \
	fi
	@$(NVM_LOAD) nvm install $(NODE_VERSION) && nvm alias default $(NODE_VERSION) && \
		echo "node $$(node -v), npm $$(npm -v)"

install:
	@$(NVM_LOAD) npm ci

dev serve:
	@$(NVM_LOAD) npx ng serve --host $(HOST) --port $(PORT)

build:
	@$(NVM_LOAD) npm run build

clean:
	rm -rf dist .angular

distclean: clean
	rm -rf node_modules

# Expose the dev server to the network (e.g. when running inside a VM)
serve-vm:
	@$(MAKE) dev HOST=0.0.0.0
