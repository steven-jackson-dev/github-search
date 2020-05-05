import React from 'react'
import PropTypes from 'prop-types';
import { Typography, CircularProgress } from '@material-ui/core'

const AppLoader = (props) => {

    const {loadingMessage} = props;
    
    return (
        <div style={{ textAlign: 'center' }}>
                <CircularProgress color="secondary" />
                <Typography variant="h6" component="p">{loadingMessage}</Typography>
            </div>
    )
}

AppLoader.defaultProps = {
    loadingMessage: 'Loading Message',
};

AppLoader.propTypes = {
    loadingMessage: PropTypes.string.isRequired,
};

export default AppLoader
