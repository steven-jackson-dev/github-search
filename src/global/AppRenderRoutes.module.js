import React, { useState, useMemo } from 'react'
import { Route, Switch, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AppRoutes from 'global/AppRoutes.module'
import { UserContext } from 'context/UserContext';
import { SearchContext } from 'context/SearchContext';
import { RepoContext } from 'context/RepoContext';

const AppRenderRoutes = () => {

    let location = useLocation();

    const [user, setUser] = useState(null)
    const [repository, setRepository] = useState(null)
    const [searchTerm, setSearchTerm] = useState({ repoSearchTerm: '', userSearchTerm: '' })

    const providerRepoValue = useMemo(() => ({ repository, setRepository }), [repository, setRepository])
    const providerUserValue = useMemo(() => ({ user, setUser }), [user, setUser])
    const providerSearchValue = useMemo(() => ({ searchTerm, setSearchTerm }), [searchTerm, setSearchTerm])

    return (
        <TransitionGroup>
            <CSSTransition key={location.id} classNames="fade" timeout={{ enter: 800, exit: 0 }}>
                <UserContext.Provider value={providerUserValue}>
                    <RepoContext.Provider value={providerRepoValue}>
                        <SearchContext.Provider value={providerSearchValue}>
                            <Switch location={location}>
                                {AppRoutes.map(route => {
                                    return <Route key={route.id} exact path={route.path} component={route.page} />
                                })}
                                <Route exact path='' render={() => `404 - Page Not Found`} />
                            </Switch>
                        </SearchContext.Provider>
                    </RepoContext.Provider>
                </UserContext.Provider>
            </CSSTransition>
        </TransitionGroup>
    )
}


export default AppRenderRoutes
