# jlantunez.com [![🚀 Deploy](https://github.com/jlantunez/jlantunez.com/actions/workflows/build.yml/badge.svg)](https://github.com/jlantunez/jlantunez.com/actions/workflows/build.yml)

My personal site

## Development

Once you've cloned the repository, you'll need [Node.js](https://nodejs.org/en/) at least version 14 installed then run:

````bash
$ npm i
$ npm run start
````

On another tab but on the same directory run the following:

````bash
$ npx netlify-cms-proxy-server
````

You can then access the site on the port `8080` and the CMS directly on `http://localhost:8080/admin/`
