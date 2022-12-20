import { Button, Container, Paper, Step, StepLabel, Stepper, Typography, Box } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddressForm from '../Components/AddressForm';
import PaymentsForm from '../Components/PaymentsForm';
import ReviewForm from '../Components/ReviewForm';
import { useEffect } from 'react';
import { clearCart } from '../features/cart-slice';
import { clearCheckoutInformation } from '../features/checkOut-slice';
import { Link } from 'react-router-dom';

const steps=["Shipping Address","Payment Details","Review Order"]

function getStepContent(activeStep){
  switch(activeStep){
    case 0:
    return <AddressForm />
    case 1:
      return<PaymentsForm/>
    case 2:
      return<ReviewForm/>
    default:
      throw new Error("Unknown step")
  }
}
export default function CheckOut() {
  const [activeStep, setActiveStep]=useState(0);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(activeStep===steps.length){
      dispatch(clearCart());
      dispatch(clearCheckoutInformation());
    }
  },[activeStep])
  function handleNext(){
    setActiveStep(activeStep +1);
  }
  function handleBack(){
    setActiveStep(activeStep -1);
  }
  return (
    <Container component="section" maxWidth="lg" sx={{
      mb:4,
    }}>
      <Paper variant="outlined" sx={{my:{xs:3,md:6},p:{xs:2,md:3}}}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{
          pt:3,
          pb:5,
        }}
        >
          {steps.map((label)=>(<Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
          ))}
        </Stepper>
        {activeStep===steps.length?(<>
        <Typography variant="h5" gutterBottom>Thank you for your Order</Typography>
        <Typography>Your order number is #12234. We have emailed you the details regardiing your order confirmation.</Typography>
        <Link to="/">Shop More</Link>
        </>
        ):(
        <>
        {getStepContent(activeStep)}
        <Box sx={{display:"flex", justifyContent:"flex-end"}}>
          {activeStep !==0 && <Button sx={{
            mt:3,
            ml:1,
          }}
          variant="contained" onClick={handleBack}>Back</Button>}
          <Button sx={{
            mt:3,
            ml:1,
          }} onClick={handleNext} variant="contained">{activeStep === steps.length -1?"Place Order" : "Next"}</Button>
        </Box>
        </>
        )}
      </Paper>
    </Container>
  );
}
