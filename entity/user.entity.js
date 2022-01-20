const  EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "char",
            length: 50,
            nullable: false,
        },
        username: {
            type: "char",
            length: 50,
            nullable: false,
        },
        password: {
            type: "char",
            length: 100,
            nullable: false,
        }
    }
})