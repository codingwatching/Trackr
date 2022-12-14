.PHONY: build
build: bin/
	go build -o bin/trackr src/main.go

.PHONY: clean
clean: 
	go mod tidy

.PHONY: run
run: bin/
	go run src/main.go

.PHONY: test
test: bin/
	go test ./tests/...

bin/:
	mkdir bin/
