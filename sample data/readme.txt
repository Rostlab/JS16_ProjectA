Those are the sample data collections scripts. They are created with Robomongo and could be imported in MongoDB again with Robomongo.
As I haven’t found an import method for Robomongo here are the steps:
-Connect to/create a database
-Right-click on collections under the database and click on “Create Collection”. Name the collections as the corresponding *.js files in the folder: for example if you create a collection that corresponds to the “ages.js” file name it “ages”.
-Right-click on a collection and choose “Insert document…” 
-Open the corresponding *.js file from the folder with a text editor.
-Copy the content of the *.js file into the window in Robomongo for “Insert document”.
*Note* You may want to setup the references between the collections, as they are not set up programatically. 