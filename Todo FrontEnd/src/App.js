import './App.css';
import React from 'react'
import TodoList from './components/TodoList';
import Charts from './components/Charts';

function App() {
  return (
    <div className="App">
      <h1 style={{color:"white",fontWeight:"Bold"}}>TodoList App with Dashboard</h1>
             <Charts/>
              <TodoList />
    </div>
  );
}


export default App;
