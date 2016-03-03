var Region = require(__appbase + 'models/region');

module.exports = {

    add: function (data, callback) {
        var region = new Region();

        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Region.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
            else
            {
                region[key] = data[key];
            }
        }

        region.save(function(err) {
            if (err){
                callback(3,err);
            }
            else {
                callback(1,region);
            }
        });
    },

    get: function(data, callback) {
        // check if POST data matches Schema
        for (var key in data) {
            if (data.hasOwnProperty(key) && !Region.schema.paths.hasOwnProperty(key)) {
                callback(2,key);
                return;
            }
        }

        Region.find(data, function(err,obj)
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
        Region.find(function (err, regions) {
            if (err)
                callback(false,err);
            else
                callback(true,regions);
        });
    },

    remove: function (id, callback) {
        Region.remove({_id: id}, function(err, resp) {
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
            if (data.hasOwnProperty(key) && !Region.schema.paths.hasOwnProperty(key)) {
                callback(4,key);
                return;
            }
        }

        this.getById(id,function(success, region) {
            // Region exists
            if(success == 1) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        Region[key] = data[key];
                    }
                }
                Region.save(function(err) {
                    if (err){
                        callback(3,err);
                    }
                    else {
                        callback(1,Region);
                    }
                });
            }
            // Region is not existing
            else if (success == 3) {
                callback(2, id);
            }
            else {
                callback(false, region);
            }
        });
    },



    //returns all regions of one continent
    getRegionsByContinent: function(continentName, callback){
	Region.find({'continent' : continentName}, function(err, obj){
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

};
