# JS16_ProjectA [![Build Status](https://travis-ci.org/Rostlab/JS16_ProjectA.svg?branch=master)](https://travis-ci.org/Rostlab/JS16_ProjectA) [![Code Climate](https://codeclimate.com/github/Rostlab/JS16_ProjectA/badges/gpa.svg)](https://codeclimate.com/github/Rostlab/JS16_ProjectA) [![Codacy Badge](https://api.codacy.com/project/badge/grade/b635e40a61ea43fc843008c5af01fba6)](https://www.codacy.com/app/mail_25/JS16_ProjectA)
In this project we will lay the foundations for our system by integrating data from multiple sources into a central database. The database will serve the apps and the visualization tool that will be developed in other projects.

# Links
  - Main page: https://www.got.show
  - API accessable at: https://api.got.show/api/
  - Documentation about API endpoints: https://api.got.show/doc/
  - Main wiki entry: https://rostlab.org/owiki/index.php/Javascript_technology_2016#Project_A

# Developer information
## Documentation

We are using [apidoc](http://apidocjs.com/) to generate documentation for the RESTful API service. To get started follow these instructions:
* Open a terminal and `cd` into the checked out git repository folder
* Install the tool globally: `sudo npm install apidoc -g`
* Generate the documentation: `apidoc -i app/ -o apidoc/`
* Open the HTML file inside the apidoc folder or go to http://127.0.0.1:8080/doc/ if you already have set up the project

## Setup NodeJS & MongoDB
* Install nodejs and mongodb on your local machine (https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/ and https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
* Clone this project to a folder on your hard drive, open a console and change into the folder you just checked out
* Run `sudo npm install` to install any sub-modules required
* Copy the config file in `cfg` to `config.json` and edit it
	* You can leave username and password empty on default configurations 
	* Use 127.0.0.1 and port 27017 for default configurations
	* In order to stream real-time Twitter data, please register your Twitter account at http://apps.twitter.com and insert your API keys into the config.json. Never upload your API keys to GitHub. By default, config.json is on .gitignore.
* Start local MongoDB server with `mongod`
	* You can specifc the port and folder you want to use: `mongod --dbpath /your/db/path/here --port 27017`
* Run `nodejs app.js` to start the server
* Node should show in console `Mongoose connected - Node server is listening on port 8080`
* If needed, you can start MongoDB shell via `mongo`. Then type `show dbs` to see all databases. Type `use db_name_here` to switch to preferred database. With `show collections` you can see all tables (in NoSQL tables are called collections). With `db.collection_name.find()` you can output the collection content.

## Scraping and filling the database

`x` is in the following a placeholder and has to be replaced by the intended collection. (e.g. characters)

* To delete the collection and fill it again (new _ids are set!) with newly scraped data use: `npm run refill --collection=x`
* To update the collection with newly scraped data (manual edits are overwritten!) use: `npm run update --collection=x`
* To only add new properties/entries to the collection from a newly scrap use: `npm run safeUpdate --collection=x`

Available Collections:
*    'ages',
*    'characters',
*    'episodes',
*    'cities',
*    'continents',
*    'cultures',
*    'events',
*    'houses',
*    'regions',
*    'characterLocations',
*    'characterPaths',
*    'characterImages'
*    'characterPlods'