/**
 * @jest-environment node
*/
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNote, addNewNote, noteDelete, notesLogout, refreshNote, setNotes, startDeleteNote, startLoadingNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { Types } from '../../types/types';
import notesExamples from '../fixures/notesExamples';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: 'TEST12',
    name: 'Test User'
  }
};

let store = mockStore(initState);

describe('Pruebas en las acciones de notes', () => {
  beforeEach(() => {
    store = mockStore(initState);
  })

  test('Debe de crear una nueva nota', async() => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: Types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
        imageUrl: ''
      }
    });

    expect(actions[1]).toEqual({
      type: Types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
        imageUrl: ''
      }
    });
    
    const docId = actions[0].payload.id;
    await db.doc(`/TEST12/journal/notes/${docId}`).delete();
  })
  
  test('Debe de cargar las notas', async() => {
    await store.dispatch(startLoadingNotes('TEST12'));
    const actions = store.getActions();
    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
      imageUrl: expect.any(String)
    }

    expect(actions[0]).toEqual({
      type: Types.notesLoad,
      payload: expect.any(Array)
    });
    
    expect(actions[0].payload[0]).toMatchObject(expected);
  })

  test('Debe de guardar una nueva nota', async() => {
    const note = {
      id: 'yq0Y16Gc1WIBFhEte7TA',
      title: 'Test, message',
      body: 'Test body',
    };

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();

    const docRef = await db.doc(`/TEST12/journal/notes/${note.id}`).get()

    expect(docRef.data().title).toBe(note.title);
    expect(actions[0]).toEqual({
      type: Types.notesUpdated,
      payload: {
        id: expect.any(String),
        note: {
          id:    expect.any(String),
          title: expect.any(String),
          body:  expect.any(String),
        }
      }
    });
  })

  test('Debe de borrar una nota', async() => {
    const noteId = 'wNaMeLON1KTFu4QYBrZG';
    await store.dispatch(startDeleteNote(noteId));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: Types.notesDeleted,
      payload: noteId
    });
  })

  test('Debe de correr las acciones correctamente', () => {
    const note = {
      id:       'wNaMeLON1KTFu4QYBrZG',
      title:    'Test Title',
      body:     'Test Body',
      imageUrl: '',
      date:     new Date().getTime()
    };
    
    const addNewNoteAction = addNewNote('wNaMeLON1KTFu4QYBrZG', {
      title:    '',
      body:     '',
      imageUrl: '',
      date:     new Date().getTime()
    });
    expect(addNewNoteAction).toEqual({
      type: Types.notesAddNew,
      payload: {
        id:       expect.any(String),
        title:    '',
        body:     '',
        imageUrl: '',
        date:     expect.any(Number)
      }
    });

    const activeNoteAction = activeNote('wNaMeLON1KTFu4QYBrZG', note);
    expect(activeNoteAction).toEqual({
      type: Types.notesActive,
      payload: note
    });

    const setNotesAction = setNotes(notesExamples);
    expect(setNotesAction).toEqual({
      type: Types.notesLoad,
      payload: notesExamples
    });

    const refreshNoteAction = refreshNote(note.id, {
      id:       'wNaMeLON1KTFu4QYBrZG',
      title:    'Test Title edited',
      body:     'Test Body edited',
      imageUrl: '',
      date:     new Date().getTime()
    });
    expect(refreshNoteAction).toEqual({
      type: Types.notesUpdated,
      payload: {
        id: 'wNaMeLON1KTFu4QYBrZG',
        note: {
          id:       'wNaMeLON1KTFu4QYBrZG',
          title:    'Test Title edited',
          body:     'Test Body edited',
          imageUrl: '',
          date:     expect.any(Number)
        }
      }
    });

    const noteDeleteAction = noteDelete(note.id);
    expect(noteDeleteAction).toEqual({
      type: Types.notesDeleted,
      payload: note.id
    });

    const notesLogoutAction = notesLogout();
    expect(notesLogoutAction).toEqual({type: Types.notesLogoutCleaning});
  })  
})