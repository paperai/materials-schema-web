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
   1. Modify the [material.json](https://github.com/paperai/materials-schema-web/blob/c7295a039283f013ebbefbba35543efb51328fe5/material.json) in the root directory according to the [rules](https://github.com/paperai/materials-schema-web/blob/main/README.md#materialjson) below.
   2. Run `npm start` to generate all static pages.

The generated static pages can now be found in the path **`src/app/views/`**

### To use it as an interactive app, you can either
  - Deploy the pages in **`src/app/views/`** by using [Gihub Pages](https://pages.github.com/).
  - Run `npm run app` to start the app locally. The app will be hosted on port 3333.

##### :heavy_exclamation_mark: Please note that any modifications in `material.json` reuqires to execute `npm start` again for update in html pages.
##### :heavy_exclamation_mark: This program will not delete any pages with the id that no longer exists; It is recommendeded to backup and delete all your original static pages if there is any.

## [material.json](https://github.com/paperai/materials-schema-web/blob/c7295a039283f013ebbefbba35543efb51328fe5/material.json)
A simplest sample of `material.json` looks like this:
```
{
    "dataTypes": [
        {"id": "D1", "name": "Text"},
    ],
    "types": [
        {"id": "T100", "name": "Person", "properties": ["P1"]},
    ],
    "properties": [
        {"id": "P1", "name": "additionalName", "expectedTypes": ["D1"], "description": "xxxx"},
    ]
}
```

----

**dataTypes**: primitive type; no hyperlink will be generated with this type.
   - *id*: unique string
   - *name*: string

**types**: customized type; holds `property` no hyperlink will be generated with this type.
   - *id*: unique string
   - *name*: string
   - *properties*: : array of string; all `Property`s' `id` this Type has

**properties**: primitive type; no hyperlink will be generated with this type.
   - *id*: unique string
   - *name*: string
   - *expectedTypes*: array of string; all `Type`s' `id` in which this `Property` can be found
   - *description*: string

## License
 TBD
