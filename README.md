# JS16_ProjectA
In this project we will lay the foundations for our system by integrating data from multiple sources into a central database. The database will serve the apps and the visualization tool that will be developed in other projects.


Use the [repository wiki](https://github.com/Rostlab/JS16_ProjectA/wiki/) to document your services and list them here, for example:

# Services:
  - [Login](https://github.com/Rostlab/JS16_ProjectA/wiki/Login)
  - [Add house](https://github.com/Rostlab/JS16_ProjectA/wiki/Add-house)


# Links

  - Main wiki with project description: https://rostlab.org/owiki/index.php/Javascript_technology_2016#Project_A

#Setup
* Install nodejs and mongodb on your local machine (https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/ and https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
* Clone this project to a folder on your harddrive and open a console inside it
* Run `sudo npm install` to install any submodules required
* Copy the config file in `cfg` to `config.json` and edit it
* Togi: I left username and password empty. With that you can avoid Mongoose connection errors.
* Start local MongoDB server with `mongod --dbpath /your/db/path/here --port 12345`
* Run `nodejs app.js` to start the server
* Node should show in console `Mongoose connected - Node server is listening on port 8080`
* If needed, you can start MongoDB shell via `mongo`. Then type `show dbs` to see all databases. Type `use db_name_here` to switch to preferred database. With `show collections` you can see all tables (in NoSQL tables are called collections). With `db.collection_name.find()` you can output the collection content.
