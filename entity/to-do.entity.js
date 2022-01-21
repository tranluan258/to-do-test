const  EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "To-do",
    tableName: "to-do",
    columns: {
        id: { 
            primary: true,
            type: "char",
            length: 50,
            nullable : false,
        },
        name: { 
            type: "char",
            length: 50,
            nullable : false,
        },
        description: {
            type: "char",
            length: 50,
            nullable : false,
        },
        userId: { 
            type: "char",
            length: 50,
            nullable : true,
        },
        dateCompletion: { 
            type: "date",
            nullable : false,
        },
        status: { 
            type: "char",
            length: 10,
            default: "NEW",
        },
        dateCreations: { 
            type: "date",
        },
        dateModifications: { 
            type: "date",
        }
    }
})