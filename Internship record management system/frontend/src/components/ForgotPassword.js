import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const ForgotPassword = () => {

    const [email, setEmail] = React.useState('');
    // const [emailError, setEmailError] = React.useState('');

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
                            Password Assistance
                        </Typography>
                            <div style={{ marginTop: 15 }}>
                            Enter the email address associated with your SLIIT Internships account
                                <TextField id="email" type="email" label="Email" variant="outlined" fullWidth 
                                    sx={{ marginTop: 2 }}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        // setEmailError('');
                                    }}
                                    required
                                />
                            </div>
                            {/* <div style={{color: "red"}}>{emailError}</div> */}
                    </CardContent>
                    <CardActions>
                            <Button 
                                variant="contained" 
                                // onClick={login}
                                fullWidth
                                sx= {{backgroundColor: "#FFA400", fontFamily: '"Helvetica Neue"'}}
                                //disabled={!usertype || !email || !password }
                            >
                                Submit
                            </Button>
                    </CardActions>
                    {/* <Link to= '/'>
                        <Typography variant="body2">
                                New to SLIIT Internships? Regsiter
                        </Typography>
                    </Link> */}
                </Card>
            </Box>
        </div>
    )
}

export default ForgotPassword
