const mongoose = require('mongoose')

//the schema is just a string, todo add dates and times later
const TodoSchema = new mongoose.Schema({
    task: String,
    completed: {
        type: Boolean,
        default: false
    }
})

const TodoModel = mongoose.model("todos", TodoSchema)
module.exports = TodoModel