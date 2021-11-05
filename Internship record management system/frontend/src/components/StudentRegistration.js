import React from 'react'
import { useLocation } from "react-router-dom";
import Axios from 'axios';
import dateFormat from 'dateformat';

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
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import '../App.css'; 
import { blue } from '@mui/material/colors';

const StudentRegistration = () => {

    const location = useLocation();
    const email = location.state.email;

    const [studentIdNumber, setStudentIdNumber] = React.useState('');
    const [currentYear, setCurrentYear] = React.useState('');
    const [Year2CompletionYear, setYear2CompletionYear] = React.useState('');
    const [Year2CompletionPeriod, setYear2CompletionPeriod] = React.useState('');
    const [sepcialization, setSepcialization] = React.useState('');
    const [name, setName] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [homePhone, setHomePhone] = React.useState('');
    const [studentEmail, setStudentEmail] = React.useState(email);
    const [internshipStartDate, setInternshipStartDate] = React.useState(null);
    const [supervisorEmail, setSupervisorEmail] = React.useState('');

    const [studentIdNumberError, setStudentIdNumberError] = React.useState('');
    const [currentYearError, setCurrentYearError] = React.useState('');
    const [Year2CompletionYearError, setYear2CompletionYearError] = React.useState('');
    const [Year2CompletionPeriodError, setYear2CompletionPeriodError] = React.useState('');
    const [sepcializationError, setSepcializationError] = React.useState('');
    const [nameError, setNameError] = React.useState('');
    const [mobileError, setMobileError] = React.useState('');
    const [homePhoneError, setHomePhoneError] = React.useState('');
    const [internshipStartDateError, setInternshipStartDateError] = React.useState('');
    const [supervisorEmailError, setSupervisorEmailError] = React.useState('');

    const handleDateChange = (newValue) => {
        setInternshipStartDate(newValue);
    };

    const convertPhone = (value) => {
        if(value){
          return value.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
        }  
    }

    const validate = () => {
        let studentIdNumberError = "";
        let studentIdNumberRegex = /^[IT|BM]+[0-9]{8}$/;
        // let passwordError = "";
        // let usertypeError = "";
        // let emailRegex = /^[it|bm]+[0-9]+@[a-z]+\.[a-z]+\.[a-z]+/;

        if(!studentIdNumberRegex.test(studentIdNumber)){
            studentIdNumberError = "Invalid Student Id Number";
        };
        // if(!emailRegex.test(email)){
        //     emailError = "Invalid Email";
        // };

        if(!studentIdNumber){
            studentIdNumberError = "Please enter the Student Id Number";
        }
        // if(!email){
        //     emailError = "Please enter your email";
        // }
        // if(!usertype){
        //     usertypeError = "Please select a user type";
        // }
        
        if(studentIdNumberError){
            setStudentIdNumberError(studentIdNumberError);
            // setPasswordError(passwordError)
            // setUsertypeError(usertypeError)
            return false;
        }

        return true;
    }

    const registerStudent = () => {
        const isValid = validate();
        //const isValidPassword = validatePassword(password);
        if(isValid){
            Axios.post("http://localhost:5000/api/students/registerStudent", {
                email: email,
                studentIdNumber: studentIdNumber,
                currentYear: currentYear,
                Year2CompletionYear: Year2CompletionYear,
                Year2CompletionPeriod: Year2CompletionPeriod,
                sepcialization: sepcialization,
                name: name,
                mobile: mobile,
                homePhone: homePhone,
                internshipStartDate: dateFormat(internshipStartDate, "yyyy-mm-dd"),
                supervisorEmail: supervisorEmail
            }).then((res) => {
                console.log(res);
                setStudentIdNumber('');
                setCurrentYear('');
                setYear2CompletionYear('');
                setYear2CompletionPeriod('');
                setSepcialization('');
                setName('');
                setMobile('');
                setHomePhone('');
                setStudentEmail('');
                setInternshipStartDate(null);
                setSupervisorEmail(''); 

                setStudentIdNumberError('');
            })
        }    
    }

    // if(internshipStartDate){
    //     console.log(dateFormat(internshipStartDate, "yyyy-mm-dd"));
    // }
    

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
                    height: 2000,
                    marginTop: 4,
                    marginBottom: 4
                    },
                }}
                alignItems="center"
                justifyContent="center"
                >
                <Card variant="outlined">
                    <CardContent>
                        <div className='rowC'>
                            <Typography variant="h4" component="div" sx= {{marginBottom: 1, color: "#293B5F", fontFamily: '"Helvetica Neue"'}}>
                                Student Registration
                            </Typography>
                            <Typography variant="h4" component="div" sx= {{marginBottom: 1, marginLeft: 30, color: "#293B5F", fontFamily: '"Helvetica Neue"'}}>
                                Form I - 1A
                            </Typography>
                        </div>
                            <hr
                                style={{
                                    color: blue,
                                    backgroundColor: blue,
                                    marginBottom: 90
                                }}
                            />
                        <div>
                            <Typography sx={{ fontSize: 14, marginBottom: 2, textAlign: 'left'}} color="text.secondary">
                                Please enter your student id number without any spaces, e.g IT17121966
                            </Typography>
                            <TextField id="sliitIdNumber" type="text" label="SLIIT Student Identification Number" variant="outlined" fullWidth 
                                //sx={{ marginBottom: 7}}
                                size="small"
                                value={studentIdNumber}
                                onChange={(e) => {
                                    setStudentIdNumber(e.target.value);
                                    //setEmailError('');
                                }}
                                required
                            />
                            <div style={{color: "red"}}>{studentIdNumberError}</div>

                            <FormControl fullWidth sx={{textAlign: 'left', marginTop: 7}} size="small">
                                <InputLabel id="demo-simple-select-label">
                                    Current Year Of Registration at SLIIT
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={currentYear}
                                    label="Current Year Of Registration at SLIIT"
                                    onChange={(e) => {
                                        setCurrentYear(e.target.value);
                                        //setEmailError('');
                                    }}
                                    required
                                >
                                    <MenuItem value="Year 1">Year 1</MenuItem>
                                    <MenuItem value="Year 2">Year 2</MenuItem>
                                    <MenuItem value="Year 3">Year 3</MenuItem>
                                    <MenuItem value="Year 4">Year 4</MenuItem>
                                    <MenuItem value="Year 4 Prorata registered">Year 4 Prorata registered</MenuItem>
                                </Select>
                            </FormControl>   
                            {/* <div style={{color: "red"}}>{usertypeError}</div> */}

                            <FormControl fullWidth sx={{textAlign: 'left', marginTop: 7}} size="small">
                                <InputLabel id="demo-simple-select-label">
                                    Which calendar year have you completed or planning to complete your second year?
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Year2CompletionYear}
                                    label="Which calendar year have you completed or planning to complete your second year?"
                                    onChange={(e) => {
                                        setYear2CompletionYear(e.target.value);
                                        //setEmailError('');
                                    }}
                                    required
                                >
                                    <MenuItem value="2018">2018</MenuItem>
                                    <MenuItem value="2019">2019</MenuItem>
                                    <MenuItem value="2020">2020</MenuItem>
                                    <MenuItem value="2021">2021</MenuItem>
                                    <MenuItem value="2021">2022</MenuItem>
                                    <MenuItem value="2021">2023</MenuItem>
                                    <MenuItem value="2021">2024</MenuItem>
                                    <MenuItem value="2021">2025 and after</MenuItem>
                                </Select>
                            </FormControl>   

                            <FormControl fullWidth sx={{textAlign: 'left', marginTop: 7}} size="small">
                                <InputLabel id="demo-simple-select-label">
                                    Which period of the year are you planning to complete or completed your second year?
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Year2CompletionPeriod}
                                    label="Which period of the year are you planning to complete or completed your second year?"
                                    onChange={(e) => {
                                        setYear2CompletionPeriod(e.target.value);
                                        //setEmailError('');
                                    }}
                                    required
                                >
                                    <MenuItem value="Jan - June">Jan - June</MenuItem>
                                    <MenuItem value="July - Nov">July - Nov</MenuItem>
                                </Select>
                            </FormControl>   

                            <FormControl fullWidth sx={{textAlign: 'left', marginTop: 7}} size="small">
                                <InputLabel id="demo-simple-select-label">
                                    Specialization
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sepcialization}
                                    label="Specialization"
                                    onChange={(e) => {
                                        setSepcialization(e.target.value);
                                        //setEmailError('');
                                    }}
                                    required
                                >
                                    <MenuItem value="SE">SE</MenuItem>
                                    <MenuItem value="IT">IT</MenuItem>
                                    <MenuItem value="CS">CS</MenuItem>
                                </Select>
                            </FormControl> 

                            <div>
                            <Typography sx={{ fontSize: 14, marginBottom: 2, marginTop: 7, textAlign: 'left'}} color="text.secondary">
                                e.g. Rathnayaka M.H.K.R.
                            </Typography>
                            <TextField id="name" type="text" label="Student Name with Initials" variant="outlined" fullWidth 
                                //sx={{ marginTop: 1, marginBottom: 7 }}
                                size="small"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    //setEmailError('');
                                }}
                                required
                            />
                            </div>  

                            <div>
                            <Typography sx={{ fontSize: 14, marginBottom: 2, marginTop: 7, textAlign: 'left'}} color="text.secondary">
                                e.g. 94772269563
                            </Typography>
                            <TextField id="mobile" type="text" label="Student Mobile Phone Number" variant="outlined" fullWidth 
                                //sx={{ marginTop: 1, marginBottom: 7 }}
                                size="small"
                                value={mobile}
                                onChange={(e) => {
                                    setMobile(e.target.value);
                                    //setEmailError('');
                                }}
                                required
                            />
                            </div>  

                            <div>
                            <Typography sx={{ fontSize: 14, marginBottom: 2, marginTop: 7, textAlign: 'left'}} color="text.secondary">
                                e.g. 94112590558
                            </Typography>
                            <TextField id="homeNumber" type="text" label="Student Home Phone Number" variant="outlined" fullWidth 
                                //sx={{ marginTop: 1, marginBottom: 7 }}
                                size="small"
                                value={homePhone}
                                onChange={(e) => {
                                    setHomePhone(e.target.value);
                                    //setEmailError('');
                                }}
                                required
                            />
                            </div>  
                            
                            <div>
                            <Typography sx={{ fontSize: 14, marginBottom: 2, marginTop: 7, textAlign: 'left'}} color="text.secondary">
                                Students are strongly recommended use SLIIT e-mail address e.g it17051456@my.sliit.lk and it will be the primary e-mail address SLIIT industry placement unit will correspond with the student
                            </Typography>
                            <TextField id="email" type="email" label="Email" variant="outlined" fullWidth 
                                //sx={{ marginTop: 1, marginBottom: 7  }}
                                value={studentEmail}
                                size="small"
                                // onChange={(e) => {
                                //     setStudentEmail(e.target.value);
                                //     //setEmailError('');
                                // }}
                                required
                            />
                            </div>
                            {/* <div style={{color: "red"}}>{emailError}</div> */}

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack  sx={{textAlign: 'left', marginTop: 7}}>
                                {/* spacing={3} */}
                                <DesktopDatePicker
                                    label="What is the date you started or plan to start your internship?"
                                    inputFormat="dd/MM/yyyy"
                                    value={internshipStartDate}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                </Stack>
                            </LocalizationProvider>

                            <div>
                            <Typography sx={{ fontSize: 14, marginBottom: 2, marginTop: 7, textAlign: 'left'}} color="text.secondary">
                                Enter supervisor's organizational e-mail address where it will be the e-mail address SLIIT industry placement unit will correspond with the supervisor
                            </Typography>
                            <TextField id="supervisorEmail" type="email" 
                                label="Specify Supervisor E-Mail address for the supervisor to fill his/her information" 
                                variant="outlined" fullWidth 
                                //sx={{ marginTop: 1, marginBottom: 7  }}
                                size="small"
                                //supervisorEmail, setSupervisorEmail
                                value={supervisorEmail}
                                onChange={(e) => {
                                    setSupervisorEmail(e.target.value);
                                    //setEmailError('');
                                }}
                                required
                                disabled={currentYear === "Year 1" ||  currentYear === "Year 2"}
                            />
                            </div>
                        </div>
                    </CardContent>
                    <CardActions>
                            <Button 
                                variant="contained" 
                                onClick={registerStudent}
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
