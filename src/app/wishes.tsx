"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Confetti from 'react-confetti'
import { Alert, Button, Snackbar, TextField } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import 'react-toastify/dist/ReactToastify.css';


function Wishes() {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false)
  const [mailApiResponse, setMailApiResponse] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<{ width: any; height: any }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  function handleWindowSize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    console.log(window.innerWidth, window.innerHeight);

  }

  useEffect(() => {
    window.onresize = () => handleWindowSize();
  })
//---------------------------------------------------------------------
// const windowObj = useMemo(
//   () => ({
//     width: typeof window !== "undefined" && window.innerWidth,
//     height: typeof window !== "undefined" && window.innerHeight,
//   }),
//   []
// );

// const [windowDimension, setWindowDimension] = useState(windowObj);

// const detectSize = useCallback(
//   () => setWindowDimension(windowObj),
//   [windowObj]
// );
// useEffect(() => {
//   window.addEventListener("resize", detectSize);
//   return () => window.removeEventListener("resize", detectSize);
// }, [windowDimension, detectSize]);
//--------------------------------------------------------------------
  const handleSubmit = async (values: any) => {
    values.preventDefault();
    console.log(values);
    if (message === "") {
      setError(true)
      // setMailApiResponse(false);
    
    } else {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          message
        })  
      })

      setMessage('');
      const isSuccess = await response.json();
      console.log(isSuccess);
      const isSuccess_message = isSuccess.message;
      console.log('check from success.msg ' + isSuccess_message);

      if (isSuccess_message==='email sent successfully') {
        setMailApiResponse(true)
      } else {
        setMailApiResponse(false)
      }
      setOpen(true)
    } 
  }

  return (
    <>
      <div id="party-info">
        <div className='buttons'>
          <Button className='button' color="error" variant="contained" startIcon={<YouTubeIcon />} href='https://www.youtube.com/live/hnoEvdm92DI?si=nc15faikh8hF9FeO' >
            Watch Live
          </Button>
          <Button className='button' color="info" variant="contained" startIcon={<LocationOnIcon />} href='https://maps.app.goo.gl/Bh53M7XzZsi4cM3b6'>
            Location
          </Button>
        </div>
        <div className='picture'>
          <img className="bd-placeholder-img rounded-circle us-img" width="220" height="220" src='/us.jpg' />
        </div>
        <div className='text'>
          <h2 id='h2'>SAVE THE DATE ❤️</h2>
          <h3 id="h3">30th of March 2024</h3>
          <h1 id='h1'>Kirushanthan & Abirami</h1>
          <p >Join us as we embark on a journey of love and joy. Your presence is requested as we celebrate the union of our hearts in matrimony.</p>
        </div>
        <div className="form-group mx-sm-3 mb-1 mt-1 wish">
          <TextField value={message} onFocus={() => setError(false)} error={error} helperText={error ? 'The message field is empty' : null} id="outlined-basic" label="Type your name & wishes.." variant="outlined" size="small" sx={{ mt: -2 }} onChange={(e) => setMessage(e.target.value)} />
          <Button className='button' size="small" variant="outlined" color="success" startIcon={<FavoriteIcon />} onClick={handleSubmit} >
            Send
          </Button>
        </div>
      </div>

      <Confetti
        width={windowSize.width}
        height={windowSize.height}

      />

      <Snackbar open={open} autoHideDuration={1800} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>setOpen(false)}>
        <Alert
          severity={mailApiResponse ? "success" : 'error'}
          variant="filled"
          sx={{ width: '100%' }} 
        >
          {mailApiResponse? 'Your wishes has been sent successfully':'Something went wrong try again later'}
        </Alert>
      </Snackbar>
    </>

  )
}

export default Wishes