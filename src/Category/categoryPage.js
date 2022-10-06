import React,{ useState ,useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios';
import './style.css'
import validateInfo from './validateInfo';
const CategoryPage = () => {
 
const [category,setCategory] = useState('')
const [categories,setCategories] = useState([])
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);

const location = useLocation()
const navigate = useNavigate()

const fetchCategory = () =>{
    axios.get('http://localhost:5000/api/categories',{
        })
        .then(res=> {
            const cats = res.data;
            console.log(cats)
            setCategories(cats)
        })
  }

  useEffect(() => {
    if(categories.length === 0){
      fetchCategory()
    }
    
  },[categories])

  const handleChange = e => {
    setCategory(e.target.value)
    
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(validateInfo(category))
    setIsSubmitting(true)
    const categ = {
        name: category
    }
    axios.post('http://localhost:5000/api/categories',categ,{
        headers: {
            'x-auth-token': location.state.token
        }
    })
    .then(res => {
        console.log(res.data)
        setCategory('')
        fetchCategory()
    }).catch(err => {
        console.log(err.response.data)
    })
 }

  const deleteClicked = (id) =>{
    axios.delete(`http://localhost:5000/api/categories/${id}`,{
        headers: {
            'x-auth-token': location.state.id
        }
    })
    .then(res => {
        console.log(res.data)
        fetchCategory()
    })
  }

//   useEffect(
//     () => {
//       if (Object.keys(errors).length === 0 && isSubmitting) {
//         callback()
//       }
//     },
//     [errors]
//   );

  const xbtnClicked = () => {
    navigate('/admin',{state:{token:location.state.token,firstName: location.state.firstName}})
  }

  return ( 
    <div>
         <button className='xbtn' onClick={xbtnClicked}>x</button>   
        <div className='container'>  
       
            <form className='form' onSubmit={handleSubmit}>
                <h2>You can add categories here</h2>
                <div className='form-inputs'>
                    <label className='form-label'>Name of category</label>
                    <input
                        data-cy='c-name'
                        onChange={handleChange}
                        className='form-input'
                        type='text'
                        name='category'
                        value={category}
                        placeholder='Enter the name of your category'
                    />
                    <hr/>
                    {errors.cat && <p data-cy='cat-err' className='errors'>{errors.cat}</p>}
                </div>
                <button className='form-input-btn' type='submit'>
                    Add Category
                </button>
            </form>
        </div>
        <div className='container-2'>
            <div className='columnn'>
                <h2>Delete Categories</h2>
                {
                        categories
                        .map(cat =>
                            <div data-cy='cat-lst' className='roww' key={cat._id}>
                                <p data-cy='cat-name'>{cat.name}</p>
                                <button data-cy='delete-btn' className='deletee' onClick={()=>deleteClicked(cat._id)}><img  className="img4" src='img/delete.svg' alt='user icon'/></button>
                            </div>   
                            
                            )
                         
                    }
               
            </div> 
        </div>  
    </div>  
    

  );
};

export default CategoryPage;
