import React from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import validator from 'validator';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const ResetPassword = () => {
    const { search } = useLocation();
    console.log(search);
    const { email } = queryString.parse(search);
    const history = useHistory();

    const [showPassword, setShowPassword] = React.useState(false);

    const [confirmPass, setConfirmPass] = React.useState(''); 
    const [password, setPassword] = React.useState('');;

    const [passwordError, setPasswordError] = React.useState('');
    const [confirmPassError, setConfirmPassError] = React.useState('');

    const handlePasswordChange = (event) => {
        validatePassword(event.target.value);
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPass(event.target.value);
    };
    
    const handleClickShowPassword = () => {
        setShowPassword(
          showPassword ? false : true
        );
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validate = () => {
        let passwordError = "";
        let confirmPassError = "";

        if(password !== confirmPass){
            confirmPassError = "Passwords must match"
        }

        if(!password){
            passwordError = "Please enter a password";
        }
        if(!confirmPass){
            confirmPassError = "Please re-enter the password";
        }

        if(passwordError || confirmPassError){
            setPasswordError(passwordError)
            setConfirmPassError(confirmPassError)
            return false;
        }
        return true;
    }

    const validatePassword = (value) => {
  
        if (validator.isStrongPassword(value, {
            minLength: 6, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            setPasswordError('Is a Strong Password')
            return true;
        } else {
            setPasswordError('Is Not a Strong Password. Minimum 6 characters required with lowercase, uppercase, numerical and special characters.')
            return false;
        }
      }

    const reset = () => {
        const isValid = validate();
        if(isValid){
            Axios.put("http://localhost:5000/api/users/reset-password", {
                email: email,
                password: password
            }).then((res) => {
                if(res.data.err){
                    console.log(res.data.err)
                }else{
                    console.log(res)
                    if(res.data.message === 'Password Updated'){
                        toast.success('Password has been Updated');
                        setPassword('');
                        setConfirmPass('');
                        setPasswordError('');
                        setConfirmPassError('');
                        let path = `/login`; 
                        history.push(path);
                    } else{
                        toast.error(res.data.message);
                        setPasswordError(res.data.message);
                    }
                    
                }
            })
        }
    }

    return (
        <div style={{
            backgroundImage: `url("https://static.sliit.lk/wp-content/uploads/2018/03/SLIIT-malabe.jpg")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        }}>
            <Typography variant="h2" sx={{color: "#FFFFFF", fontFamily: '"Helvetica Neue"'}}>
                            SLIIT INTERNSHIPS
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                    m: 1,
                    width: 450,
                    height: 550,
                    marginTop: 2
                    },
                }}
                alignItems="center"
                justifyContent="center"
                >
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4" component="div" sx= {{marginBottom: 5, color: "#FFA400", fontFamily: '"Helvetica Neue"'}}>
                            Reset Password
                        </Typography>
                        <FormControl sx={{ marginTop: 2 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                    required
                                />
                            </FormControl>
                            <div style={{color: "red"}}>{passwordError}</div>

                            <FormControl sx={{ marginTop: 2 }} variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Re-enter Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-re-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPass}
                                    onChange={handleConfirmPasswordChange}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Re-enter Password"
                                    required
                                />
                            </FormControl>
                            <div style={{color: "red"}}>{confirmPassError}</div>
                    </CardContent>
                    <CardActions>
                            <Button 
                                variant="contained" 
                                onClick={reset}
                                fullWidth
                                sx= {{backgroundColor: "#FFA400", fontFamily: '"Helvetica Neue"'}}
                            >
                                Reset
                            </Button>
                    </CardActions>
                </Card>
            </Box>
            
        </div>
    )
}

export default ResetPassword
