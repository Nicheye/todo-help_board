import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Switch from './Switch'
import CreateTodo from './CreateTodo'
const Home = () => {
  const [todos,setTodos] = useState([])

  useEffect(() => {
    if(localStorage.getItem('access_token') ===null){
      window.location.href = '/login'

    }
    else{
      (async () =>{
        try{
          const {data} = await axios.get(
            'http://127.0.0.1:8000/api/v1/',{
              headers:{
                'Content-Type':'application/json'
              },
              withCredentials:true,
            }
          );
          setTodos(data.todos);
          console.log(data.todos)
        }
        
        catch (e){
          console.log('not auth')
        }
      })()};
  },[]);

  const handleCloseTodo = async(todoId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const closed_data = {
      name:'',
      description:'',
      created_till:'',
      is_closed: true,
    };

    try {
      const { data } = await axios.patch(
        `http://127.0.0.1:8000/api/v1/${todoId}`,
        closed_data,
        config
      );
      console.log('API request successful:', data);
    } catch (error) {
      console.log('Something went wrong with adding helpcard:', error);
    }
  };


  return (
    <>
    <CreateTodo/>
    
    <div className="container">
      <div className="gb">
      <button className="btn btn-primary add_btn" data-bs-toggle="modal" data-bs-target="#create_todo">add new </button>
      </div>
    
      <div className="todo-wrapper">
      
      {todos.map( todo =>
        <div className="todocard">
          <div className="todo_card-title">{todo.name}</div>
          <div className="todo_card-descr">{todo.description}</div>
          <div className="todo_card-till">{todo.created_till}</div>

          <Switch  status = {todo.is_helping} id={todo.id}/>
          {!todo.is_closed && (
              <div
                className="todo_card-close"
                onClick={() => handleCloseTodo(todo.id)}
              >
                close
              </div>
            )}
          

        </div>
      )}
      </div>
    </div>
    
    </>
  )
}

export default Home