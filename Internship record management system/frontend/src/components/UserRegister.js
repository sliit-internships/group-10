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

import {Link, useHistory } from 'react-router-dom'
import Axios from 'axios';

const UserRegister = () => {

    const [usertype, setUsertype] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const history = useHistory();

    const handleChange = (event) => {
        setUsertype(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
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

    const register = () => {
        Axios.post("http://localhost:5000/api/users/register", {
          usertype: usertype,
          email: email,
          password: password
        }).then((res) => {
          console.log(res);
          setUsertype('')
          setPassword('')
          setEmail('')
          let path = `/studentregistration`; 
          history.push(path);
        })
    }

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                    m: 1,
                    width: 450,
                    height: 550,
                    marginTop: 10
                    },
                }}
                alignItems="center"
                justifyContent="center"
                >
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4" component="div" sx= {{marginBottom: 5}}>
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
                                >
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="supervisor">Supervisor</MenuItem>
                                    <MenuItem value="intern manager">Intern Manager</MenuItem>
                                </Select>
                            </FormControl>   
                            
                            <TextField id="email" type="email" label="Email" variant="outlined" fullWidth 
                                sx={{ marginTop: 2 }}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />

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
                                />
                            </FormControl>
                    </CardContent>
                    <CardActions>
                            <Button 
                                variant="contained" 
                                onClick={register}
                                fullWidth
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
