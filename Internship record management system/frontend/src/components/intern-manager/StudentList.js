import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../../App.css' 
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dateFormat from 'dateformat';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      padding: "0px 8px"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
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

//phone number format
const convertPhone = (value) => {
    if(value){
      return value.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
    }  
}

const StudentList = () => {

    const [students, setStudents] = React.useState();
    const [selectedFile, setSelectedFile] = React.useState();
    const [selectedFileError, setSelectedFileError] = React.useState('');

    React.useEffect(() => {
        const fetchStudents = () => {
            Axios.get('http://localhost:5000/api/students/getAllStudents')
                .then((res) => {
                    setStudents(res.data);
                })
        }
        fetchStudents();
    }, [students]);

    // const selectFile = (event) => {
    //     setSelectedFile(event.target.files[0])
    //     console.log(event.target.files[0])
    //     setSelectedFileError("");
    // }

    // const upload = () => {
    //     const formData = new FormData();
    //     formData.append("uploadfile", selectedFile);
        
    //     if(selectedFile.type.includes("excel") || selectedFile.type.includes("spreadsheetml")){
    //         Axios.post("http://localhost:5000/api/companies/uploadfile", formData)   
    //         .then((res) => {
    //             console.log(res.data);
    //             toast.success('Successsfully uploaded');
    //         }) 
    //     } else{
    //         console.log("Please upload only excel file.")
    //         setSelectedFileError("Please upload only excel file.");
    //     }    
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
                            </div>
                            
                                <hr
                                    style={{
                                        color: blue,
                                        backgroundColor: blue,
                                        marginBottom: 20
                                    }}
                                />
                                <TableContainer component={Paper}>
                                    {/* <Table sx={{ minWidth: 700 }} aria-label="customized table"> */}
                                    <Table style={{ width: 2000 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Student Name</StyledTableCell>
                                                <StyledTableCell align="right">Student Id Number</StyledTableCell>
                                                <StyledTableCell align="right">Current Year of Registration at SLIIT</StyledTableCell>
                                                <StyledTableCell align="right">Calendar year the student has completed or planning to complete the second year</StyledTableCell>
                                                <StyledTableCell align="right">Period of the year the student is planning to complete or completed the second year</StyledTableCell>
                                                <StyledTableCell align="right">Specialization</StyledTableCell>
                                                <StyledTableCell align="right">Student Mobile Phone Number</StyledTableCell>
                                                <StyledTableCell align="right">Student Home Phone Number</StyledTableCell>
                                                <StyledTableCell align="right">The date, the student started or plan to start the internship</StyledTableCell>
                                                <StyledTableCell align="right">Supervisor E-Mail address</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {students && students.map((student) => (
                                            <StyledTableRow key={student.sid}>
                                                <StyledTableCell component="th" scope="row">
                                                    {student.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{student.studentIdNumber}</StyledTableCell>
                                                <StyledTableCell align="right">{student.currentYear}</StyledTableCell>
                                                <StyledTableCell align="right">{student.Year2CompletionYear}</StyledTableCell>
                                                <StyledTableCell align="right">{student.Year2CompletionPeriod}</StyledTableCell>
                                                <StyledTableCell align="right">{student.sepcialization}</StyledTableCell>
                                                <StyledTableCell align="right">{convertPhone(student.mobile)}</StyledTableCell>
                                                <StyledTableCell align="right">{convertPhone(student.homePhone)}</StyledTableCell>
                                                <StyledTableCell align="right">{dateFormat(student.internshipStartDate, "dd/mm/yyyy")}</StyledTableCell>
                                                <StyledTableCell align="right">{student.supervisorEmail}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        </CardContent>
                        <CardActions>
                                
                        </CardActions>    
                    </Card>
                </Box>
            </div>
            {/* <div style={{position: 'absolute',  bottom:0, width:1365}}> */}
            <Footer/>
            {/* </div> */}
        </div>
    )
}

export default StudentList
