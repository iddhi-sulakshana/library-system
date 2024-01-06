// validation.js
const validateEdit = (userData) => {
    const errors = {};
  
    if (!userData.name) {
      errors.name = 'Username is required';
    }
  
    if (!userData.email) {
      errors.email = 'Email is required';
    }
  
    if (!userData.password) {
      errors.password = 'Password is required';
    } else if (userData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
  
    if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  
    return errors;
  };
  
  export default validateEdit;
  