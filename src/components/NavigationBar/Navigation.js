import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Multi media contents
                </Typography>
                <Button component={Link} to="/photos" color="inherit">
                    Photo gallery
                </Button>
                <Button component={Link} to="/video" color="inherit">
                    Video
                </Button>
                <Button component={Link} to="/globe" color="inherit">
                    Animation
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
