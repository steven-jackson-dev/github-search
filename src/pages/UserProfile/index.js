import React, { useEffect, useContext } from 'react'
import {useToggle} from 'utils/hooks';
import { UserContext } from 'context/UserContext';
import { fetchUserProfileData } from 'api'

import { AppError, AppLoader } from 'components';
import UserInfoCard from './UserInfoCard';
import UserNavTab from './UserNavTab';

const UserProfile = (props) => {
    
    const { params: { id } } = props.match;
    const { setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useToggle(true)
    const [isError, setIsError] = useToggle(false)

    useEffect(() => { getUserData(id) }, [])

    const getUserData = async (id) => {
        try {
            const res = await fetchUserProfileData(id);
            (res.user) ? setUser(res) : setIsError(true);
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
            console.warn(error)
        }
    }

    return (
        <section className="UserProfile" style={{ margin: '2em 0' }}>

            {isLoading && <AppLoader loadingMessage='Loading User Information' />}
            {isError && <AppError />}

            {(!isLoading && !isError) &&
                <div className="UserProfileWrapper">
                    <UserInfoCard />
                    <UserNavTab />
                </div>
            }
        </section >
    )
}

export default UserProfile
