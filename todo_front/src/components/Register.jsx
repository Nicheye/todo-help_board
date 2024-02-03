import React,{useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
// Define the Login function.
const Register = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [telegram,setTelegram] = useState('');
// Create the submit method.
  const submit = async e =>{
    e.preventDefault()

    const user = {
      username:username,
      password:password,
      telegram:telegram
    };
// Create the POST requuest


    await fetch('http://localhost:8000/register/',{
      method:'POST',
      headers:{'Content-Type':"application/json"},
      body: JSON.stringify(
        {
          username,
          password,
          telegram
        }
      )
    });
    window.location.href='/login'
  
  }

  return (
    <>
    <div className="container">
      <div className="auth-form">
        <div className="auth-title">Register</div>
        <form className='form_auth' action="" onSubmit={submit}>

          <input className="auth_input" 
            placeholder="Enter Username" 
            name='username'  
            type='text' value={username}
            required 
            onChange={e => setUsername(e.target.value)}/>
        

          <br />

          <input name='auth_input' 
            type="text"     
            className="auth_input"
            placeholder="Enter telegram"
            value={telegram}
            required
            onChange={e => setTelegram(e.target.value)}/>
        

           

          <input name='auth_input' 
            type="password"     
            className="auth_input"
            placeholder="Enter password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}/>
        

            <button type='submit' className='auth_btn'>
              Register
            </button>
    
        </form>
          <Link className='auth_text' to='/login' > have acc? login</Link>
      </div>
    </div>
    </>
  )
}

export default Register