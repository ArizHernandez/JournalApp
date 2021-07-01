import NotesInfo from '../../fixures/notesExamples';
import { notesReducer } from '../../../components/reducers/notesReducer';
import { Types } from '../../../types/types';

describe('Pruebas en el notesReducer', () => {
  const initialState = {
    notes: [],
    active: null
  }

  test('Debe de agregar una nueva nota', () => {
    const reducer = notesReducer(initialState, {
      type: Types.notesAddNew,
      payload: {
        title:    '',
        body:     '',
        date:     new Date().getTime(),
        imageUrl: ''
      }
    });

    expect(reducer).toEqual({
      active: null,
      notes: [
        {
          title:    '', 
          body:     '', 
          date:     expect.any(Number), 
          imageUrl: ''}
      ]
    });
  })

  test('Debe de colocar la nota como activa', () => {
    const reducer = notesReducer(initialState, {
      type: Types.notesActive,
      payload: {
        title:    'Test note',
        body:     'test description',
        date:     new Date().getTime(),
        imageUrl: 'https://google.com'
      }
    });

    expect(reducer).toEqual({
      notes: [],
      active: {
        title:    'Test note',
        body:     'test description',
        date:     expect.any(Number),
        imageUrl: 'https://google.com'
      }
    })
  })
  
  test('Debe de cargar las notas del usuario', () => {
    const reducer = notesReducer(initialState, {
      type: Types.notesLoad,
      payload: NotesInfo
    });

    expect(reducer.notes.length).toBe(4);
  })
  
  test('Debe de actualizar una nota', () => {
    const reducer = notesReducer({active: null, notes: NotesInfo},{ 
      type: Types.notesUpdated,
      payload: {
        id: 1,
        note: {
          id:       1,
          title:    'Test note changed',
          body:     'test description changed',
          date:     new Date().getTime(),
          imageUrl: 'https://twitter.com'
        }
      }
    });

    expect(reducer.notes[0]).toEqual({
      id:       1,
      title:    'Test note changed',
      body:     'test description changed',
      date:     expect.any(Number),
      imageUrl: 'https://twitter.com'
    });
  })

  test('Debe de eliminar una nota', () => {
    const reducer = notesReducer({notes: NotesInfo, active: null}, {
      type: Types.notesDeleted,
      payload: 1
    });

    expect(reducer.notes.length).toBe(3);
  })

  test('Debe de limpiar todas las notas', () => {
    const reducer = notesReducer({notes: NotesInfo, active: null}, {
      type: Types.notesLogoutCleaning
    });

    expect(reducer).toEqual({notes: [], active: null})
  })
})
