import React from 'react'
import { Modal } from "react-bootstrap"
// import "./todoModal.css"
import axios from 'axios'
const Port = "http://localhost:6969/api/v1"

const EditTodo = ({
  editTodo
  , setEditTodo,
  editinputs
  , setEditInputs,
  GetData }) => {

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      if (!editinputs.task) {
        alert("please Enter the task")
        return
      }
      let res = await axios.put(`${Port}/updateTodo/${editinputs._id}`, editinputs)
      if (res.data.status === 1) {
        GetData();
        setEditInputs({})
        setEditTodo(false)
      }
    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
      <div className='Todo_modal'>
        <Modal
          //   {...props}
          show={editTodo}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered

        >
          <Modal.Header
            className='Todo_modal_head'
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <h3>Edit Task</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className='Todo_modal_body'
          >
            <form>
              <div class="mb-3">
                <label htmlFor="Task" class="form-label"><strong><h5>Task</h5></strong></label>
                <input type="text" class="form-control" id="Task"
                  value={editinputs.task}
                  onChange={(e) => setEditInputs({ ...editinputs, task: e.target.value })}
                />
              </div>
              <div class="mb-3">
                <label htmlFor="date" class="form-label"><strong><h5>Date</h5></strong></label>
                <input type="date" class="form-control" id="Task"
                  value={editinputs.date}
                  onChange={(e) => setEditInputs({ ...editinputs, date: e.target.value })}
                />
              </div>

            </form>
          </Modal.Body>
          <Modal.Footer className='Todo_modal_head'>
            <button type="submit" class="btn btn-success"
              onClick={updateItem}
            >Submit</button>
            <button className='btn btn-danger'
              onClick={() => {
                setEditTodo(false)
                setEditInputs({})
              }}
            >Close</button>
          </Modal.Footer>
        </Modal>

      </div>

    </div>
  )
}

export default EditTodo