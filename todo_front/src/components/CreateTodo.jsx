import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
const CreateTodo = () => {
  const [name,setName] = useState('');
  const [description,setDescription] = useState('');
  const [created_till,setcreated_till] = useState('');

  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const todo_data = {
		name: name,
		description:description,
		created_till:created_till
    };

    try {
      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/v1/`,
        todo_data,
        config
      );
      console.log('API request successful:', data);
    } catch (error) {
      console.log('Something went wrong with adding helpcard:', error);
    }
  };



  return (
	<>
      <div className="modal fade" id="create_todo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={submit}>
                <input
                  className="auth_input"
                  placeholder="Enter name"
                  name="name"
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />

				<input
                  className="auth_input"
                  placeholder="Enter descr"
                  name="descr"
                  type="text"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />

				<input 
				type="date" 
				id="start" 
				name="trip-start" 
				className="auth_input"
				value={created_till} 
				min="2024-01-01" 
				max="2028-12-31" 
				required 
				onChange={(e) => setcreated_till(e.target.value)}/>


                <button type="submit" className="btn btn-primary" data-bs-dismiss='modal'>
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateTodo