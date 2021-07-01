import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { mount } from 'enzyme';
import { Sidebar } from '../../../components/journal/Sidebar';
import { Provider } from 'react-redux';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn()
}))

jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn()
}))

const middlewares = [thunk];
const muckStore = configureStore(middlewares);
const initialState = {
  auth: {},
  notes: {
    notes: [],
    active: {}
  }
}

const store = muckStore(initialState);
store.dispatch = jest.fn();

describe('Pruebas en el <Sidebar />', () => {
  const wrapper = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  )
  
  test('Debe cargar correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
  test('Debe de llamar el logout', () => {
    wrapper.find('.journal__logout').prop('onClick')();

    expect(startLogout).toHaveBeenCalled();
  })

  test('Debe de llamar el startNewNote', () => {
    wrapper.find('.journal__new-entry').prop('onClick')();

    expect(startNewNote).toHaveBeenCalled();
  })
})