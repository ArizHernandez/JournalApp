/*
  {
    notes: [],
    active: {
      id: 'ASK1LKJ4H23',
      title: '',
      imageUrl: '',
      date: 1245124512
    }
  }
*/

import { Types } from "../../types/types";

const initialState = {
  notes: [],
  active: null
}

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes]
      }
    case Types.notesActive:
      return {
        ...state,
        active: action.payload
      }
    case Types.notesLoad:
      return {
        ...state,
        notes: [...action.payload]
      }
    case Types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map( note => (
          note.id === action.payload.id 
            ? action.payload.note
            : note
        ))
      }
    case Types.notesDeleted:
      return {
        ...state,
        active: null,
        notes: state.notes.filter(note => note.id !== action.payload)
      }
    case Types.notesLogoutCleaning:
      return {
        ...state,
        active: null,
        notes: []
      }
    default:
      return state;
  }
}