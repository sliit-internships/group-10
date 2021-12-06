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
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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

const CompanyList = () => {

    const [companies, setCompanies] = React.useState();
    const [selectedFile, setSelectedFile] = React.useState();
    const [selectedFileError, setSelectedFileError] = React.useState('');

    React.useEffect(() => {
        const fetchCompanies = () => {
            Axios.get('http://localhost:5000/api/companies/getCompanies')
                .then((res) => {
                    setCompanies(res.data);
                })
        }
        fetchCompanies();
    }, [companies]);

    const selectFile = (event) => {
        setSelectedFile(event.target.files[0])
        console.log(event.target.files[0])
        setSelectedFileError("");
    }

    const upload = () => {
        const formData = new FormData();
        formData.append("uploadfile", selectedFile);
        
        if(selectedFile.type.includes("excel") || selectedFile.type.includes("spreadsheetml")){
            Axios.post("http://localhost:5000/api/companies/uploadfile", formData)   
            .then((res) => {
                console.log(res.data);
                toast.success('Successsfully uploaded');
            }) 
        } else{
            console.log("Please upload only excel file.")
            setSelectedFileError("Please upload only excel file.");
        }    
    }

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
                                    <b>Company Details</b>
                                </Typography>
                                
                                {/* <Typography variant="h5" component="div" sx= {{marginBottom: 1, marginLeft: 35, color: "#293B5F"}}>
                                    <b>d</b>
                                </Typography> */}
                                    <label htmlFor="btn-upload">
                                        <input
                                            id="btn-upload"
                                            name="uploadfile"
                                            // style={{ display: 'none' }}
                                            type="file"
                                            onChange={selectFile} 
                                        />
                                        <Button
                                            className="btn-choose"
                                            variant="contained"
                                            component="span" 
                                            sx= {{backgroundColor: "black"}}
                                        >
                                            Add Companies
                                        </Button>
                                    </label>
                                        <Button
                                            className="upload"
                                            color="primary"
                                            variant="contained"
                                            component="span"
                                            sx= {{backgroundColor: "black"}}
                                            disabled={!selectedFile}
                                            onClick={upload}
                                        >
                                            Upload
                                        </Button>
                            </div>
                            <div style={{color: "red", marginLeft: 111}}>{selectedFileError}</div>
                                <hr
                                    style={{
                                        color: blue,
                                        backgroundColor: blue,
                                        marginBottom: 20
                                    }}
                                />
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Company Name</StyledTableCell>
                                                <StyledTableCell align="right">Address</StyledTableCell>
                                                <StyledTableCell align="right">Size</StyledTableCell>
                                                <StyledTableCell align="right">Registered Year</StyledTableCell>
                                                <StyledTableCell align="right">Registered County</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {companies && companies.map((company) => (
                                            <StyledTableRow key={company.id}>
                                                <StyledTableCell component="th" scope="row">
                                                    {company.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{company.address}</StyledTableCell>
                                                <StyledTableCell align="right">{company.size}</StyledTableCell>
                                                <StyledTableCell align="right">{company.registeredYear}</StyledTableCell>
                                                <StyledTableCell align="right">{company.registeredCounty}</StyledTableCell>
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

export default CompanyList
