import Swal from 'sweetalert2';

import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { Types } from '../types/types';

export const startNewNote = () => {
  return async(dispatch, getState) => {
    const {uid} = getState().auth
    const newNote = {
      title: '',
      body:  '',
      date:  new Date().getTime(),
      imageUrl: ''
    }

    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(activeNote(docRef.id, newNote));
    dispatch(addNewNote(docRef.id, newNote));
  }
};

export const startLoadingNotes = (uid) => {
  return async(dispatch) => {
    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  }
}

export const startSaveNote = (note) => {
  return async(dispatch, getState) => {
    const {uid} = getState().auth;
    const noteToFirestore = {...note};
    
    noteToFirestore.date = new Date().getTime();
    delete noteToFirestore.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
            .then( () => Swal.fire('Updated', 'Your note has been updated!!', 'success'))
            .catch( (err) => Swal.fire('Upss...', err.message, 'error '));

    dispatch(refreshNote(note.id, note));
  }
}

export const startUploadFile = (file) => {
  return async(dispatch, getState) => {
    const {active: activeNote} = getState().notes;

    Swal.fire({
      title: 'Uploading',
      text: 'Please, wait a minute...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    })

    const fileUrl = await fileUpload(file);

    activeNote.imageUrl = fileUrl;
    activeNote.date = new Date().getTime();
    dispatch(startSaveNote(activeNote));
    Swal.close();
  }
}

export const startDeleteNote = (id) => {
  return async(dispatch, getState) => {
    const {uid} = getState().auth;
    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch(noteDelete(id));
  }
}

export const addNewNote = (id, note) => ({
  type: Types.notesAddNew,
  payload: {
    id,
    ...note
  }
})

export const activeNote = (id, note) => ({
  type: Types.notesActive,
  payload: {
    id,
    ...note
  }
});

export const setNotes = (notes) => ({
  type: Types.notesLoad,
  payload: notes
});

export const refreshNote = (id, note) => ({
  type: Types.notesUpdated,
  payload: {
    id,
    note
  }
})

export const noteDelete = (id) => ({
  type: Types.notesDeleted,
  payload: id
})

export const notesLogout = () => ({
  type: Types.notesLogoutCleaning
});