import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useRouter } from 'next/router';

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const GetStarted = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signuplogin');
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        backgroundColor: '#ffffff',
        padding: '16px',
        marginLeft:"20px"
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2 }}>
        Welcome to Our App!
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#555' }}>
        Get started by creating an account or logging in to your existing one.
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          padding: '12px 24px',
          fontSize: '1.2rem',
          borderRadius: '30px',
          transition: 'background-color 0.3s, transform 0.3s',
          '&:hover': {
            backgroundColor: '#1565c0',
            transform: 'scale(1.05)',
          },
          animation: `${bounce} 1s infinite`,
        }}
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
    </Container>
  );
};

export default GetStarted;
