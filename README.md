# Four.io

this is a astro project bootstrapped with npm create astro@latest.

## Getting started

0. make sure you have git, node an npm installed.
1. close this repo
2. install packages (`npm install`)
3. change .env.*.example files based on your need
4. run:
    - for development use: `npm run dev` (will serve on localhost:3000)
    - for staging use: `npm run build:staging && npm start` (will serve on localhost:4321)
    - for production use: `npm run build && npm start` (will serve on localhost:4321)

## Deploy

for first deploy go through [getting started](#getting-started) steps first. and for next deploys use `deploy.sh` file.

check logs with `npm run logs`

## Tech Stack

to check what technologies are being used in this project, check [package.json](package.json)

## Folder Structure

the directory and file names are self explanatory. (at least i hope so :)))

## Stages

| Environment   | Build      | API  | URL                       | Shared Content Update |
| ------------- | ---------- | ---- | ------------------------- | --------------------- |
| development   | dev        | test | <http://localhost:3000>   | Every 1 minute        |
| staging       | production | test | <http://>                 | Every 10 minute       |
| production    | production | main | <https://four.io>         | Every 10 minute       |

## 👀 Want to learn more?

Feel free to check [astro documentation](https://docs.astro.build) or jump into astro [Discord server](https://astro.build/chat).
