import React, { useState } from 'react';
import axios from 'axios';

const Prisepopup = (props) => {
  const [prize, setPrize] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    const prize_data = {
      prize: prize,
    };

    try {
      const { data } = await axios.patch(
        `http://127.0.0.1:8000/api/v1/help/${props.id}`,
        prize_data,
        config
      );
      console.log('API request successful:', data);
    } catch (error) {
      console.log('Something went wrong with adding helpcard:', error);
    }

    // Clear the prize state after submitting
    setPrize('');
  };

  return (
    <>
      <div className="modal fade" id={`change_price_popup_${props.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form onSubmit={submit}>
                <input
                  className="auth_input"
                  placeholder="Enter prize"
                  name="prize"
                  type="text"
                  value={prize}
                  required
                  onChange={(e) => setPrize(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" data-bs-dismiss='modal'>
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prisepopup;
