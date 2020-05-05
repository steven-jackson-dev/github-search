import { Homepage, SearchUsers, UserProfile, SearchRepos, RepoInfoPage } from "pages";
import { faHome, faList } from "@fortawesome/free-solid-svg-icons";

const AppRoutes = [
    {
        id: 'homepage',
        name: 'Homepage',
        path: '/',
        icon: faHome,
        page: Homepage,
        inMenu: true
    },
    {
        id: 'search-users',
        name: 'Search Users',
        path: '/search-users',
        icon: faList,
        page: SearchUsers,
        inMenu: true
    },
    {
        id: 'user-profile',
        name: 'Search Users',
        path: '/user/:id',
        icon: faList,
        page: UserProfile,
        inMenu: false
    },
    {
        id: 'search-repos',
        name: 'Search Repos',
        path: '/search-repos',
        icon: faList,
        page: SearchRepos,
        inMenu: true
    },
    {
        id: 'repo-info',
        name: 'Repo Information',
        path: '/repo/:id',
        icon: faList,
        page: RepoInfoPage,
        inMenu: false
    },

]
export default AppRoutes
