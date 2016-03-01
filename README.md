# JS16_ProjectA [![Build Status](https://travis-ci.org/Rostlab/JS16_ProjectA.svg?branch=master)](https://travis-ci.org/Rostlab/JS16_ProjectA)
In this project we will lay the foundations for our system by integrating data from multiple sources into a central database. The database will serve the apps and the visualization tool that will be developed in other projects.

# Links
  - Main wiki entry: https://rostlab.org/owiki/index.php/Javascript_technology_2016#Project_A
  - API accessable at: https://got-api.bruck.me/api
  - Documentation about API endpoints: https://got-api.bruck.me/doc


# Developer information
## Documentation

We are using [apidoc](http://apidocjs.com/) to generate documentation for the RESTful API service. To get started follow these instructions:
* Open a terminal and `cd` into the checked out git repository folder
* Install the tool globally: `sudo npm install apidoc -g`
* Generate the documentation: `apidoc -i app/ -o apidoc/`
* Open the HTML file inside the apidoc folder or go to http://127.0.0.1:8080/doc/ if you already have set up the project

## Setup nodejs & mongodb
* Install nodejs and mongodb on your local machine (https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/ and https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
* Clone this project to a folder on your hard drive, open a console and change into the folder you just checked out
* Run `sudo npm install` to install any sub-modules required
* Copy the config file in `cfg` to `config.json` and edit it
    * You can leave username and password empty on default configurations 
    * Use 127.0.0.1 and port 27017 for default configurations
* Start local MongoDB server with `mongod`
    * You can specifc the port and folder you want to use: `mongod --dbpath /your/db/path/here --port 27017`
* Run `nodejs app.js` to start the server
* Node should show in console `Mongoose connected - Node server is listening on port 8080`
* If needed, you can start MongoDB shell via `mongo`. Then type `show dbs` to see all databases. Type `use db_name_here` to switch to preferred database. With `show collections` you can see all tables (in NoSQL tables are called collections). With `db.collection_name.find()` you can output the collection content.
