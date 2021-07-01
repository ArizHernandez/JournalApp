import React from 'react'

import validator from 'validator'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterEmailPasswordName } from '../../actions/auth';
import { Input } from './Input';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const {msgError, loading} = useSelector( state => state.ui );
  const userValues = {
    name:'',
    email: '',
    password: '',
    password2: ''
  }

  if(process.env.NODE_ENV === 'test'){
    userValues.name = 'test';
    userValues.email = 'test@test.com';
    userValues.password = '123456';
    userValues.password2 = '123456';
  }


  const [formValues, handleInputChange] = useForm({
    name: userValues.name,
    email: userValues.email,
    password: userValues.password,
    password2: userValues.password2
  })
  const {name, email, password, password2} = formValues;

  const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
    password: /^.{6,100}$/
  }

  const handleRegister = (e) => {
    e.preventDefault();

    if(isFormValid()) {
      dispatch(startRegisterEmailPasswordName(email, password, name));
    }
  }

  const isFormValid = () => {
    
    if(name.trim().length === 0){
      dispatch(setError('name is required'))
      return false;
    } else if(!validator.isEmail(email)){
      dispatch(setError('Email is required'));
      return false
    } else if(password !== password2 || password.length < 6){
      dispatch(setError('password is less to 6 characters or is not equal'));
      return false;
    }

    dispatch(removeError());
    return true;
  }

  return (
    <>
      <h3 className="auth__title txt-center mb-2">Register</h3>
      <form onSubmit={handleRegister}>

        <Input
          required={true}
          labelText="Name:"
          name="name"
          type="text"
          placeholder="Name"
          autoComplete="off"
          errorMessage="Name is not valid"
          expresionRegular={expresiones.name}
          handleInputChange={handleInputChange}
          value={name}
        />

        <Input
          required={true}
          labelText="Email:"
          name="email"
          type="email"
          placeholder="example@example.com"
          errorMessage="Email is not valid"
          expresionRegular={expresiones.email}
          handleInputChange={handleInputChange}
          value={email}
        />

        <Input
          required={true}
          labelText="Password:"
          name="password"
          type="password"
          placeholder="******"
          expresionRegular={expresiones.password}
          handleInputChange={handleInputChange}
          value={password}
        />

        <Input
          required={true}
          labelText="Confirm Password:"
          name="password2"
          type="password"  
          placeholder="******"
          expresionRegular={expresiones.password}
          handleInputChange={handleInputChange}
          value={password2}
        />

        <div className="txt-center">
          <button
            className="btn btn-primary btn-block"
            type="submit"
            disabled={loading}
          >
            <span>Sign In </span>
            {
              (loading)
              && (<i className="fa fa-circle-notch fa-spin"></i>)
            }
          </button>
        </div>
      </form>
      <div className="mt-1">
        <span>Alredy registered? </span>
        <Link 
          to="/auth/login"
          className="link"
        >
          logIn
        </Link>
      </div>
      {
        (msgError && !loading) 
        && (
          <div className="auth__alert-error mt-2">
            <p>{msgError}</p>
          </div>
        )
      }
    </>
  )
}
