# https://just.systems

install:
    cd ./site && bun install

dev:
    cd ./site && bun run dev

build:
    cd ./site && bun run build

preview:
    cd ./site && bun run preview

check:
    cd ./site && bun astro check

test:
    cd ./site && bun test

check-all: check test
