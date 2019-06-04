Add a list of item-histories ids from the database

Add your jwt token in config.js file

Check that the environment api.

Add the list of ids on batchlist you can use following query 

db.getCollection('item-histories').find({ "item.state": "draft", "item.type" : "GGUM" }, {_id:1})

You will have to clean up the results from robomongo, column edition on notepad++ helps with it

When you are ready to run use 

    npm install
    npm run main
    
