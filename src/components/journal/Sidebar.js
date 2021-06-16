import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

import { JournalEtries } from './JournalEtries'

export const Sidebar = () => {
  const [actived, setActived] = useState(false);

  const dispatch = useDispatch();
  const {name} = useSelector(state => state.auth);

  
  const handleLogout = () => {
    dispatch(startLogout());
  }
  
  const handleAddNew = () => {
    dispatch(startNewNote());
  }

  return (
    <div className={`${actived && 'journal__sidebar-active'} journal__sidebar`}>
      <div 
        className="journal__menu-content"
        onClick={() => setActived(!actived)}
      >
        <div className={`${actived && 'journal__menu-item-closed'} journal__menu-item`}></div>
        <div className={`${actived && 'journal__menu-item-closed'} journal__menu-item`}></div>
      </div>
      
      <div className="journal__sidebar-navbar">
        <h3>
          <i className="fa fa-moon"></i>
          <span> {name}</span>
        </h3>

        <button 
          className={`btn journal__logout ${actived && "journal__logout-active"}`}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div 
        className="journal__new-entry"
        onClick={handleAddNew}
      >
        <i className="fa fa-calendar-plus fa-5x"></i>
        <p className="mt-2">New entry</p>
      </div>

      <JournalEtries />
    </div>
  )
}
