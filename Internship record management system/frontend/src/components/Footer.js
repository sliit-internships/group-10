import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1, top: 'auto', bottom: 0}}>
                <AppBar position="static" sx={{backgroundColor: "#FFA400", top: 'auto', bottom: 0}}>
                    <Toolbar>
                        <Typography variant="body2">
                            Copyright 2018 © SLIIT. All Rights Reserved.
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Footer
