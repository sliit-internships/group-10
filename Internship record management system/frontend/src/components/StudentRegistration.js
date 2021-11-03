import React from 'react'
import { useLocation } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const StudentRegistration = () => {

    const location = useLocation();
    const email = location.state.email;

    return (
        <div>
            <Header/>
            <div style={{backgroundColor: "#F4F4F2"}}>
            <Box
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                    m: 1,
                    width: 1200,
                    height: 550,
                    // marginTop: 10
                    marginTop: 4,
                    marginBottom: 4
                    },
                }}
                alignItems="center"
                justifyContent="center"
                >
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4" component="div" sx= {{marginBottom: 5, color: "#293B5F", fontFamily: '"Helvetica Neue"'}}>
                            Student Registration
                        </Typography>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    //value={usertype}
                                    label="User Type"
                                    //onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="supervisor">Supervisor</MenuItem>
                                    <MenuItem value="intern manager">Intern Manager</MenuItem>
                                </Select>
                            </FormControl>   
                            {/* <div style={{color: "red"}}>{usertypeError}</div> */}
                            
                            <div style={{ marginTop: 15 }}>
                            {/* {usertype === "student" && <Typography sx={{ fontSize: 14, marginBottom: 1 }} color="text.secondary">
                                Students are strongly recommended use SLIIT e-mail address e.g it17051456@my.sliit.lk and it will be the primary e-mail address SLIIT industry placement unit will correspond with the student
                            </Typography>} */}
                            <TextField id="email" type="email" label="Email" variant="outlined" fullWidth 
                                // sx={{ marginTop: 2 }}
                                // value={email}
                                // onChange={(e) => {
                                //     setEmail(e.target.value);
                                //     setEmailError('');
                                // }}
                                required
                            />
                            </div>
                            {/* <div style={{color: "red"}}>{emailError}</div> */}
                    </CardContent>
                    <CardActions>
                            <Button 
                                variant="contained" 
                                //onClick={register}
                                //fullWidth
                                sx= {{backgroundColor: "#293B5F", fontFamily: '"Helvetica Neue"', width: 300 }}
                                //disabled={!usertype || !email || !password }
                            >
                                Register
                            </Button>
                    </CardActions>
                </Card>
            </Box>
            </div>
            <Footer/>
        </div>
    )
}

export default StudentRegistration
