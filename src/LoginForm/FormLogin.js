import React from 'react';
import validate from './validateInfo';
import useLoginForm from './useLoginForm';
import './style/StFormLogin.css'

const FormLogin = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useLoginForm(
    submitForm,
    validate
  );

  return (
    
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Login To Your Account!
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Email Address</label>
          <input
            data-cy = 'log-em'
            className='form-input'
            type='text'
            name='email'
            placeholder='Enter your username'
            value={values.email}
            onChange={handleChange}
          />
          <hr/>
          {errors.email && <p data-cy='em-err'>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            data-cy = 'log-pass'
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          <hr/>
          {errors.password && <p data-cy='pass-err'>{errors.password}</p>}
          {errors.error && <p data-cy='inc-err'>{errors.error}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Login
        </button>
      </form>
    </div>
    
  );
};

export default FormLogin;
