import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Button from '@mui/material/Button';

import { useHistory } from 'react-router-dom'

const DashBoard = () => {

    const history = useHistory();

    const company = () => {
        let path = `/companyList`; 
        history.push(path);
    }
   
    return (
        <div>
            <Header/>
            <Box
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                    m: 1,
                    width: 1350,
                    height: 425,
                    // marginTop: 2,
                    // marginBottom: 2, 
                    backgroundColor: "#F4F4F2"
                    },
                }}
                alignItems="center"
                justifyContent="center"
                >
                <Card variant="outlined"  >
                    <CardContent>
                        <div className='rowC'>
                            {/* <Typography variant="h4" component="div" sx= {{marginBottom: 1, color: "#293B5F", fontFamily: '"Helvetica Neue"'}}> */}
                            <Typography variant="h5" component="div" sx= {{marginBottom: 0.5, color: "#293B5F"}}>
                                <b>Dashboard</b>
                            </Typography>
                            {/* <Typography variant="h4" component="div" sx= {{marginBottom: 1, marginLeft: 30, color: "#293B5F", fontFamily: '"Helvetica Neue"'}}> */}
                            <Typography variant="h5" component="div" sx= {{marginBottom: 0.5, marginLeft: 55, color: "#293B5F"}}>
                                <b>Intern Manager</b>
                            </Typography>
                        </div>
                            <hr
                                style={{
                                    color: blue,
                                    backgroundColor: blue,
                                }}
                            />
                            <Grid sx={{ flexGrow: 1}} container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center" spacing={5}>
                                        <Grid item>
                                            <Button>
                                                <Paper sx={{ height: 345, width: 280 }}>
                                                    <PersonIcon sx={{ height: 250, width: 200, marginTop: 3 }}/>
                                                    <Typography >
                                                        Student
                                                    </Typography>
                                                </Paper>
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button>
                                                <Paper sx={{ height: 345, width: 280 }}>
                                                    <SupervisorAccountIcon sx={{ height: 250, width: 200, marginTop: 3 }}/>
                                                    <Typography >
                                                        Supervisor
                                                    </Typography>
                                                </Paper>
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button>
                                                <Paper sx={{ height: 345, width: 280 }}>
                                                    <WorkIcon sx={{ height: 250, width: 200, marginTop: 3 }}/>
                                                    <Typography >
                                                        Internship
                                                    </Typography>
                                                </Paper>
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button>
                                                <Paper onClick={company} sx={{ height: 345, width: 280 }}>
                                                <BusinessIcon sx={{ height: 250, width: 200, marginTop: 3 }}/>
                                                    <Typography >
                                                        Company
                                                    </Typography>
                                                </Paper>
                                            </Button>
                                        </Grid>   
                                    </Grid>
                                </Grid>
                            </Grid>
                    </CardContent>
                    <CardActions>
                            
                    </CardActions>
                   
                </Card>
            </Box>
            <div style={{position: 'absolute',  bottom:0, width:1365}}>
                <Footer/>
            </div>
        </div>
    )
}

export default DashBoard

// marginBottom: 20