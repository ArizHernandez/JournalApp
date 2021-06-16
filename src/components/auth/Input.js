import React, { useState } from 'react'

export const Input = ({required = false, autoComplete ,labelText, placeholder, name, type, value, handleInputChange, expresionRegular, errorMessage}) => {
  const [isValid, setIsValid] = useState("")

  const validate = () => {
    if(expresionRegular){
      if(expresionRegular.test(value)){
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }

  return (
    <div className="mb-2">
      <label className="mb-1">
        <small className={`
          ${(!isValid && isValid !== "") && "auth__input-invalid-text"}
          ${(isValid && isValid !== "") && "auth__input-valid-text"}
        `}
        >
          {labelText}
        </small>
      </label>

      <div className="auth__input-container">
        <input 
          autoComplete={autoComplete}
          required={required}
          name={name}
          type={type} 
          className={`
            ${(!isValid && isValid !== "") && "auth__input-invalid"} 
            ${(isValid && isValid !=="") && "auth__input-valid"}
            auth__input
          `}
          placeholder={placeholder}
          onKeyUp={validate}
          value={value}
          onChange={handleInputChange}
        />

        {
          (!isValid && isValid !== "")
          ? <i className="auth__input-icon auth__input-invalid-text fa fa-times-circle"></i>
          : (isValid && isValid !== "")
          && <i className="auth__input-icon auth__input-valid-text fa fa-check-circle"></i>
        }
      </div>
      {
        (!isValid && isValid !== "")
        && (<p className="auth__error-message">{errorMessage}</p>)
      }
    </div>
  )
}
