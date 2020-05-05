import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from 'context/UserContext'

import { makeStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Chip } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function UserRepoList() {

    const classes = useStyles();
    const { user: { repo } } = useContext(UserContext);

    return (
        <div className="UserRepoListWrapper">
            {repo.map((repo) => {
                return <ExpansionPanel key={repo.id}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel-content"
                        id="panel1a-header"
                        className={classes.panel}
                    >
                        <Typography className={classes.heading} variant="h6" component="p">
                            {repo.name}
                        </Typography>
                        {repo.language &&
                            <Typography style={{ padding: '0 1em' }} variant="h6" component="p">
                                <Chip label={repo.language} color="secondary" size="small" />
                            </Typography>
                        }
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {repo.description &&
                            <Typography style={{ padding: '1em 0' }} variant="body1" component="p">
                                {repo.description}<br /><br />
                                <Link className={classes.link} to={`/repo/${repo.id}`}>View Repository</Link>
                            </Typography>
                        }
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            })}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
        textTransform: 'Capitalize'
    },
    panel: {
        '& > div': {
            justifyContent: 'space-between',
        }
    },
    link: {
        textDecoration: 'none',
        color: 'red',
        border: '1px solid #f50057',
        borderRadius: '10px',
        padding: '0.5em 1em',
        transition: 'linear 0.3s all',
        '&:hover': {
            backgroundColor: '#f50057',
            color: 'white',

        }
    }
}));

