import { Box, Button, Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = (props: any) => {
  const navigate = useNavigate();

    return (
        <>
            <Container>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <h1>Header</h1>
                    <Box>
                        <Button size='large' variant="text" sx={{fontWeight:'bold'}} onClick={()=>navigate('/') }> User</Button>
                        <Button size='large' variant="text" sx={{fontWeight:'bold'}} onClick={()=>navigate('/posts') }> Post</Button>

                    </Box>
                </Box>

            </Container>
            {props.children}
        </>

    )
}

export default Header