import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({onSubmit, errorMsg, email, password, onEmailChange, onPasswordChange}) => {
  return (
        <div>
            <span className="textDescription-customizable "><h1>Log In</h1></span>
            
            <div style={{display : ((!errorMsg || 0 === errorMsg.length) ? 'none' : 'block')}} id="loginErrorMessage" className="errorMessage-customizable">
                <div  >{errorMsg} </div>
            </div>
            <label className="label-customizable">Email</label>
            <div><input id="email" name="email" type="text" className="form-control inputField-customizable"
                        placeholder="Email" value={email} onChange={onEmailChange}/></div>
            <br/>
            <label className="label-customizable">Password</label>
            <div><input id="password" name="password" type="password" className="form-control inputField-customizable"
                        placeholder="Password" value={password} onChange={onPasswordChange}/></div>
            { /*TODO setup redirect_uri correctly*/ }
            <a className="redirect-customizable"
                href="/forgotPassword?redirect_uri=https://web.integration.cwds.io/perry/login&amp;response_type=code&amp;state=7DRlOO">Forgot
                your password?</a>
            
            <button className="btn btn-primary submitButton-customizable" type="button" onClick={onSubmit}>Sign in</button>
            <br/>
        </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired
}

export default LoginForm;