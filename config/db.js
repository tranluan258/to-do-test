const typeorm = require("typeorm");

 typeorm.createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: "123456",
  database: "to-do-test",
  synchronize: true,
  entities: [
    require("../entity/user.entity"),
    require("../entity/to-do.entity")
  ],
}).then( async function(connection) {
  console.log("Connected database");
  module.exports = connection;
}).catch(function(error) {
  console.log(error);
})
