import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';
 
const middlewares = [thunk]
const mockStore = configureStore(middlewares);
const initialState = {
  auth: {
    uid: '',
    displayName: ''
  },
  ui: {
    loading: false,
    msgError: null
  }
};

const store = mockStore(initialState);
store.dispatch = jest.fn();

jest.mock('../../../actions/auth', () =>({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn()
  })
);

describe('Pruebas en el <LoginScreen />', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  })

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    </Provider>
  );

  test('Debe de cargar correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('Debe de disparar la acción del startGoogleLogin', () => {
    wrapper.find('.google-btn').prop('onClick')();
    
    expect(store.dispatch).toHaveBeenCalled();
    expect(startGoogleLogin).toHaveBeenCalled();
  })
  
  test('Debe de disparar la acción startLoginEmailPassword', () => {
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    
    expect(startLoginEmailPassword).toHaveBeenCalledWith('test@test.com', '123456')
  })
})