const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

//get items from the database that user adds to
app.get('/get', (req, res) =>{
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

//update whether task was completed
app.put('/update/:id', (req, res) =>{
    const {id} = req.params
    TodoModel.findByIdAndUpdate({_id: id}, {completed: true})
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) =>{
    const{id} = req.params
    console.log(id)
    TodoModel.findByIdAndDelete({_id: id})
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

//adding new items to the database
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result=> res.json(result))
        .catch(err => res.json(err))
})

//make sure the server runs
app.listen(3001, () =>{
    console.log("Server is running")
})