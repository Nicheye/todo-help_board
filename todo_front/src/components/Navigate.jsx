import React, { useState, useEffect} from 'react';

import {Link} from 'react-router-dom'

const Navigate = () => {
	const [isAuth,setIsAuth] = useState(false)
	useEffect(() => {
		if(localStorage.getItem('access_token') !== null){
			setIsAuth(true);
		}
	},[isAuth]);
  return (

  <>


<nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div class="container">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <Link to="/help" className='nav-link'>Help </Link>
      <Link to="/" className='nav-link'>To Do</Link>
      

        {isAuth ? <Link to="/logout" className='nav-link '>Logout</Link> :
                  
                  
                  <Link to="/login" className='nav-link '>Login</Link>}
       
      </ul>
      
    </div>
  </div>
</nav>
  </>       
  )
}

export default Navigate