import React from 'react';
import {useNavigate} from 'react-router-dom'
import validate from './validateInfo';
import useFundraiseForm from './useFundraiseForm';
import './style.css';


const FormFundraise = ({ submitForm ,location}) => {
  const { handleChange, handleChangee,handleFileChange,handleSubmit, values, errors,categories,imagePath } = useFundraiseForm(
    submitForm,
    validate,
    location
  );
    const navigate = useNavigate()
  
  return (
    <div className='form-content-right'>
      
      <form onSubmit={handleSubmit} className='form' encType = "multipart/form-data" noValidate>
        <div className='form-inputs'>
          <label className='form-label'>Title</label>
          <input
            data-cy = 'fund-title'
            className='form-input'
            type='text'
            name='title'
            placeholder='Enter the title of your fundraiser'
            value={values.title}
            onChange={handleChange}
          />
          <hr/>
          {errors.title && <p data-cy="title-err">{errors.title}</p>}
        </div>
         {imagePath === null? (
          <p></p>
        ) : (
          <img className="img-fund" src={imagePath}/>
        )}
        <div className='form-inputs'>
          <label className='form-label'>Image</label>
          <input
            className='form-input'
            type='file'
            name='image'
            //value={values.image}
            onChange={handleFileChange}
          />
          <hr/>
          {errors.image && <p data-cy = "image-err">{errors.image}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Goal</label>
          <input
            data-cy = 'fund-goal'
            className='form-input'
            type='text'
            name='goal'
            placeholder='Enter the amount of goal in birr'
            value={values.goal}
            onChange={handleChange}
          />
          <hr/>
          {errors.goal && <p data-cy="goal-err">{errors.goal}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Story</label>
          <textarea data-cy = 'fund-story'rows = '5' cols = '50' name = 'story' value={values.story} placeholder='Write your story here briefly' onChange={handleChange} required></textarea>
          {errors.story && <p data-cy = "story-err">{errors.story}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Category:  </label>
          <select name="category"  className='form-dropdown' onChange={handleChangee}>
            {
               categories
               .map(cat =>
                <option key ={cat._id} value={cat._id}>{cat.name}</option>
                   
                )
            }
            {/* <option value="javascript">Medical</option>
            <option value="php">Educational</option>
            <option value="java">Religious</option>
            <option value="golang">Emergency</option>
            <option value="python">Family</option>
            <option value="python">Community</option> */}
          </select>
          <hr/>
        </div>
        <button className='form-input-btn' type='submit'>
          Post Fundraiser
        </button>
        {/* <button className='form-input-btn' onClick={viewOnClick}>View fundraisers</button> */}
      </form>
    </div>
  );
};

export default FormFundraise;
