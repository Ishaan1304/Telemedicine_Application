import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const teamMembers = [
  {
    name: 'Shreekant Jaiswal',
    role: 'Head',
    image: '/assets/head.jpg', 
  },
  {
    name: 'Chandrajeet Singh',
    role: 'Mentor',
    image: '/assets/mentor.jpg', 
  },
  {
    name: 'Dev Gupta',
    role: 'Provider Head',
    image: '/assets/provider.jpg', 
  },
  {
    name: 'Ishaan Gangrade',
    role: 'Admin',
    image: '/assets/admin.jpg', 
  },
];

const OurTeam = () => {
  return (
    <Box sx={{ padding: 4, marginLeft: "20px" }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
        Meet Our Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: '16px',
                boxShadow: 3,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={member.image}
                alt={member.name}
                sx={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
              />
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurTeam;
