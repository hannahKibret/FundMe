import { useState, useEffect } from 'react';
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios';

const useFundraiseForm = (callback, validate,location) => {
  const [values, setValues] = useState({
    title: location.state.title,
    image: location.state.image,  
    goal: location.state.goal,
    story: location.state.story,
    category:location.state.category
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null)
  const [categories,setCategories] = useState([])
  const [category,setCategory] = useState(location.state.category)
  const [imagePath,setImagePath] = useState(null)
  const [count,setCount] = useState(0)

  const navigate = useNavigate()
 
  console.log(location)


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

  // useEffect(() => {
  //   if(count === 0){
  //     fetchFund()
  //     setCount(1)
  //   }
  // },[values,category])

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
    console.log(file)
    
  }


  const handleSubmit = e => {
    e.preventDefault();
    if(file === null){
      setErrors(validate(values));
      setIsSubmitting(true);
      const fund = {
        title: values.title,
        story: values.story,
        goalAmount: values.goal,
        image: values.image,
        category: category
        
      }
      axios.put('http://localhost:5000/api/fundraisers/'+location.state.id,fund,{
        headers: {
            'x-auth-token':location.state.token
        }
    })
    .then(res => {
        console.log(res)
      
        navigate('/view-detr',{state:{token:location.state.token,firstName:location.state.firstName,id: location.state.id}})
    }).catch(err =>{
        console.log(err.response.data)
  })
    }else{
      console.log(file)
      console.log(values.category)
      const formData = new FormData();
  
      formData.append("image",file)
      setErrors(validate(values));
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
              axios.put('http://localhost:5000/api/fundraisers/'+location.state.id,fund,{
                headers: {
                    'x-auth-token':location.state.token
                }
            })
            .then(res => {
                console.log(res)
              
                navigate('/view-detr',{state:{token:location.state.token,firstName:location.state.firstName,id:location.state.id}})
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

  return { handleChange,handleChangee, handleFileChange, handleSubmit, values, errors,categories ,imagePath,category};
};

export default useFundraiseForm;
