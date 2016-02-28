# JS16_ProjectA
In this project we will lay the foundations for our system by integrating data from multiple sources into a central database. The database will serve the apps and the visualization tool that will be developed in other projects.


Use the [repository wiki](https://github.com/Rostlab/JS16_ProjectA/wiki/) to document your services and list them here, for example:

# Links
  - Main wiki with project description: https://rostlab.org/owiki/index.php/Javascript_technology_2016#Project_A
  
# Services
Below are the links to our documented API services.

##Characters
  - [Get all characters](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-all-characters)
  - [Get character by data](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-character-by-data)
  - [Get character by name](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-character-by-name)
  - [Get character by id](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-character-by-id)
  - [Add character](https://github.com/Rostlab/JS16_ProjectA/wiki/Add-character)
  - [Edit character](https://github.com/Rostlab/JS16_ProjectA/wiki/Edit-character)
  - [Remove character](https://github.com/Rostlab/JS16_ProjectA/wiki/Remove-character)

##Episodes
  - [Get all episodes](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-all-episodes)
  - [Get episode by data](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-episode-by-data)
  - [Get episode by name](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-episode-by-name)
  - [Get episode by id](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-episode-by-id)
  - [Add episode](https://github.com/Rostlab/JS16_ProjectA/wiki/Add-episode)
  - [Edit episode](https://github.com/Rostlab/JS16_ProjectA/wiki/Edit-episode)
  - [Remove episode](https://github.com/Rostlab/JS16_ProjectA/wiki/Remove-episode)

##Houses
  - [Get all houses](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-all-houses)
  - [Get house by data](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-house-by-data)
  - [Get house by name](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-house-by-name)
  - [Get house by id](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-house-by-id)
  - [Add house](https://github.com/Rostlab/JS16_ProjectA/wiki/Add-house)
  - [Edit house](https://github.com/Rostlab/JS16_ProjectA/wiki/Edit-house)
  - [Remove house](https://github.com/Rostlab/JS16_ProjectA/wiki/Remove-house)
  
##House Types
  - [Get all house types](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-all-house-types)
  - [Add house type](https://github.com/Rostlab/JS16_ProjectA/wiki/Add-house-type)
  - [Remove house type](https://github.com/Rostlab/JS16_ProjectA/wiki/Remove-house-type)

##Twitter Streaming
  - [Get Twitter streaming](https://github.com/Rostlab/JS16_ProjectA/wiki/Get-Twitter-stream-by-keywords)

# Documentation

We are using [apidoc](http://apidocjs.com/) to generate documentation for the RESTful API service. To get started follow these instructions:
* Open a terminal and `cd` into the checked out git repository folder
* Install the tool globally: `sudo npm install apidoc -g`
* Generate the documentation: `apidoc -i app/ -o apidoc/`
* Open the HTML file inside the apidoc folder or go to http://127.0.0.1:8080/doc/ if you already have set up the project

#Setup
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
