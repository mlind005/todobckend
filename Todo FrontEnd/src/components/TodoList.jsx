import React, { useEffect, useState } from 'react'
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import Todoitem from './Todoitem'
import Createtodo from './modals/Createtodo'
import EditTodo from './modals/EditTodo'

const Port = "http://localhost:6969/api/v1"


const TodoList = () => {

  const [listOrder,setListOrder] = useState({})


  const [create, setCreate] = useState(false)

  const [editTodo, setEditTodo] = useState(false)  //this is for showing edit input
  const [editinputs, setEditInputs] = useState({}) //this is for edit input



  const [todos, setTodos] = useState([]) //getting all todos 

  useEffect(() => {
    GetData();
  }, [])


  const GetData = async () => {
    try {
      let res = await axios.get(`${Port}/Alltodos`)
      setListOrder(res.data.order)

      const order = res.data.order; //this contains array of Ids in order
      const Data = res.data.todos; // this contains array of the data


      const orderedArray = order.map((cur)=>{
        return Data.find(el=>el._id === cur)
      })
      // console.log("order:",order)
      // console.log("orderedarray:",orderedArray)

    const newItems = Data.filter(el=>{
      return !order.includes(el._id)
    }).reverse()

    const finalArray = [...newItems,...orderedArray]
    
      // setTodos(Data)
      setTodos(finalArray)
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(`${Port}/delete/${id}`)
      alert(res.data.message)
      GetData();
    } catch (err) { console.log(err) }
  }


  const handleDragEnd = (result) => {
    
    const {source,destination} = result;
    if(!destination) return;
    if(destination.index === source.index) return;

    let add,active = todos
    add= active[source.index]
    active.splice(source.index,1);
    active.splice(destination.index,0,add) ;
    
    const IdOrder =active.map((cur)=>cur._id)
    updateOrder(IdOrder)
    setTodos(active)
  }

const updateOrder=async(order)=>{
  try{
    let res  = await axios.put(`${Port}/ListOrder`,{order})
  }
  catch(err){console.log(err)}
}




  return (
    <div>
      <Createtodo create={create}
        setCreate={setCreate}
        GetData={GetData}
      />
      <EditTodo
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        editinputs={editinputs}
        setEditInputs={setEditInputs}
        GetData={GetData}
      />

      <div className="header text-center p-2 m-auto my-2 border-circle ">
        <h1 style={{ fontWeight: "bold", color: "white" }}>Todo List</h1>
        
        <button className='btn btn-success m-3 my-0'
          onClick={() => { setCreate(true) }}
          ><h3> Create Todo</h3></button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>

        <Droppable droppableId="droppable">
          
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            // style={getListStyle}
            >


              <div className='todo_body p-3 m-auto'>
              {/* {provided.placeholder} */}
                {todos.map((Todo, index) => {

                  return (

                    <Draggable draggableId={Todo._id} index={index} key={Todo._id}> 
                      {(provided) => (

                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {/* <h4>{index}</h4> */}
                          <Todoitem
                            index={index}
                            Todo={Todo}
                            setEditTodo={setEditTodo}
                            editinputs={editinputs}
                            setEditInputs={setEditInputs}
                            GetData={GetData} />
                        </div>
                      )}

                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default TodoList