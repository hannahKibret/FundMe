import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const useFundraiseForm = (callback, validate,location) => {
  const [values, setValues] = useState({
    title: '',
    image: '',  
    goal: '',
    story: '',
    category:'62995b5ed1d99521acb9f089'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null)
  const [categories,setCategories] = useState([])
  const [category,setCategory] = useState('6281044dbae08d0d1cee4d8a')
  const [imagePath,setImagePath] = useState(null)

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
    
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleChangee = e => {
    setCategory(e.target.value)
    console.log(e.target.value)
    
  };

  const handleFileChange = e => {
    setFile(e.target.files[0])
    setImagePath(URL.createObjectURL(e.target.files[0]))
    
  }


  const handleSubmit = e => {
    e.preventDefault();
    console.log(file)
    console.log(values.category)
  if(file === null){
    setErrors(validate(values,file));
    setIsSubmitting(true);
    const fund = {
      title: values.title,
      story: values.story,
      goalAmount: values.goal,
      image: values.image,
      category: category
      
    }
    axios.post('http://localhost:5000/api/fundraisers',fund,{
      headers: {
          'x-auth-token':location.state.token
      }
  })
  .then().catch(err =>{
      console.log(err.response.data)
  })
  }else{
    const formData = new FormData();
    formData.append("image",file)
    setErrors(validate(values,file));
    setIsSubmitting(true);
    axios.post('http://localhost:5000/api/image',formData,{
          headers: {
            'x-auth-token':location.state.token,
            'Content-Type': 'multi-part/form-data'
          }
        })
        .then(res => {
            console.log(res)
          
            const fund = {
              title: values.title,
              story: values.story,
              goalAmount: values.goal,
              image: res.data.replace(/\\/g,"/"),
              category: category
              
            }
            axios.post('http://localhost:5000/api/fundraisers',fund,{
              headers: {
                  'x-auth-token':location.state.token
              }
          })
          .then(res => {
              console.log(res)
            
              navigate('/fund-acc',{state:{token:location.state.token,firstName:location.state.firstName}})
          }).catch(err =>{
              console.log(err.response.data)
        })
        })

 }
   


   
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange,handleChangee, handleFileChange, handleSubmit, values, errors,categories,imagePath };
};

export default useFundraiseForm;
