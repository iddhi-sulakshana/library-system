import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import validateForm from '../FormValidation';
import axios from 'axios';
import'../Form.css';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData, 'signup');
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios.post('http://localhost:3001/api/register', {name: formData.name, email: formData.email, password: formData.password})
      // Form is valid, proceed with submission
      .then (result => {console.log('Form submitted:', result)
    
      navigate('/login');
    })
      .catch (err => console.log('Error', err.message));
    } else {
      // Form is invalid, handle errors or show an alert
      console.log('Form validation failed');
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit} action ='/' method='POST'>
        <h1>Sign up</h1>
        <div className='input-box'>
          <input
            type='text'
            placeholder='Name'
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <FaUser className='icon' />
          {errors.name && <p className='error-message'>{errors.name}</p>}
        </div>
        <div className='input-box'>
          <input
            type='text'
            placeholder='Email'
            required
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <MdEmail className='icon' />
          {errors.email && <p className='error-message'>{errors.email}</p>}
        </div>
        <div className='input-box'>
          <input
            type='password'
            placeholder='Password'
            required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <FaLock className='icon' />
          {errors.password && <p className='error-message'>{errors.password}</p>}
        </div>
        <div className='input-box'>
          <input
            type='password'
            placeholder='Confirm Password'
            required
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <FaLock className='icon' />
          {errors.confirmPassword && (
            <p className='error-message'>{errors.confirmPassword}</p>
          )}
        </div>
        <button type='submit'>Sign up</button>

        <div className='register-link'>
          <p>
            Already have an account ? <a href='/login'>Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
