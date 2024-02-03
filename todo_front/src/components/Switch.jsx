import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Prisepopup from './Prisepopup';

const Switch = (props) => {
  const [change, setChange] = useState(props.status);

  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };


  

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      window.location.href = '/login';
    }
  }, []);

  const handleChange = async () => {
    setChange(!change);
	
	const changer_data = {
		prize: '',
		status:!change
	  };

    if (!change==true){
		try {
			const { data } = await axios.post(
			  `http://127.0.0.1:8000/api/v1/help/${props.id}`,
			  changer_data,
			  config
			);
			console.log('API request successful:', data);
		  } catch (e) {
			console.log('Something went wrong with adding helpcard:', e);
		  }
	}

	else{
		try {
			const { data } = await axios.patch(
			  `http://127.0.0.1:8000/api/v1/help/${props.id}`,
			  changer_data,
			  config
			);
			console.log('API request successful:', data);
		  } catch (e) {
			console.log('Something went wrong with adding helpcard:', e);
		  }
	}
  };

  
  if (change==true){
	return (
		<>
		<Prisepopup id={props.id} />
		
		<div className="form-check form-switch">
		  <input
			className="form-check-input"
			type="checkbox"
			role="switch"
			id="flexSwitchCheckDefault"
			
			checked={change}
			onChange={handleChange}
		  />
		  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
			Request for help
		  </label>
		</div>
		
		</>
	  );
  }
  else{
	return (
		<>
		<Prisepopup id={props.id} />
		
		<div className="form-check form-switch">
		  <input
			className="form-check-input"
			type="checkbox"
			role="switch"
			id="flexSwitchCheckDefault"
			data-bs-toggle="modal" data-bs-target={`#change_price_popup_${props.id}`}
			checked={change}
			onChange={handleChange}
		  />
		  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
			Request for help
		  </label>
		</div>
		</>
	  );
  }
  
};

export default Switch;
