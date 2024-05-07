import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import { prefixes } from '../utils/constants/Prefixes';
import { languages } from '../utils/constants/Languages';
import './RegisterPage.css'


const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: unknown) => console.log(data);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  console.log(errors);
  return (
    <div className='register-container'>
      <div className='form-register'>
      <Box  component="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className='register-label'>Register</h2>

        <div className='register-fields'>
        <div>
          <TextField 
            {...register("FirstName")}
            sx={{ 
              m: 1, 
              width: '80%', // set width to 80%
              height: '70px', 
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
              },
              '& .MuiFormLabel-root.Mui-focused': { 
                color: '#7c7878', 
              },

            }}
            required
            id="outlined-required"
            label="First Name"
          
          />
          
        </div>
        <div>
          <TextField 
            {...register("LastName")}
            sx={{ 
              m: 1, 
              width: '80%', // set width to 80%
              height: '70px', 
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
              },
              '& .MuiFormLabel-root.Mui-focused': { 
                color: '#7c7878', 
              },
             }}
            required
            id="outlined-required"
            label="Last Name"
          
          />
          
        </div>
        <div>
          <TextField 
            {...register("Email")}
            sx={{ 
              m: 1, 
              width: '80%', // set width to 80%
              height: '70px', 
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
              },
              '& .MuiFormLabel-root.Mui-focused': { 
                color: '#7c7878', 
              },
             }}
            required
            id="outlined-required"
            label="Email"
          
          />
          
        </div>
        <div>
          <TextField 
            {...register("Username")}
            sx={{ 
              m: 1, 
              width: '80%', // set width to 80%
              height: '70px', 
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
              },
              '& .MuiFormLabel-root.Mui-focused': { 
                color: '#7c7878', 
              },
             }}
            required
            id="outlined-required"
            label="Username"
          
          />
          
        </div>

          <TextField 
            {...register("Prefix")}
            sx={{ m: 1, width: '26ch',
            '& .MuiOutlinedInput-root': {
              borderRadius: '24px',
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #ccc'
                },
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #ccc'
                },
              },
            },
            '& .MuiFormLabel-root.Mui-focused': { 
              color: '#7c7878', 
            },
             }}
            required
            id="outlined-select-prefix"
            select
            label="Prefix"
            
          >
            {prefixes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField 
            {...register("PhoneNumber")}
            className='textField' 
            sx={{ m: 1, width: '26ch',
            '& .MuiOutlinedInput-root': {
              borderRadius: '24px',
              '&:hover': {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #ccc'
                },
              },
              '&.Mui-focused': {
                '& .MuiOutlinedInput-notchedOutline': {
                  border: '1px solid #ccc'
                },
              },
            },
            '& .MuiFormLabel-root.Mui-focused': { 
              color: '#7c7878', 
            },
            
             }}
            required
            id="outlined-number"
            label="Phone Number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormControl
          {...register("Password")}
            required
            variant="outlined" 
            sx={{ 
              m: 1, 
              width: '80%',
              height: '70px', 
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
              },
              '& .MuiFormLabel-root.Mui-focused': { 
                color: '#7c7878', 
              },
             }}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Password"
            />
          </FormControl>
          
          <div>
          <TextField 
            {...register("Language")}
            sx={{ 
              m: 1, 
              width: '80%', // set width to 80%
              height: '70px', 
              '& .MuiOutlinedInput-root': {
                borderRadius: '24px',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid #ccc'
                  },
                },
              },
              '& .MuiFormLabel-root.Mui-focused': { 
                color: '#7c7878', 
              },
             }}
            required
            id="outlined-select-prefix"
            select
            label="Language"
            
          >
          {languages.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
            </TextField>
          </div>
          
          <div className="already-have-account-component">
              <a href='#' className='already-have-account-btn'>Already have an account?</a>
              <input type="submit" />

          </div>
        </div>
      
        </Box>
      </div>
   
    </div>
  )
}

export default RegisterPage