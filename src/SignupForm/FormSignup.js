import React from 'react';
import {Link} from 'react-router-dom'
import validate from './validateInfo';
import useSignupForm from './useSignupForm';
import "./style/StFormSignup.css";


const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useSignupForm(
    submitForm,
    validate
  );


  return (

    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>First name</label>
          <input
            data-cy = 'sign-first'
            className='form-input'
            type='text'
            name='firstname'
            placeholder='Enter your first name'
            value={values.firstname}
            onChange={handleChange}
          />
          <hr/>
          {errors.firstname && <p data-cy='fir-err'>{errors.firstname}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Last name</label>
          <input
            data-cy = 'sign-last'
            className='form-input'
            type='text'
            name='lastname'
            placeholder='Enter your last name'
            value={values.lastname}
            onChange={handleChange}
          />
          <hr/>
          {errors.lastname && <p data-cy='las-err'>{errors.lastname}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Phone number</label>
          <input
            data-cy = 'sign-ph'
            className='form-input'
            type='text'
            name='phone'
            placeholder='Enter your phone number'
            value={values.phone}
            onChange={handleChange}
          />
          <hr/>
          {errors.phone && <p data-cy='ph-err'>{errors.phone}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            data-cy='sign-em'
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          <hr/>
          {errors.email && <p data-cy='em-err'>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            data-cy='sign-pass'
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          <hr/>
          {errors.password && <p data-cy='pass-err'>{errors.password}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            data-cy = 'sign-re'
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          <hr/>
          {errors.password2 && <p data-cy='re-err'>{errors.password2}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span  className='form-input-login'>
          Already have an account? Login <Link data-cy = 'log-link' to="/login">here</Link>
        </span>
      </form>
    </div>

  );
};

export default FormSignup;
