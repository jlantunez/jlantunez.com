# jlantunez.com [![Deploy](https://github.com/jlantunez/jlantunez.com/actions/workflows/build.yml/badge.svg)](https://github.com/jlantunez/jlantunez.com/actions/workflows/build.yml)

My personal site.

Create something of lasting value.

## Design

The site was designed in Figma, you can find it [here](https://www.figma.com/community/file/1208849100325708044).

![Welcome screen](/instructions/welcome.jpeg)

## Tinkering with the site

If you want to make this run on your machine but the code below looks daunting, we got you covered!

<details>
  <summary>Learn How</summary>

### Step 1
You'll need [Node.js](https://nodejs.org/en/). Hop on that website and choose the version that says LTS and install it.

### Step 2
Then you'll need to download the repo:

![downloading the repo](/instructions/instructions-download.gif)

### Step 3
Once you got it downloaded you'll see a ZIP file which you now need to uncompress. This _just works_ on a Mac but you might need something like WinRar on a Windows machine:

![expanding the repo](/instructions/instructions-expand.gif)

### Step 4
Now that's expanded, we need to access it via the command line. Open your terminal and write `cd` and an space and drag the folder directly to it. Then run `npm i`:

![installing the repo](/instructions/instructions-install.gif)

### Step 5
It might take some minutes to get it finished but once it's done, we're fairly close! Just run `npm start` and a browser window will soon open.

![starting the repo](/instructions/instructions-start.gif)

### Voilà!
Great! Now any changes that you make on the files will reflect on the browser automatically.

</details>

## Development

Once you've cloned the repository, you'll need [Node.js](https://nodejs.org/en/) at least version 14 installed then run:

````bash
npm i
npm start
````

If you're also maintaining the site and want to access the CMS you should run this in another terminal window but the same folder:

````bash
npx netlify-cms-proxy-server
````

You can then access the site on the port `8080` and the CMS directly on `http://localhost:8080/admin/`
