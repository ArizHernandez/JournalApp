import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { Types } from '../../../types/types';
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initilaState = {
  auth: {
    displayName: '',
    uid: ''
  },
  ui: {
    msgError: null, 
    loading: false
  }
}

const store = mockStore(initilaState);

describe('Pruebas en el <RegisterScreen />', () => {
  beforeEach(() => {
    store.clearActions();
  })

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <RegisterScreen />
      </MemoryRouter>
    </Provider>
  );

  test('Debe de cargar correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  })

  test('Debe de hacer el dispatch de startRegisterEmailPasswordName', () => {
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    const actions = store.getActions();

    expect(actions[0]).toEqual({type: Types.uiRemoveError});
  })

  test('Debe de mostrar la caja de alerta correctamente', () => {
    const initilaState = {
      auth: {
        displayName: '',
        uid: ''
      },
      ui: {
        msgError: 'El email es requerido', 
        loading: false
      }
    }
    
    const store = mockStore(initilaState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initilaState.ui.msgError);
  })
  
})
