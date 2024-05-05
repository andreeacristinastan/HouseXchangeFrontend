import { FieldValues, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Icon } from 'react-icons-kit'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import {user} from 'react-icons-kit/feather/user'
import './LoginForm.css'

const LoginForm = () => {
const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: FieldValues) => console.log(data);
  const [showPassword, setShowPassword] = useState(false);

  console.log(errors);
  
  return (
    <div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
          
          <h2>Sign In</h2>
          
          <div className='username-component'>
            <div className='user-icon'><Icon icon={user} size={20}/></div>
            <input className="form-input" type="username" placeholder="Username" {...register("Username", {required: true, pattern: /^\S+@\S+$/i})} />
            
          </div>
          
          
          <div className="password-component">
            <button type="button" onClick={() => {
              setShowPassword(!showPassword);
              console.log(showPassword);
            }}>
              {showPassword ? <Icon icon={eye} size={20} /> : <Icon icon={eyeOff} size={20} />} 
            </button>

            <input className="form-input" type={showPassword ? "text" : "password"} placeholder="Password" {...register("Password", {required: true, min: 8})} />
          </div>
          
          <div className="keep-logged-in">
            <div typeof="forgot-password-link">
              <a href='#' className='forgot-password-link'>Forgot Password</a>
            </div>

            <div className='logged-in'> 
              <label className='keep-logged-in-label'>Keep me logged in</label>
              <input type="checkbox" placeholder="Keep me logged in" {...register("Keep me logged in", {})} />
            </div>
          </div>

          <div className='login-component'> 
            <div typeof="create-an-account-component">
              <a href='#' className='create-account-btn'>Create an account</a>
            </div>
            <input type="submit" value = "Login" className='login-btn' />
          </div>
          
        </form>

      </div>
  )
}

export default LoginForm