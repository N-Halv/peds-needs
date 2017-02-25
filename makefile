all: runApp

clean:
	rm -rf dist/
	mkdir dist/

runApp:
	webpack-dev-server --inline --content-base dist/ --port 4444 --open

build:
	webpack --progress
