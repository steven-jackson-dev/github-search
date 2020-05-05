import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserRepoList from '../UserRepoList';

import UserFollowingAvatar from '../UserFollowingAvatar';
import UserFollowersAvatar from '../UserFollowersAvatar';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box, } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import StarIcon from '@material-ui/icons/Star';

export default function UserNavTab() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    className={classes.tabs}
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    aria-label="User profile tabs"
                    variant="fullWidth"
                    centered
                >
                    <Tab label="Repositories" style={{ color: 'yellow' }} icon={<StarIcon />} />
                    <Tab label="Followers" style={{ color: '#ff4444' }} icon={<FavoriteIcon />} />
                    <Tab label="Following" style={{ color: '#f48fb1' }} icon={<PersonPinIcon />} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}><UserRepoList /></TabPanel>
            <TabPanel value={value} index={1}><UserFollowersAvatar /></TabPanel>
            <TabPanel value={value} index={2}><UserFollowingAvatar /></TabPanel>

        </div>
    );
}


function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box component="div" p={3}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        backgroundColor: '#424242',
    }
}));
