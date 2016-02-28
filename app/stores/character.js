module.exports = {
	model: '../models/character'

	//adds character
	addCharacter: function (data, callback) {
        	var Character = require(this.model);
        	var character = new Character();

        	// filter by character schema
        	Character.schema.eachPath(function(path) {
		   if (path == '_id' || path == '__v')
             	     return;

        	   // add field data to new character document
		   if (data.hasOwnProperty(path)) {
                     character[path] = data[path];
                   }
                });

                character.save(function(err) {
                   if (err){
                     callback(false,err);
                   }
                   else {
                     callback(true,character);
                   }
                });
	},


	//returns character by searching with name
	getCharacterByName: function(name, callback){
		
		var Character = require(this.model);
		Character.findOne({name:name}, function(err,obj)
        	{
            		if (err)
                	  callback(2,err);
            		else if(obj == null)
                	  callback(3,'No character with name "'+ name +'" in the database.');
            		else
                	  callback(1, obj);
        	});

	},
	
	
	//returns character by searching with id
	getCharacterById: function(id, callback) {

        	var Character = require(this.model);
        	Charachter.findOne({_id: id}, function(err,obj)
        	{
            		if (err)
                	  callback(2,err);
           	 	else if(obj == null)
                	  callback(3,'No character with id "'+ id +'" in the database.');
            		else
                 	  callback(1, obj);
        	});  
	},
	

	//removes character
	removeCharacter: function (id, callback) {
        
		var Character = require(this.model);
        	Character.remove({_id: id}, function(err, character) 
		{
            		if (err)
                	  callback(false);
            		else
                	  callback(true);
        	});

	},
	

	//edit Character
	editCharacter: function (id, data, callback) {
        
	   this.getCharacterById(id,function(success, character) {
		// character exists
		if(success == 1) {
                   for (var key in data) {
                      if (data.hasOwnProperty(key)) {
                        character[key] = data[key];
                      }
                   }
                   character.save(function(err) {
                      if (err){
                        callback(false,err);
                      }
                      else {
                        callback(true, character);
                      }
                   });
                }
                // character is not existing
                else if (success == 3) {
                  callback(false, 'Failure. No character with id "'+id +'" existing!')
                }
                else {
                  callback(false, character);
                }
	   });
	},


	//returns characters
	getCharacters: function (callback) {
        var Character = require(this.model);
        Character.find(function (err, character) {
            if (err){
                callback(err);
            }
            else {
                callback(character);
            }
        });
	}

}
