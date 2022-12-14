.PHONY: build
build: node_modules/
	GENERATE_SOURCEMAP=false npm run build

.PHONY: clean
clean: node_modules/
	npm i

.PHONY: run
run: node_modules/
	GENERATE_SOURCEMAP=false npm run start

node_modules/:
	npm i
