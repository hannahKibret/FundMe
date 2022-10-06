export default function validateInfo(category) {
    let errors = {};
    
    if (!category) {
      errors.cat = 'Category name is required';
    }
  
    return errors;
  }