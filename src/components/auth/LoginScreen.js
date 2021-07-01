import React from 'react'

import validator from 'validator'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'

import { useForm } from '../../hooks/useForm'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { Input } from './Input'

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const {msgError, loading} = useSelector(state => state.ui);
  const userValues = {
    email: '',
    password: ''
  };

  if(process.env.NODE_ENV === 'test'){
    userValues.email = 'test@test.com';
    userValues.password = '123456'
  }

  const [formValues, handleInputChange] = useForm({
    email: userValues.email,
    password: userValues.password
  });
  const {email, password} = formValues;

  const expresiones = {
    email: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
    password: /^.{6,100}$/
  }

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  }
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    if(isFormValid()){
      dispatch(startLoginEmailPassword(email, password))
    }
  }
  
  const isFormValid = () => {

    if(!validator.isEmail(email)){
      dispatch(setError('Email is not valid'));
      return false;
    } else if(password.length < 6){
      dispatch(setError('Password is less to 6 characters'));
      return false;
    }
    
    dispatch(removeError());
    return true;
  }

  return (
    <>
      <h3 className="auth__title txt-center mb-2">Login</h3>
      <form onSubmit={handleLogin}>
        
       <Input
        required={true}
        labelText="Email:"
        name="email"
        type="email"
        placeholder="Email"
        errorMessage="Email is Required"
        expresionRegular={expresiones.email}
        handleInputChange={handleInputChange}
        value={email}
       />
        
       <Input
        labelText="Password:"
        name="password"
        type="password"
        placeholder="Password"
        expresionRegular={expresiones.password}
        handleInputChange={handleInputChange}
        value={password}
       />

        <div className="txt-center mb-2">
          <button
            className="btn btn-primary btn-block"
            type="submit"
            disabled={loading}
          >
            <span>Login</span>
            {
              (loading)
              && (<i className="fa fa-circle-notch fa-spin"></i>)
            }
          </button>
        </div>
      </form>
      
      {
        (msgError)
        && (
          <div className="auth__alert-error">
            <p>{msgError}</p>
          </div>
        )
      }
      
      <hr/>

      <div className="auth__social-network">
        <p>Login with social networks</p>  
        <div 
          className="google-btn mt-2"
          onClick={handleGoogleLogin}
        >
          <div className="google-icon-wrapper">
            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
          </div>
          <p className="btn-text">
            <b>Sign In with Google</b>
          </p>
        </div>
      </div>

      <div className="txt-end">
        <Link 
          to="/auth/register"
          className="link"
        >
          Create new account
        </Link>
      </div>
    </>
  )
}
