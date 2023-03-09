// var d=new Date("2023-05-23");
// alert(d.getMonth()+1);
// alert(d.getFullYear());
// alert(d.getDate());
import React, { useState } from 'react'
import { Modal } from "react-bootstrap"
import "./todoModal.css"
import axios from "axios"

const Port = "http://localhost:6969/api/v1"


function currentDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  if (dd < 10) { dd = `0${dd}`; };
  if (mm < 10) { mm = `0${mm}`; };
  return `${yyyy}-${mm}-${dd}`
}


const Createtodo = ({ create, setCreate ,GetData}) => {

const initialValue = { task: "",date: currentDate(),status: false}

  const [newTodo, setNewTodo] = useState(initialValue);

const handleClose=()=>{
setNewTodo(initialValue);
setCreate(false)

}
const handlSubmit = async(e) => {
  e.preventDefault();
  try{
    if(!newTodo.task){
      alert("please Enter the task")
      return
    }
    let res = await axios.post(`${Port}/Addtodo`,newTodo)
    if(res.data.status === 1){
      setNewTodo(initialValue)
      setCreate(false)
      GetData();
    } 
  }
    catch(err){
      console.log(err)
    }
  }



  return (
    
    <div className='Todo_modal'>
      <Modal
        show={create}   //here we are geting to show or not the box
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >
        <Modal.Header
          className='Todo_modal_head'
        >
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>Create Task</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className='Todo_modal_body'
        >
          <form>
            <div className="mb-3">
              <label htmlFor="Task" className="form-label"><strong><h5>Task</h5></strong></label>
              <input type="text" className="form-control" id="Task" name='Task'
              value={newTodo.task}
                onChange={(e) => { setNewTodo({ ...newTodo, task: e.target.value }) }}
              />

            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label"><strong><h5>Date</h5></strong></label>
              <input type="date" className="form-control" id="Task" name='Date'
                value={newTodo.date}
                onChange={(e) => { setNewTodo({ ...newTodo, date: e.target.value }) }} />
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer className='Todo_modal_head'>
          <button type="submit" className="btn btn-success"
            onClick={handlSubmit}
          >Submit</button>
          <button className='btn btn-danger'
            onClick={handleClose }
          >Close</button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Createtodo




















