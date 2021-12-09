import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
//import { useHistory } from 'react-router-dom';

const Header = () => {

    // //const history = useHistory();

    // const changeSupervisor = () => {
    //     let path = `/change-supervisor`; 
    //     history.push(path);
    // }

    return (
        <div>
            <img src="https://courseweb.sliit.lk/pluginfile.php/1/theme_lambda/logo/1629135847/sliit_logo.jpg" alt="Sliit"/>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{backgroundColor: "#FFA400"}}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Button color="inherit">Form I-3A</Button>
                        <Button color="inherit">Form I-6</Button>
                        {/* <Button 
                            color="inherit"
                            onClick={changeSupervisor}
                        >
                            Form I-1C
                        </Button> */}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Header
