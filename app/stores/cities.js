var Cities = require(__appbase + 'models/cities');

module.exports = {

    add: function (data, callback) {
        var cities = new Cities();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Cities.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                cities[key] = data[key];
            }
        }

        cities.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,cities);
            }
        });
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Cities.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        Cities.find(data, function(err,obj)
        {
            if(obj.length === 0)
                callback(3,data);
            else
                callback(1, obj);
        });
    },

    getByName: function(name, callback) {
        this.get({'name':name},function(success,message){
            if(success == 1) {
                callback(success,message[0]);
            }
            else {
                callback(success,message);
            }
        });
    },

    getById: function(id, callback) {
        this.get({'_id': id},function(success,message){
            if(success == 1) {
                callback(success,message[0]);
            }
            else {
                callback(success,message);
            }
        });
    },

    getAll: function (callback) {
        Cities.find(function (err, citiess) {
            if (err)
                callback(false,err);
            else
                callback(true,citiess);
        });
    },

    remove: function (id, callback) {
        Cities.remove({_id: id}, function(err, resp) {
            // more than zero entries removed?
            if (resp.result.n > 0)
                callback(true);
            else
                callback(false);
        });

    },

    edit: function (id, data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Cities.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, cities) {
            // Cities exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        Cities[key] = data[key];
                    }
                }
                Cities.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,Cities);
                    }
                });
            }
            // Cities is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, cities);
            }
        });
    },



    //returns all citiess of one continent
    getCitiesByContinent: function(continentName, callback){
	Cities.find({'continent' : continentName}, function(err, obj){
	   if(err){
		callback(2, err);
	   }
	   else if (obj.length === 0){
		callback(3, continentName);
	   }
	   else{
		callback(1, obj);
	   }
	});	


    },


    //returns all citiess of one culture
    getCitiesByCulture: function(cultureName, callback){
	Cities.find({'cultures' : cultureName}, function(err, obj){
	   if(err){
		callback(2, err);
	   }
	   else if (obj.length === 0){
		callback(3, cultureName);
	   }
	   else{
		callback(1, obj);
	   }
	});	


    },

};
