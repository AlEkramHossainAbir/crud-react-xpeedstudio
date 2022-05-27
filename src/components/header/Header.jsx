import { Typography } from '@mui/material';
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import './Header.css'

const Header = () => {
    let navigate = useNavigate();

    return (
        <div className='navbar'>
             <Typography variant='h4'  onClick={()=>{ navigate(`/`)}} className="title">XpeedStudio</Typography>
            <Nav className='nav'>  
                <Nav.Item>
                    <Nav.Link href="/"  className='navItem'  >Table  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/form"  className='navItem'  >Create Form  </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Header;