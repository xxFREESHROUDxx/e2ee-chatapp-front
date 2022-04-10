import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import SignUp from '../../services/api';
import './register.css';

export default function Register() {
  const history = useHistory();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    img: 'user.png',
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      alert('Password and confirm password should be same.');
      return false;
    } else if (username.length < 3) {
      alert('Username should be greater than 3 characters.');
      return false;
    } else if (password.length < 8) {
      alert('Password should be equal or greater than 8 characters.');
      return false;
    } else if (email === '') {
      alert('Email is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      alert('Registration Successful! Please Login');
      window.location.reload();
      // const { email, username, password, role, img } = values;
      // const { data } = await axios.post(SignUp, {
      //   username,
      //   email,
      //   password,
      //   role,
      //   img,
      // });
      // if (data.status === false) {
      //   alert(data.msg);
      // }
      // if (data.status === true) {
      //   localStorage.setItem(
      //     process.env.REACT_APP_LOCALHOST_KEY,
      //     JSON.stringify(data.user)
      //   );
      //   history('/');
      // }
    }
  };

  return (
    <>
      <div className='bg-gray-900'>
        <div className='login container mx-auto w-full max-w-xs items-center pt-12 h-screen'>
          <form
            action=''
            onSubmit={(event) => handleSubmit(event)}
            className='bg-white shadow-md rounded px-8 pt-8 pb-8 m-4'
          >
            <label className='block text-lg font-bold mb-4 py-2 text-center bg-gray-800 rounded text-white'>
              AppBuzz Chat Register
            </label>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Username
              </label>
              <label className='incorrect-user text-red-500'></label>
              <input
                onChange={(e) => handleChange(e)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                name='username'
                type='text'
                placeholder='Enter Username here...'
              />
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Email
              </label>
              <label className='incorrect-user text-red-500'></label>
              <input
                onChange={(e) => handleChange(e)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                name='email'
                type='email'
                placeholder='Enter your email...'
              />
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Password
              </label>
              <label className='incorrect-user text-red-500'></label>
              <input
                onChange={(e) => handleChange(e)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                name='password'
                type='password'
                placeholder='Enter Password here...'
              />
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Confirm Password
              </label>
              <label className='incorrect-user text-red-500'></label>
              <input
                onChange={(e) => handleChange(e)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                name='confirmPassword'
                type='password'
                placeholder='Enter Password here...'
              />
              <label
                for='role'
                className='block text-gray-700 text-sm font-bold mb-2'
              >
                Select Role:
              </label>
              <select name='role' onChange={(e) => handleChange(e)}>
                <option value='teacher'>Teacher</option>
                <option value='student'>Student</option>
              </select>
            </div>
            {/* <Link> */}
            <button
              className='btn-primary rounded-full text-white font-bold py-2 px-4 mx-16 rounded focus:outline-none focus:shadow-outline place-self-center'
              type='submit'
            >
              Register
            </button>
            <span>
              Have an account?{' '}
              <Link className='link' to='/login'>
                Login
              </Link>
            </span>
          </form>
          <p className='text-center text-gray-500 text-xs'>
            &copy;2020. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
