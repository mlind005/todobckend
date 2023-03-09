import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { TfiPencilAlt } from 'react-icons/tfi';
import { Draggable } from 'react-beautiful-dnd'
import axios from 'axios';
const Port = "http://localhost:6969/api/v1"


const Todoitem = ({ index, Todo, setEditTodo, editinputs,
  setEditInputs, GetData }) => {

  const [cheack, setCheack] = useState(Todo.status)


  const handleDelete = async () => {
    try {
      let res = await axios.delete(`${Port}/delete/${Todo._id}`)
      GetData();
    } catch (err) { console.log(err) }
  }
  
  const handlestaus = async (e) => {
    setCheack(!cheack)
    try {
      let res = await axios.put(`${Port}/updateStatus/${Todo._id}`, { status: e.target.checked })
      // GetData();
    } catch (err) { console.log(err) }
  }


  return (
   
          <div className="card p-2 m-2 todo_card gap-1">
            <input type="checkbox" className='m-auto mx-0'
              name="status"
              checked={cheack}
              onChange={handlestaus}
            />
            <div className="todo_text">
              <strong >
                {cheack ?
                  <del> {Todo.task}</del> :
                  Todo.task
                }
              </strong>
              {/* <p>Id:{Todo._id}</p> */}
              {/* <p>index:{index}</p> */}
              <small className='d-block'>{Todo.date}</small>
            </div>
            <div className='d-flex gap-2'>
              <button className='btn btn-dark btn-sm'
                onClick={() => {
                  setEditInputs({ ...Todo })
                  setEditTodo(true)
                }}
              ><TfiPencilAlt /></button>
              <button className='btn btn-danger btn-sm'
                onClick={handleDelete}
              >< FaTrashAlt /></button>
            </div>
          </div>

        

  )
}

export default Todoitem