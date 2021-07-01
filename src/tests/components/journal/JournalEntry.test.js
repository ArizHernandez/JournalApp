import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};

const store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Pruebas en el <JournalEntry />', () => {
  const wrapper = mount(
    <Provider store={store}>
      <JournalEntry
        id="1"
        body="test body"
        title="test title"
        date={123456}
        imageUrl="google.com"
        i={1}
      />
    </Provider>
  )

  test('Debe de cargar correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
  test('Debe de disparar el activeNote', () => {
    wrapper.find('.journal__entry').prop('onClick')();

    expect(activeNote).toHaveBeenCalled();
    expect(activeNote).toHaveBeenCalledWith("1",{
      body: "test body", 
      date: 123456, 
      imageUrl: "google.com", 
      title: "test title"
    });
  })
})