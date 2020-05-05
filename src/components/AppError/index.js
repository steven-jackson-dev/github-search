import React from 'react'
import ErrorImage from 'assets/images/homer-computer-doh.jpg';
import { Typography } from '@material-ui/core'

const AppError = () => {
    return (
        <div style={{ textAlign: 'center' }}>
             <img src={ErrorImage} alt="Error: Something went wrong" />
                <Typography variant="h6" component="p">Ooooops! Something went wrong. <br />Please try again later</Typography>
            </div> 
    )
}

export default AppError
