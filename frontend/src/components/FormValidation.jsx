const validateForm = (formData, type) => {
    const errors = {};
  
    // Common validation logic
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (type === 'signup' && formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
  
    if (type === 'signup') {
      if (!formData.name.trim()) {
        errors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
  
    return errors;
  };
  
  export default validateForm;
  