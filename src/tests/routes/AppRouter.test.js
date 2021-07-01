import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { login } from '../../actions/auth';
import { AppRouter } from '../../routes/AppRouter';
import { firebase } from '../../firebase/firebase-config'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {},
    notes: []
  }
};

const store = mockStore(initialState);
store.dispatch = jest.fn();

jest.mock('../../actions/auth', () => ({
  login: jest.fn(),
}));

describe('Pruebas en el AppRouter', () => {  
  let user;

  test('Debe de cargar el <LoginScreen /> al estar autenticado', async() => {
    await act(async() =>{
      const userCredential = await firebase.auth().signInWithEmailAndPassword('test@test.com', '123456');
      user = userCredential.user;
      
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    })

    expect(login).toHaveBeenCalled();
    expect(login).toHaveBeenCalledWith("w5ELE30EnLdCLrHcxniMKqNSxsq2", null);
  })
})
