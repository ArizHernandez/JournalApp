import moment from 'moment';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteNote, startSaveNote, startUploadFile } from '../../actions/notes';

export const NotesAppBar = ({date, id}) => {
  const dispatch = useDispatch();
  const {active} = useSelector(state => state.notes)
  const newDate = moment(date).format("D [de] MMMM [de] YYYY");

  const handleSave = () => {
    dispatch(startSaveNote(active))
  }

  const handleUploadPicture = () => {
    document.querySelector('#fileSelector').click();
  }
  
  const handleFireChange = (e) => {
    const file = e.target.files[0];
    
    if(file){
      dispatch(startUploadFile(file));
      document.querySelector('#fileSelector').value = "";
    }
  }

  const handleDelete = () => {
    dispatch(startDeleteNote(id));
  }

  return (
    <div className="notes__appbar">
      <span>{newDate}</span>

      <input  
        id="fileSelector"
        type="file"
        style={{display:"none"}}
        onChange={handleFireChange}
      />

      <div>
        <button 
          className="btn animate__animated animate__fadeInDown"
          onClick={handleUploadPicture}
        >
          Picture
        </button>

        <button 
          className="btn animate__animated animate__fadeInDown animate__delay-010s"
          onClick={handleSave}  
        >
          save
        </button>

        <button
          className="btn btn-danger animate__animated animate__fadeInDown animate__delay-020s"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      
    </div>
  )
}
