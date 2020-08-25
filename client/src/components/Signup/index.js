
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'redux-react-hook';
import { withRouter } from 'react-router-dom';
import * as actions from '../../constants/actions_types';


function Signup(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleChange = setter => e => {
    console.log('handle change fired')
    setter(e.target.value);
  }

  
const submit = async (e) => {
  
  e.preventDefault();
  console.log('submit fired');
  try {
      const requestBody = {
          query: `
              mutation {
                  createUser(userInput: {
                      email: "${email}"
                      password: "${password}"
                      confirm: "${confirm}"
                  }) {
                      _id
                      token
                      email
                  }
              }
          `
      };

      const { data } = await axios.post('http://localhost:5000/graphql', requestBody);

      if (data.errors) {
          console.log(data.errors[0].message);
      }
      else {
          const { _id, token } = await data.data.createUser;
          
          dispatch({
              type: 'SET_AUTH_USER',
              authUser: {
                  _id,
                  email
              }
          })
          localStorage.setItem('token', token);
          props.history.push('/');
      }
  }
  catch (e) {
      console.log(e);
  }
}


 

  return (
    <div>
      <h1>Sign up</h1>
      <div className="auth-form">
      <form>
          <input className="form-input" type="email" placeholder="Email" value={email} onChange={handleChange(setEmail)} />
          <input className="form-input" type="password" placeholder="Password" value={password} onChange={handleChange(setPassword)} />
          <input className="form-input" type="password" placeholder="Confirm password" value={confirm} onChange={handleChange(setConfirm)} />
          <input className="form-submit" type="submit" value="Register" onClick ={submit} />
      </form>
      </div>
    </div>
  )
}


export default withRouter(Signup);