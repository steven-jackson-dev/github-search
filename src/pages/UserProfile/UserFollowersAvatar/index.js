import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from 'context/UserContext'

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

export default function UserFollowersAvatar(props) {

    const classes = useStyles();
    const { user: { followers } } = useContext(UserContext);

    return (
        <div className="UserFollowersAvatarWrapper">
            <Grid container>
                {followers.map((user) => {
                    return <Grid key={user.id} item xs={4} md={2} lg={2} style={{ padding: '1em 0' }}>
                        <Link to={`/user/${user.login}`} onClick={() => window.location.href = `./user/${user.login}`}>
                            <Avatar alt={user.login} title={user.login} src={user.avatar_url} className={classes.large} />
                        </Link>
                    </Grid>
                })}
            </Grid>
        </div>
    );
}