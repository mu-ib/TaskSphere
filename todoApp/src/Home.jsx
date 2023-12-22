import React, {useEffect, useState} from 'react'
import Create from "./Create.jsx";
import axios from "axios";
import {BsCircle, BsCircleFill, BsFillTrashFill} from "react-icons/bs";

function Home(){
    const [todos, setTodos] = useState([])
    // get the items from the DB
    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, []);

    //check off items
    const handleCheck = (id) => {
        axios.put('http://localhost:3001/update/'+id)
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err))
    };

    //delete items
    const handleDel = (id) => {
        axios.delete('http://localhost:3001/delete/'+id)
            .then(result => {
                location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={"home"}>
            <h1>TaskSphere</h1>
            {/* The box for the list of to do items */}
            <div className={"create_form"}><Create /></div>
            <br/>

            <div className={"list"}>
            {
                todos.length === 0 ?
                    <div className={"no-items"}><h2>There are no items in your list.</h2></div>:

                todos.map(todo=> (
                    <div className={`task`}>
                        <div className={'check'} onClick={() => handleCheck(todo._id)}>
                            {todo.completed ?
                                <BsCircleFill className={'icon'}></BsCircleFill>
                                : <BsCircle className={'icon'}/>}
                            <p className={todo.completed ? 'strike_through': ''}>{todo.task}</p>
                        </div>
                        <div>
                            <span className={'delete'} onClick={() => handleDel(todo._id)}>
                                <BsFillTrashFill className={'icon'}/></span>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Home