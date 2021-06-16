import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEtries = () => {
  const {notes} = useSelector(state => state.notes)

  return (
    <div className="journal__entries">
      {
        notes.map( (note, index) => (
          <JournalEntry 
            key={note.id}
            {...note}
            i={index}
          />
        ))
      }
    </div>
  )
}
