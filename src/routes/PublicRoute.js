import React from 'react'
import { Redirect, Route } from 'react-router'

export const PublicRoute = ({
  component: Component,
  isLoged,
  ...rest
}) => {

  return (
    <Route 
    {...rest}
      component={(props) => (
        (!isLoged)
        ? (<Component {...props} />)
        : (<Redirect to="/" />)
      )}
    />
  )
}
