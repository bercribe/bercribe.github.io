# https://just.systems

install:
    cd ./site && bun install

upgrade:
    cd ./site && bun x @astrojs/upgrade
    cd ./site && bun update
    git add .
    git commit -m "bump deps"

add *packages:
    cd ./site && bun add {{ packages }}

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
