import React, { useState, useEffect, useContext } from 'react'
import {useToggle, useInputState} from 'utils/hooks';
import { SearchContext } from 'context/SearchContext';
import { fetchRepos } from 'api'

import { AppSearchCard, AppError, AppLoader } from 'components';
import { Grid, TextField, Typography } from '@material-ui/core'

const SearchRepos = () => {
    const [repoData, setRepoData] = useState(false)
    const [userRepoSearchInput, setRepoSearchInput] = useInputState("");
    const [isLoading, setIsLoading] = useToggle(false)
    const [isError, setIsError] = useToggle(false)
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    useEffect(() => {
        (searchTerm.repoSearchTerm !== '') && setRepoSearchInput(searchTerm.repoSearchTerm);
    }, [])

    const getRepoData = async (query) => {
        try {
            const resRepoData = await fetchRepos(query);
            resRepoData ? setRepoData(resRepoData) : setIsError(true);
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        getRepoData(userRepoSearchInput);
        setSearchTerm({ ...searchTerm, repoSearchTerm: userRepoSearchInput })
    }

    return (
        <section className="Users" style={{ textAlign: 'center', margin: '2em 0' }}>

            <Typography variant="h6" component="p">Search Github Repos</Typography>

            <form autoComplete="off" onSubmit={handleSubmit} style={{ margin: '2em 0' }}>
                <TextField
                    style={{ width: '50vw' }}
                    id="search-gihub-repo"
                    onChange={setRepoSearchInput}
                    label="Search Github Repos"
                    value={userRepoSearchInput}
                    type="search"
                    variant="outlined"
                    required />
            </form>

            {!repoData && isLoading && <AppLoader loadingMessage='Loading Repositories' />}
            {isError && <AppError />}

            {repoData &&
                <Grid container spacing={2}>
                    {(repoData.length > 0) &&
                        repoData.map(repo => {
                            return <Grid key={repo.id} item xs={12} sm={4} md={3}>
                                <AppSearchCard linkText='View Repo' route={`/repo/${repo.id}`} data={repo} />
                            </Grid>
                        })
                    }
                </Grid>
            }
        </section >
    )
}

export default SearchRepos
