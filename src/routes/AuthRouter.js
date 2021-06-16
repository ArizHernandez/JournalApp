import React from 'react'
import { 
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AuthRouter = ({match}) => {
  return (
    <div className="auth__main">
      <div className="auth__box-container animate__animated animate__fadeIn">
        <Switch>
          <Route 
            path={`${match.url}/login`}
            component={LoginScreen}
          />
          <Route
            path={`${match.url}/register`}
            component={RegisterScreen}
          />
          <Redirect to={`${match.url}/login`} />
        </Switch>
      </div>
    </div>
  )
}
