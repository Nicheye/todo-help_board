import React, { useState,useEffect } from 'react'
import axios from 'axios';
const Helperpage = () => {
  const [help_cards,setHelpCards] = useState([]);
  useEffect(() => {
    if(localStorage.getItem('access_token') ===null){
      window.location.href = '/login'

    }
    else{
      (async () =>{
        try{
          const {data} = await axios.get(
            'http://127.0.0.1:8000/api/v1/help',{
              headers:{
                'Content-Type':'application/json'
              },
              withCredentials:true,
            }
          );
          setHelpCards(data.data);
          console.log(data.data)
        }
        
        catch (e){
          console.log('not auth')
        }
      })()};
  },[]);
  return (
	<>
  <div className="help-screen">
    <div className="container">

      <div className="todo-wrapper">
      {help_cards.map( card =>
        <div className="todocard">
          <div className="todo_card-title">{card.card.name}</div>
          <div className="todo_card-descr">{card.card.description}</div>
          <div className="todo_card-till">{card.card.created_till}</div>
          <div className="help-bottom">
            <div className="help-author">
              contact: <br />
              @{card.telegram}</div>
            <div className="help-prize">
              prize: <br />
              {card.prize}</div>
          </div>
        </div>
      )}
      </div>
    </div>
  </div>
  
  </>
  )
}

export default Helperpage