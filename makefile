all: moveHtml build open buildAndWatch

clean:
	rm -rf dist/
	mkdir dist/

moveHtml: clean
	cp app/index.html dist/index.html

buildAndWatch:
	webpack --progress --watch

build:
	webpack --progress

open:
	open dist/index.html
