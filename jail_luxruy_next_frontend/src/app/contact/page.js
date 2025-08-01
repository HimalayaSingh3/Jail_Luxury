"use client"
import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const Container = styled(Box)(({ theme }) => ({
  borderRadius:'20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '20px',
  backgroundColor: theme.palette.background.paper,
  margin: '10vh 10vw',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: '5vh 5vw',
    Padding: '2vh'
  },
}));

const Section = styled(Box)(({ theme }) => ({
  width: '45%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginBottom: '20px',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: '10px',
  color: theme.typography.color,
}));

const InfoText = styled(Typography)(({ theme }) => ({
  marginBottom: '10px',
  color: theme.typography.color,
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  
  '& .MuiInputLabel-root': {
    color: theme.typography.color,
  },
  
  '& .Mui-focused': {
    
    color: theme.typography.color,
  },
}));

const Form = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
}));

export default  function Contact() {


  return (
    <Container>
      {/* Left Section */}
      <Section>
        <Title variant="h6">Head Office</Title>
        <InfoText>
          3633 prabhash complex | mukundopur bhagwanpur - 24 south pargana / kolkata 700150
        </InfoText>
        <InfoText></InfoText>
        <InfoText></InfoText>
        <InfoText></InfoText>
        <Title variant="h6">Stay In Touch</Title>
        <InfoText>
          We believe in the transformative power of elegance. Our journey began with a passion for curating the finest in luxury, bringing together a collection that...
        </InfoText>
        <Title variant="h6">Customer Service</Title>
        <InfoText>📧 support@jail.luxury</InfoText>
        <InfoText>📞 +91 88777 72277</InfoText>
        <InfoText>🕒 Mon-Sat: 10:00 AM - 05:00 PM</InfoText>
      </Section>

      {/* Right Section */}
      <Section>
        <Title variant="h6">Got Any Questions?</Title>
        <Form>
          <StyledTextField  
            label="Name" 
            
            variant="outlined" 
            fullWidth 
            InputProps={{ style: { borderRadius: '20px' } }}
          />
          <StyledTextField 
            label="Email"

            variant="outlined" 
            fullWidth 
            InputProps={{ style: { borderRadius: '20px' } }}
          />
          <StyledTextField 
            label="Comment or Message" 
            variant="outlined" 
            multiline
            rows={4}
            fullWidth 
            InputProps={{ style: { borderRadius: '20px' } }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ borderRadius: '20px', padding: '10px 20px', fontWeight: 'bold' }}
          >
            Submit
          </Button>
        </Form>
      </Section>
    </Container>
  );
}