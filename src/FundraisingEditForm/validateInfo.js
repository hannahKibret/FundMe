export default function validateInfo(values) {
  let errors = {};
  
  if (!values.title.trim()) {
    errors.title = 'Title required';
  }

  if (!values.goal) {
    errors.goal = 'Goal required';
  }

   if (!values.story.trim()) {
    errors.story = 'Story required';
  }

 

  return errors;
}
