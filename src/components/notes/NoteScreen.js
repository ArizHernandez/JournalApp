import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notes';

import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  const dispatch = useDispatch();
  const {active: note} = useSelector(state => state.notes);
  const [formValue, handleInputChange, reset] = useForm(note);
  const {title, body} = formValue;

  const activeId = useRef(note.id);

  useEffect(() => {
    if(note.id !== activeId.current){
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValue.id, {...formValue}));
  }, [formValue, dispatch])

  return (
    <div className="notes__main-content animate__animated animate__fadeIn">
      
      <NotesAppBar {...formValue}/> 
      
      <div className="notes__content">
        <input
          type="text"
          placeholder="Write a new title"
          className="notes__title-input mb-2 animate__animated animate__fadeIn animate__fast"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happend today?"
          className="notes__text-area mb-2"
          name="body"
          value={body}
          onChange={handleInputChange}
        />

        {
          (note.imageUrl)
          && (
            <div className="notes__image">
              <img 
                src={note.imageUrl}
                alt="journal-canguro"
              />
            </div>
          )
        }

      </div>

    </div>
  )
}
