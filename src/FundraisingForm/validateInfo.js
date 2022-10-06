export default function validateInfo(values,file) {
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

  if (!file) {
    errors.image = 'Image required';
  }

  return errors;
}
