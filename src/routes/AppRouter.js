import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { JournalScreen } from '../components/journal/JournalScreen';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const [isLoged, setIsLoged] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged( async(user) => {
      if(user?.uid){
        dispatch(login(user.uid, user.displayName));
        setIsLoged(true);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoged(false);
      } 
      
      setIsChecking(false);
    });
  }, [dispatch, setIsChecking, setIsLoged])

  if(isChecking){
    return (
      <div className="loading__main-container">
        <i className="loading__spinner fa fa-spinner fa-pulse fa-5x"></i>
        <p className="loading__text">Please, wait...</p>
      </div>
    )
  } 

  return (
    <Router>
      <div>
        <Switch>

          <PublicRoute
            path="/auth"
            isLoged={isLoged}
            component={AuthRouter}
          />

          <PrivateRoute
            path="/"
            isLoged={isLoged}
            component={JournalScreen}
          />

        </Switch>
      </div>
    </Router>
  )
}
