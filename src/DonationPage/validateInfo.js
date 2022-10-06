export default function validateInfo(values) {
  let errors = {};
  
  if (values.amount === undefined) {
    errors.donation = 'Amount of donation required';
  } else if (values.amount < 50) {
    errors.donation = 'Amount of donation must be greater than 50 birr';
  }

  return errors;
}
