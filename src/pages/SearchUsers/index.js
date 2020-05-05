import React, { useState, useEffect, useContext } from 'react'
import {useToggle, useInputState} from 'utils/hooks';
import { SearchContext } from 'context/SearchContext';
import { fetchUsersData } from 'api'

import { Grid, TextField, Typography } from '@material-ui/core'
import { AppSearchCard, AppError, AppLoader } from 'components';

const SearchUsers = () => {
    const [usersData, setUsersData] = useState(false)
    const [userSearchInput, setUserSearchInput] = useInputState("");
    const [isLoading, setIsLoading] = useToggle(false)
    const [isError, setIsError] = useToggle(false)
    const { searchTerm, setSearchTerm } = useContext(SearchContext);

    useEffect(() => {
        (searchTerm.userSearchTerm !== '') && setUserSearchInput(searchTerm.userSearchTerm);
    }, [])

    const getUserData = async (query) => {
        try {
            const resUserData = await fetchUsersData(query);
            resUserData ? setUsersData(resUserData) : setIsError(true);
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        setSearchTerm({ ...searchTerm, userSearchTerm: userSearchInput })
        getUserData(userSearchInput);
    }

    return (
        <section className="Users" style={{ textAlign: 'center', margin: '2em 0' }}>

            <Typography variant="h6" component="p">Search Github Users</Typography>

            <form autoComplete="off" onSubmit={handleSubmit} style={{ margin: '2em 0' }}>
                <TextField
                    style={{ width: '50vw' }}
                    id="search-gihub-user"
                    onChange={setUserSearchInput}
                    label="Search Github Users"
                    value={userSearchInput}
                    type="search"
                    variant="outlined"
                    required />
            </form>

            {!usersData && isLoading && <AppLoader loadingMessage='Loading Users' />}
            {isError && <AppError />}

            {usersData &&
                <Grid container spacing={2}>
                    {(usersData.length > 0) &&
                        usersData.map(user => {
                            return <Grid key={user.id} item xs={12} sm={4} md={3}>
                                <AppSearchCard linkText='View User' route={`/user/${user.id}`} data={user} />
                            </Grid>
                        })
                    }
                </Grid>
            }
        </section >
    )
}

export default SearchUsers
