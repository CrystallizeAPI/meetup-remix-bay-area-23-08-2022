# === Makefile Helper ===

# Styles
YELLOW=$(shell echo "\033[00;33m")
RED=$(shell echo "\033[00;31m")
RESTORE=$(shell echo "\033[0m")

# Variables
NPM := npm

.DEFAULT_GOAL := list

.PHONY: list
list:
	@echo "******************************"
	@echo "${YELLOW}Available targets${RESTORE}:"
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf " ${YELLOW}%-15s${RESTORE} > %s\n", $$1, $$2}'
	@echo "${RED}==============================${RESTORE}"

.PHONY: clean
clean: stop ## Clean non-essential files
	@rm -rf node_modules
	
.PHONY: install
install: ## Install
	@$(NPM) install
	@cp .env.dist .env
	
.PHONY: serve
serve: ## Serve
	@$(NPM) run dev
