import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router'

export const PrivateRoute = ({
  component: Component,
  isLoged,
  ...rest
}) => {
  
  return (
    <Route {...rest}
      component={(props) => (
        isLoged
        ? (<Component {...props} />)
        : (<Redirect to="/auth/login" />)
      )}
    />    
  )
}

PrivateRoute.propTypes = {
  isLoged: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
}