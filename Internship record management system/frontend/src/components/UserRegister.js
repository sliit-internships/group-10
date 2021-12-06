import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import {Link, useHistory, useLocation } from 'react-router-dom'
import Axios from 'axios';
import validator from 'validator';
import queryString from 'query-string';

const UserRegister = () => {

    const { search } = useLocation();
    const { supervisorEmail } = queryString.parse(search);
    
    // const [hasInternManager, setHasInternManager] = React.useState('');
    // if(hasInternManager){
    //     console.log(hasInternManager);
    // }

    const [usertype, setUsertype] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [showPassword, setShowPassword] = React.useState(false);
    const [confirmPass, setConfirmPass] = React.useState('');

    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [usertypeError, setUsertypeError] = React.useState('');
    const [confirmPassError, setConfirmPassError] = React.useState('');

    const history = useHistory();

    // React.useEffect(() => {
    //     const fetchInternManager = () => {
    //         Axios.get('http://localhost:5000/api/intern-manager/getInternManager')
    //             .then((res) => {
    //                 setHasInternManager(res.data[0]);
    //             })
    //     }
    //     fetchInternManager();
    // }, []);

    React.useEffect(() => {
        const fetchSupervisorDetails = () => {
            if(supervisorEmail){
                setEmail(supervisorEmail);
                setUsertype("supervisor");
            }
        }
        fetchSupervisorDetails();
    }, [supervisorEmail]);

    if(supervisorEmail){
        console.log(email);
        console.log(usertype);
    }

    const handleChange = (event) => {
        setUsertype(event.target.value);
        setUsertypeError('');
    };
    
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
        let emailError = "";
        let passwordError = "";
        let usertypeError = "";
        let emailRegex = /^[it|bm|IT|BM]+[0-9]+@[a-z]+\.[a-z]+\.[a-z]+/;
        let confirmPassError = "";
        let supervisorEmailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        if(usertype === "student"){
            if(!emailRegex.test(email)){
                emailError = "Invalid Email";
            };
            //should be replaced with student email reference table validation
        }
        // else if(usertype === "intern manager"){
        //     if(!email){
        //         emailError = "Please enter your Sliit email";
        //     }
        //     else if(!email.includes("@sliit.lk")){
        //         emailError = "Invalid Email";
        //     }
        // }
        if(usertype === "supervisor"){
            if(!supervisorEmailRegex.test(email)){
                emailError = "Invalid Email";
            };
        }
        
        if(password !== confirmPass){
            confirmPassError = "Passwords must match"
        }

        if(!password){
            passwordError = "Please enter a password";
        }
        if(!email){
            emailError = "Please enter your email";
        }
        if(!usertype){
            usertypeError = "Please select a user type";
        }
        if(!confirmPass){
            confirmPassError = "Please re-enter the password";
        }
        
        if(emailError || passwordError || usertypeError || confirmPassError){
            setEmailError(emailError);
            setPasswordError(passwordError)
            setUsertypeError(usertypeError)
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

    const register = () => {
        const isValid = validate();
        //const isValidPassword = validatePassword(password);
        if(isValid){
            Axios.post("http://localhost:5000/api/users/register", {
                usertype: usertype,
                email: email,
                password: password
            }).then((res) => {
                console.log(res);
                // setEmailError('')
                // setPasswordError('')
                // setUsertypeError('')
                if(res.data.message === "Email already in use"){
                    setEmailError("Email already in use")
                } else {
                    if(usertype === "student"){
                        let path = `/studentregistration`; 
                        history.push(path, {email});
                    }
                    else if(usertype === "supervisor"){
                        let path = `/supervisorRegistration`; 
                        history.push(path);
                    }
                    setUsertype('')
                    setPassword('')
                    setEmail('')
                    setConfirmPass('')
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
                    height: 569,
                    // marginTop: 10
                    marginTop: 2
                    },
                }}
                alignItems="center"
                justifyContent="center"
                >
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4" component="div" sx= {{marginBottom: 5, color: "#FFA400", fontFamily: '"Helvetica Neue"'}}>
                            User Registration
                        </Typography>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={usertype}
                                        label="User Type"
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem value="student">Student</MenuItem> 
                                        <MenuItem value="supervisor">Supervisor</MenuItem>               
                                        {/* {hasInternManager ? <div></div> :<MenuItem value="intern manager">Intern Manager</MenuItem>} */}
                                    </Select>
                            </FormControl>   
                            <div style={{color: "red"}}>{usertypeError}</div>
                            
                            <div style={{ marginTop: 15 }}>
                            {usertype === "student" && <Typography sx={{ fontSize: 14, marginBottom: 1 }} color="text.secondary">
                                e.g it17051456@my.sliit.lk 
                            </Typography>}
                            <TextField id="email" type="email" label="Email" variant="outlined" fullWidth 
                                    // sx={{ marginTop: 2 }}
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
                            <div style={{color: "red"}}>{passwordError}</div>
                            {/* <div style={{color: "red"}}>{passwordErrorEmpty}</div> */}

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
                                onClick={register}
                                fullWidth
                                sx= {{backgroundColor: "#FFA400", fontFamily: '"Helvetica Neue"'}}
                                //disabled={!usertype || !email || !password }
                            >
                                Register
                            </Button>
                    </CardActions>
                    <Link to= '/login'>
                        <Typography variant="body2">
                                Already have an account? Sign-In
                        </Typography>
                    </Link>
                </Card>
            </Box>
        </div>
    )
}

export default UserRegister
