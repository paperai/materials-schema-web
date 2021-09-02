# materials-schema-web

***materials-schema-web*** is a static html generation tool for creating ***Type-Property** bidirected schema*.


## Features
Given arbitrary amount of ***`Type`*** s and ***`Property`*** s, this app can:

- Provide a quick search in ***`Type`*** or ***`Property`*** by given name. 
- Analyze the ***`Property`*** usage and used frequency in ***`Type`***
- Categorize all the relationships between ***`Type`*** and ***`Property`***. 

## Install Prerequisites
- [Node.js](https://nodejs.org/en/) v14 or further (previous node version might also work without guarantee)

## Installation
1. Clone this repository.
2. Run `npm i` to install all library dependency.

## Usage
### To update ***Type-Property*** relationship:
   1. Modify the [material.json](https://github.com/paperai/materials-schema-web/blob/c7295a039283f013ebbefbba35543efb51328fe5/material.json) in the root directory according to the structure below.
   2. Run `npm start` to generate all static pages.

The generated static pages can now be found in the path **`src/app/views/`**

### To use it as an interactive app, you can either
  - Deploy the pages in **`src/app/views/`** by using [Gihub Pages](https://pages.github.com/).
  - Run `npm run app` to start the app locally. The app will be hosted on port 3333.
