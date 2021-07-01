import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { Types } from '../types/types';
import { notesLogout } from './notes';
import { startLoading, finishLoading, setError } from './ui';


export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => dispatch(login(user.uid, user.displayName)))
            .catch((err) => Swal.fire('Error!', err.message, 'error'))
            .finally(() => dispatch(finishLoading()))
  };
}

export const startRegisterEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    dispatch(startLoading());

    return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user}) => {
              await user.updateProfile({displayName: name})

              dispatch(login(user.uid, user.displayName))
            })
            .catch((err) => Swal.fire('Error!', err.message, 'error'))
            .finally(() => dispatch(finishLoading()));
  }
}

export const startGoogleLogin = () => {
  return ((dispatch) => {
    firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) => dispatch(login(user.uid, user.displayName)))
  });
}

export const startLogout = () => {
  return async(dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout())
    dispatch(notesLogout());
  }
}

export const login = (uid, displayName) => ({
    type: Types.login,
    payload: {
      uid, 
      displayName
    }
})

export const logout = () => ({
  type: Types.logout
});