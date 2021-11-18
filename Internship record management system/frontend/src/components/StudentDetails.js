import React from 'react'
import { useLocation } from "react-router-dom";
import Axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import dateFormat from 'dateformat';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../App.css'; 
import { blue } from '@mui/material/colors';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StudentDetails = () => {

    const [student, setStudent] = React.useState();

    const location = useLocation();
    const email = location.state.email;

    if(student){
        console.log(student)
    }
    
    React.useEffect(() => {
        const fetchStudent = () => {
            Axios.get('http://localhost:5000/api/students/getStudent/' + email)
                .then((res) => {
                    //const student = res.data[0];
                    setStudent(res.data);
                })
        }
        fetchStudent();
    }, [email]);

    //phone number format
    const convertPhone = (value) => {
        if(value){
          return value.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
        }  
      }

      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 16,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    return (
        <div>
            <Header/>
            <div style={{backgroundColor: "#F4F4F2"}}>
            {/* <div style={{backgroundColor: "#FFE5B4"}}> */}
            <Box
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                    m: 1,
                    width: 1200,
                    height: 668,
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
                            {/* <Typography variant="h4" component="div" sx= {{marginBottom: 1, color: "#293B5F", fontFamily: '"Helvetica Neue"'}}> */}
                            <Typography variant="h5" component="div" sx= {{marginBottom: 1, color: "#293B5F"}}>
                                <b>Student Details</b>
                            </Typography>
                            {/* <Typography variant="h4" component="div" sx= {{marginBottom: 1, marginLeft: 30, color: "#293B5F", fontFamily: '"Helvetica Neue"'}}> */}
                            <Typography variant="h5" component="div" sx= {{marginBottom: 1, marginLeft: 35, color: "#293B5F"}}>
                                <b>{email}</b>
                            </Typography>
                        </div>
                            <hr
                                style={{
                                    color: blue,
                                    backgroundColor: blue,
                                    marginBottom: 20
                                }}
                            />
                    </CardContent>
                    <CardActions>
                            
                    </CardActions>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            {student && student.map((item, index) => (
                            <TableBody key={index}>
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                        <b style={{color: "#293B5F"}}>1. Student Name 
                                        <span style={{ marginLeft: 600 }}>: {item.name}</span>
                                        </b>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                        <b style={{color: "#293B5F"}}>2. Student Id Number 
                                        <span style={{ marginLeft: 563 }}>: {item.studentIdNumber}</span>
                                        </b>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                    <b style={{color: "#293B5F"}}>3. Current Year of Registration at SLIIT 
                                    <span style={{ marginLeft: 427 }}>: {item.currentYear}</span>
                                    </b>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                    <b style={{color: "#293B5F"}}>4. Calendar year you have completed or planning to complete your second year 
                                    <span style={{ marginLeft: 110 }}>: {item.Year2CompletionYear}</span>
                                    </b>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                    <b style={{color: "#293B5F"}}>5. Period of the year you are planning to complete or completed your second year 
                                    <span style={{ marginLeft: 93 }}>: {item.Year2CompletionPeriod}</span>
                                    </b>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                    <b style={{color: "#293B5F"}}>6. Specialization 
                                    <span style={{ marginLeft: 600 }}>: {item.sepcialization}</span>
                                    </b>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                    <b style={{color: "#293B5F"}}>7. Student Mobile Phone Number 
                                    <span style={{ marginLeft: 472 }}>: {convertPhone(item.mobile)}</span>
                                    </b>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                    <b style={{color: "#293B5F"}}>8. Student Home Phone Number 
                                    <span style={{ marginLeft: 478 }}>: {convertPhone(item.homePhone)}</span>
                                    </b>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                    <b style={{color: "#293B5F"}}>9. The date you started or plan to start your internship 
                                    <span style={{ marginLeft: 307 }}>: {dateFormat(item.internshipStartDate, "dd/mm/yyyy")}</span>
                                    </b>
                                    </StyledTableCell>
                                </StyledTableRow>
                                {item.supervisorEmail &&<StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                    <b style={{color: "#293B5F"}}>10. Supervisor E-Mail address 
                                    <span style={{ marginLeft: 496 }}>: {item.supervisorEmail}</span>
                                    </b>
                                    </StyledTableCell>
                                </StyledTableRow>}
                            </TableBody>
                            ))}
                        </Table>
                </TableContainer>
                </Card>
            </Box>
            </div>
            <Footer/>
        </div>
    )
}

export default StudentDetails
