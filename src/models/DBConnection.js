const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "testmodule3"

})

module.exports = connection;
connection.connect(err=>{
    if(err) {
        console.log(err);
    }else{
        console.log("Connected to database");
    }
})