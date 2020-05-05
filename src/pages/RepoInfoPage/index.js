import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
import { useToggle } from 'utils/hooks';
import { fetchSingleRepo, fetchRepoIssues } from 'api'

import { AppError, AppLoader } from 'components';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper, Avatar, List, ListItem, ListItemText } from '@material-ui/core'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';

const RepoInfoPage = (props) => {
    const { params: { id } } = props.match;
    const [repo, setRepo] = useState(null);
    const [repoIssues, setRepoIssues] = useState(null);
    const classes = useStyles();
    const [isLoading, setIsLoading] = useToggle(true)
    const [isError, setIsError] = useToggle(false)

    useEffect(() => { getRepoData() }, [])

    const getRepoData = async () => {
        try {
            const res = await fetchSingleRepo(id);
            if (res) {
                setRepo(res)
                if (res.has_issues === true) {
                    const issues = await fetchRepoIssues(res.issues_url);
                    setRepoIssues(issues)
                }
            } else {
                setIsError(true);
            }
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
            console.warn(error)
        }
    }

    return (
        <section style={{ margin: '2em 0' }}>
            {isLoading && <AppLoader loadingMessage='Loading Repository Information' />}
            {isError && <AppError />}

            {(!isLoading && !isError) &&
                <div className="RepoProfileWrapper">
                    <Paper className={classes.paper} style={{ backgroundColor: '#424242', color: 'white' }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} md={2} lg={2}>
                                <Link to={`/user/${repo.owner.id}`} ><Avatar alt={repo.name} src={repo.owner.avatar_url} className={classes.large} /></Link>
                            </Grid>

                            <Grid item xs={12} sm={10} md={10}>
                                <Typography variant="h4" component="h1" style={{ textTransform: 'capitalize' }}>{repo.name}</Typography>
                                <Typography variant="h5" component="h2">{repo.full_name}</Typography>
                                <Typography variant="h6" component="p" style={{ padding: '1em 0' }}>{repo.description}</Typography>
                            </Grid>

                        </Grid>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} size="3x" color="white" style={{ marginRight: '0.5em' }} />
                        </a>
                    </Paper>

                    <Paper className={classes.paper} style={{ backgroundColor: '#424242' }}>
                        <Grid container spacing={2} className={classes.repoInfo}>

                            <Grid item xs={12} sm={3} md={3}>
                                <Typography variant="h5" component="p" style={{ color: 'white' }}>Forks <br />
                                    <CountUp start={0} end={repo.forks} />
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3} md={3} style={{ color: 'rgb(255, 68, 68)' }}>
                                <Typography variant="h5" component="p">Open Issues <br />
                                    <CountUp start={0} end={repo.open_issues} />
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3} md={3} style={{ color: 'yellow' }}>
                                <Typography variant="h5" component="p">Subscribers <br />
                                    <CountUp start={0} end={repo.subscribers_count} />
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3} md={3} style={{ color: 'rgb(244, 143, 177)' }}>
                                <Typography variant="h5" component="p">Watchers <br />
                                    <CountUp start={0} end={repo.watchers} />
                                </Typography>
                            </Grid>

                        </Grid>
                    </Paper>

                    <Paper className={classes.paper} style={{ backgroundColor: '#424242' }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={3} md={2}>
                                <Typography variant="h5" component="p">Open Issues:</Typography><br />
                            </Grid>

                            <Grid item xs={12} sm={10} md={10}>
                                <List >
                                    {repoIssues.map(issue => {
                                        return <ListItem key={issue.id}>
                                            <ListItemText
                                                primary={`(${issue.id})  ${issue.title}`}
                                            />
                                        </ListItem>
                                    })
                                    }
                                </List>
                            </Grid>

                        </Grid>
                    </Paper>
                </div>
            }

        </section >
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        padding: theme.spacing(4),
        marginTop: theme.spacing(2),
        color: 'white'
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: '0px auto',
    },
    repoInfo: {
        textAlign: 'center',
        '& div': {
            borderRight: '1px solid black'
        },
        '& div:last-child': {
            border: 'none'
        }
    }
}));

export default RepoInfoPage
