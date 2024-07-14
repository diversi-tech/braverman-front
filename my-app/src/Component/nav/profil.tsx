import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import './profil.css'
// import { useLocation, useNavigate } from 'react-router-dom';

// const type = sessionStorage.getItem("userType")
const ProfileIcon: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
const currentUser = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserId: string, UserTypeId: string, UserTypeName: string, UserFirstName: string, UserLastName: string } } }) => state.user.currentUser);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        console.log('User logged out');
        window.location.href = '../../login/Login.tsx';
    };

    return (

        <div id='imgprof'>
            <IconButton
                edge="end"
                color="inherit"
                // aria-label="account of current user"
                // aria-controls="menu-appbar"
                // aria-haspopup="true"
                onClick={handleMenu}
            >
                <AccountCircle />
            </IconButton>
            <Menu
                className='prof'
                id="menu-appbar"
                anchorEl={anchorEl}
                // anchorOrigin={{
                //     vertical: 'top',
                //     horizontal: 'right',

                // }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Typography variant="h6">Name:  {currentUser.UserFirstName}</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Typography variant="subtitle1">Email: {currentUser.UserEmail}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Typography variant="button">Switch User</Typography>
                </MenuItem>
            </Menu></div>);
};
// const currentUserType = useSelector((state: { user: { currentUser: { UserEmail: string, UserPassword: string, UserType: string } } }) => state.user.currentUser.UserType);

// const navigate = useNavigate();
// const location = useLocation();



export default ProfileIcon;
