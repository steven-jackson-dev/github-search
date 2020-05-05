import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';


const AppSearchCard = (props) => {

    const randBorderColor = getRandomColor();
    const classes = useStyles();
    const { name, description, avatar_url, owner, login } = props.data;
    const imageSrc = owner ? owner.avatar_url : avatar_url;
    const displayName = (login) ? login : name;

    return (
        <Card style={{ border: `1px solid ${randBorderColor}`, borderBottom: `7px solid ${randBorderColor}` }} className={classes.root}>
            <CardMedia
                className={classes.media}
                image={imageSrc}
                title={displayName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h1" className={classes.cardTitle}>
                    {displayName}
                </Typography>
                {description &&
                    <Typography gutterBottom variant="body2" component="p" className={classes.cardDescription}>
                        {description}
                    </Typography>
                }
            </CardContent>
            {props.route &&
                <CardActionArea className={classes.cardLink} style={{ color: `${randBorderColor}` }}>
                    <Link to={props.route} style={{ color: `${randBorderColor}` }}>
                        <CardActions className={classes.cardLink}>
                            {props.linkText}
                        </CardActions>
                    </Link>
                </CardActionArea>
            }
        </Card>
    )
}

AppSearchCard.defaultProps = {
    data: {
        name: 'Lorem ipsum dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
        avatar_url: 'https://via.placeholder.com/100x200.png?text=placeholder',
        id: 'deserunt123',
        login: 'default_login',
        owner: {
            login: 'dolor sit amet',
            avatar_url: 'https://via.placeholder.com/100x100.png?text=Placeholder'
        },
    },
    linkText: 'Card Link',
    route: 'https://github.com/steven-daniell-jackson'
};

AppSearchCard.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        avatar_url: PropTypes.string,
        id: PropTypes.number.isRequired,
        login: PropTypes.string,
        owner: PropTypes.shape({
            login: PropTypes.string,
            avatar_url: PropTypes.string,
        })
    }),
    linkText: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: '1em',
    },
    media: {
        height: 140,
    },
    cardTitle: {
        fontWeight: 500,
        textAlign: 'center'
    },
    cardDescription: {
        maxHeight: '100px',
        overflow: 'hidden',
        paddingTop: '1em',
        textAlign: 'center'
    },
    cardLink: {
        justifyContent: 'center',
        padding: '0.5em 0',
        '& a': {
            fontSize: '1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            fontWeight: '700',
        },
    },
});


const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default AppSearchCard
