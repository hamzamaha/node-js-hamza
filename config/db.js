const mongoose =require('mongoose');

mongoose.connect(process.env.DB_URL,{
    dbName:process.env.DB_NAME
}).then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

