import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, Avatar, Chip } from '@material-ui/core'
import { getRandomColor, parseDate } from 'utils/common'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { UserContext } from 'context/UserContext'

const UserInfoCard = () => {

    const classes = useStyles();
    const { user } = useContext(UserContext);
    const { login, avatar_url, followers, following, name, bio, location, company, created_at, updated_at, blog, html_url } = user.user;
    const CreatedAt = parseDate(created_at);
    const LastUpdatedAt = parseDate(updated_at);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Avatar alt={login} src={avatar_url} className={classes.large} />
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper className={classes.paperProfile}>
                                <Typography variant="h4" component="h1" style={{ paddingBottom: '0.5em', textTransform: 'capitalize' }}>
                                    {name !== "undefined" &&
                                        <>
                                            <Typography variant="h4" component="h1" style={{ textTransform: 'capitalize' }}>{name}<br />
                                                <Typography variant="h5" component="h2">({login})</Typography>
                                            </Typography>

                                        </>
                                    }
                                    {name === "undefined" && login}
                                </Typography>
                                {bio !== "undefined" &&
                                    <Typography variant="body1" component="p" style={{ paddingBottom: '0.5em' }}>
                                        {bio}
                                    </Typography>
                                }
                                {location !== "undefined" && location &&
                                    <Typography variant="body2" component="p">
                                        Location: {location}
                                    </Typography>
                                }
                                {company &&
                                    <Typography variant="body2" component="p">
                                        Company: {company}
                                    </Typography>
                                }

                                {created_at !== "undefined" &&
                                    <Typography variant="body2" component="p">
                                        Created On: {CreatedAt}
                                    </Typography>
                                }
                                {updated_at !== "undefined" &&
                                    <Typography variant="body2" component="p">
                                        Last Updated: {LastUpdatedAt}
                                    </Typography>
                                }
                                <div className={classes.chipsWrapper}>
                                    {followers !== "undefined" && <><Chip label={`${followers} Followers`} color="primary" /></>}
                                    {following !== "undefined" && <><Chip label={`${following} Following`} color="secondary" /></>}
                                </div>
                                <div className={classes.socialMedia}>
                                    {html_url !== "undefined" &&
                                        <>
                                            <a href={html_url} target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faGithub} size="2x" color="black" style={{ marginRight: '0.5em' }} />
                                            </a>
                                        </>
                                    }
                                    {blog !== "" &&
                                        <>
                                            <a href={blog} target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faBlog} size="2x" color="#f50057" />
                                            </a>
                                        </>
                                    }
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>

    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(4),
        color: theme.palette.text.secondary,
        background: `linear-gradient(90deg, ${getRandomColor()} 0%, ${getRandomColor()} 50%, ${getRandomColor()} 100%);`
    },
    paperProfile: {
        padding: theme.spacing(4),
    },
    chipsWrapper: {
        textAlign: 'right',
        paddingTop: theme.spacing(2),
        '& div': {
            margin: theme.spacing(0.5),
        }
    },
    large: {
        width: '15vw',
        height: '15vw',
        justifyContent: 'center',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: '50vw',
            height: '50vw',
        },
        [theme.breakpoints.up('md')]: {
            width: '20vw',
            height: '20vw',
        },
        [theme.breakpoints.up('lg')]: {
            width: '65%',
            height: '100%',
        },
    },
}));

export default UserInfoCard
