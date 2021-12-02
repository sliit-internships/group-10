import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import {Link, useHistory } from 'react-router-dom'
import Axios from 'axios';

const UserLogin = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = React.useState('');

    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    const history = useHistory();

    const handlePasswordChange = (event) => {
        //validatePassword(event.target.value);
        setPassword(event.target.value);
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
        let emailError = "";
        let passwordError = "";

        if(!password){
            passwordError = "Please enter your password";
        }
        if(!email){
            emailError = "Please enter your email";
        }
        if(emailError || passwordError){
            setEmailError(emailError);
            setPasswordError(passwordError)
            return false;
        }
        return true;
    }

    const login = () => {
        const isValid = validate();
        if(isValid){
            Axios.post("http://localhost:5000/api/users/login", {
            email: email,
            password: password
            }).then((res) => {
                if(res.data.message){
                    setError(res.data.message);
                }else{
                    //console.log(res)
                    if(res.data[0].usertype === "student"){
                        let path = `/studentdetails`; 
                        history.push(path, {email});
                    } 
                    else if(res.data[0].usertype === "intern manager"){
                        let path = `/internManager-dashboard`; 
                        history.push(path);
                    }
                    else if(res.data[0].usertype === "supervisor"){
                        let path = `/supervisorRegistration`; 
                        history.push(path);
                    }
                    setPassword('')
                    setEmail('')
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
                            User Login
                        </Typography>
                            <div style={{ marginTop: 15 }}>
                            <TextField id="email" type="email" label="Email" variant="outlined" fullWidth 
                                sx={{ marginTop: 2 }}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError('');
                                }}
                                required
                            />
                            </div>
                            <div style={{color: "red"}}>{emailError}</div>

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
                            {!password ?<div style={{color: "red"}}>{passwordError}</div>:
                            <div style={{color: "red"}}>{error}</div>}
                            <Link to= '/forgot-password'>
                                <Typography  sx={{ marginTop: 1 }} variant="body2">
                                        Forgot your password?
                                </Typography>
                            </Link>
                    </CardContent>
                    <CardActions>
                            <Button 
                                variant="contained" 
                                onClick={login}
                                fullWidth
                                sx= {{backgroundColor: "#FFA400", fontFamily: '"Helvetica Neue"'}}
                                //disabled={!usertype || !email || !password }
                            >
                                Login
                            </Button>
                    </CardActions>
                    <Link to= '/'>
                        <Typography variant="body2">
                                New to SLIIT Internships? Regsiter
                        </Typography>
                    </Link>
                </Card>
            </Box>
        </div>
    )
}

export default UserLogin
