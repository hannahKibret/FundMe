import React from 'react';
import validate from './validateInfo';
import useEditForm from './useEditForm';
import './style.css';
//import { StFormEdit } from "./style";
//import Link from 'next/link'

const FormEdit = ({ submitForm,location }) => {

  const { handleChange, handleSubmit, handleDeactivate,values, errors } = useEditForm(
    submitForm,
    validate,
    location
  );

  

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Edit Your Account
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>First name</label>
          <input
            data-cy="ed-first"
            className='form-input'
            type='text'
            name='firstname'
            placeholder='Enter your name'
            value={values.firstname}
            onChange={handleChange}
          />
          <hr/>
          {errors.firstname && <p data-cy="first-err">{errors.firstname}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Last name</label>
          <input
            data-cy = "ed-last"
            className='form-input'
            type='text'
            name='lastname'
            placeholder='Enter your father name'
            value={values.lastname}
            onChange={handleChange}
          />
          <hr/>
          {errors.lastname && <p data-cy="las-err">{errors.lastname}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Phone number</label>
          <input
            data-cy="ed-ph"
            className='form-input'
            type='text'
            name='phone'
            placeholder='Enter your number'
            value={values.phone}
            onChange={handleChange}
          />
          <hr/>
          {errors.phone && <p data-cy="ph-err">{errors.phone}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            data-cy="ed-em"
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          <hr/>
          {errors.email && <p data-cy="err-em">{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            data-cy="ed-pass"
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          <hr/>
          {errors.password && <p data-cy="err-pass">{errors.password}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            data-cy="ed-repass"
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          <hr/>
          {errors.password2 && <p data-cy="err-repass">{errors.password2}</p>}
        </div>
        <div>  
          <button className='form-input-btnn' type='submit'>
            Edit
          </button>
        </div>
        <div>
          <button data-cy='deac-btn' className='form-input-btn2' onClick={handleDeactivate}>
            Deactivate Account
          </button>
        </div>
      
      </form>
    </div>
  );
};

export default FormEdit;
