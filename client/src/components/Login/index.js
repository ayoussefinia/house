import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'redux-react-hook';
import { withRouter } from 'react-router-dom';
import * as actions from '../../constants/actions_types';
import * as routes from '../../constants/routes';


function Login(props) {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = setter => e => {
    setter(e.target.value);
  }

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        _id
                        token
                        email
                    }
                }
            `
        };

        const { data } = await axios.post('http://localhost:5000/graphql', requestBody);

        if (data.errors) {
            setError(data.errors[0].message);
            setLoading(false);
        }
        else {
          // console.log(data);
            setError(null);
            setLoading(false);
            const { _id, token } = await data.data.login;
            
            dispatch({
                type: actions.SET_AUTH_USER,
                authUser: {
                    _id,
                    email
                }
            })
            localStorage.setItem('token', token);
            props.history.push(routes.HOME);
        }
    }
    catch (e) {
        setError(e);
        setLoading(false);
    }
}
  
  return (
    <div>
      <h1>Login</h1>
      <div className="auth-form">
        <form>
          <input className="form-input" type="email" placeholder="Email" value=   {email} onChange={handleChange(setEmail)} />
          <input className="form-input" type="password" placeholder="Password"    value={password} onChange={handleChange(setPassword)} />
          <div><span style={{ color: "red" }}>{error || ""}</span></div>
          <input className="form-submit" type="submit" value={loading ?           "Verifying..." : "Login"} onClick ={submit}  />
        </form>
      </div>
    </div>
  )
}

export default withRouter(Login);
