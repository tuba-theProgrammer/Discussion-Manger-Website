var mysql = require('mysql');

var connectionToMySql = mysql.createConnection({
  host: "localhost",
  user: "root",
  database:"discussion_manager",
  password: ""
});

connectionToMySql.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports=connectionToMySql;


// var mysql = require('mysql');

// var connectionToMySql = mysql.createConnection({
//   host: "162.241.24.128",
//   user: "hrtowkmy_zeeshan",
//   database:"hrtowkmy_discussion_manager",
//   password: "zee1234"
// });

// connectionToMySql.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
// module.exports=connectionToMySql;

