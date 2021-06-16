import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, body, date, imageUrl, title, i}) => {
  const dispatch = useDispatch();
  const noteDate = moment(date);

  const handleSelectNote = () => {

    dispatch(activeNote(id, {body, date, imageUrl, title}));
  }

  return (
    <div 
      className={`journal__entry animate__animated animate__fadeInLeft animate__delay-0${(i*10)/2}s`}
      onClick={handleSelectNote}
    >
      
      <div className="journal__entry-body-container">
        {
          (imageUrl !== "")
          && ( 
            <div 
              className="journal__entry-picture"
            >
              <img src={imageUrl} alt={title}/>
            </div>
          ) 
        }

        <div className="journal__entry-body">
          <p className="journal__entry-title">
            {title}
          </p>
          <p className="journal__entry-content">
            {body}
          </p>
        </div>

      </div>

      <div className="journal__entry-date-box">
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('Do')}</h4>
      </div>
    </div>
  )
}
