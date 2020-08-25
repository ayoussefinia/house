import React from 'react';
function Signup() {
  return (
    <div>
      <h1>Sign up</h1>
      <div className="auth-form">
        <form>
          <input className="form-input" type="email" placeholder="Email" />
          <input className="form-input" type="password" placeholder="Password" />
          <input className="form-input" type="password" placeholder="Confirm password" />
          <input className="form-submit" type="submit" value="Register" />
        </form>
      </div>
    </div>
  )
}
export default Signup;