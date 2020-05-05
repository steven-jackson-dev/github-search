import axios from 'axios'
import { stripBracketsFromUrl } from 'utils/common/index';

const url = 'https://api.github.com';

// User Endpoints
export const fetchUsersData = async (query) => {
    try {
        const { data: { items } } = await axios.get(`${url}/search/users?q=${query}`)
        return items
    } catch (error) {
        console.log("fetchData -> error", error)
    }
}

export const fetchUserProfileData = async (id) => {
    try {
        const userData = {};
        userData.user = await fetchUserData(id)
        userData.repo = await fetchUserRepoData(id)
        userData.followers = await fetchUserFollowersData(id)
        userData.following = await fetchUserFollowingData(id)
        return userData
    } catch (error) {
        console.log("fetchData -> error", error)
    }
}

export const fetchUserData = async (id) => {
    try {
        const { data } = await axios.get(`${url}/user/${id}`)
        return data
    } catch (error) {
        console.log("fetchData -> error", error)
    }
}
export const fetchUserRepoData = async (id) => {
    try {
        const { data } = await axios.get(`${url}/user/${id}/repos`)
        return data
    } catch (error) {
        console.log("fetchData -> error", error)
    }
}

export const fetchUserFollowersData = async (id) => {
    try {
        const { data } = await axios.get(`${url}/user/${id}/followers`)
        return data
    } catch (error) {
        console.log("fetchData -> error", error)
    }
}

export const fetchUserFollowingData = async (id) => {
    try {
        const { data } = await axios.get(`${url}/user/${id}/following`)
        return data
    } catch (error) {
        console.log("fetchData -> error", error)
    }
}

// Repo Endpoints

export const fetchRepos = async (query) => {
    try {
        const {data: {items}} = await axios.get(`${url}/search/repositories?q=${query}`)
        return items
    } catch (error) {
        console.log("fetchData -> error", error)
    }
}

export const fetchSingleRepo = async (id) => {
    try {
        const {data} = await axios.get(`${url}/repositories/${id}`)
        return data
    } catch (error) {
        console.log("fetchData -> error", error)
    }
}

export const fetchRepoIssues = async (url) => {
    const strippedUrl = stripBracketsFromUrl(url)
    try {
        const {data} = await axios.get(strippedUrl)
        return data
    } catch (error) {
        console.log("fetchData -> error", error)
    }
}

