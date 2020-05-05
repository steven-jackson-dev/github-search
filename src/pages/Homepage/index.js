import React from 'react'
import { Typography } from '@material-ui/core'
import { AppSearchCard } from 'components'

const Homepage = () => {
    return (
        
        <div className="Homepage">
            <section className="HomepageIntro" style={{ textAlign: 'center', margin: '2em 0' }}>
                <Typography gutterBottom variant="h4" component="h1">
                    Github User and Repo Search
            </Typography>
                <Typography gutterBottom variant="body1" component="p">
                    A basic App that allows you to search through Users and Repositories. 
            </Typography>
                <Typography style={{ marginTop: '2em' }} variant="body1" component="p">
                    <a href="https://github.com/steven-jackson-dev/react-github-search" target="_blank" rel="noopener noreferrer"> Source </a> 
            </Typography>
            </section>
        </div>
    )
}

export default Homepage
