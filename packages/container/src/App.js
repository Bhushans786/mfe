import React, { lazy, Suspense, useEffect, useState } from "react";
import Header from "./components/Header";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import Progress from "./components/Progress";
import { createBrowserHistory } from 'history';

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));
const history = createBrowserHistory();
export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn])
    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(!isSignedIn)} isSignedIn={isSignedIn} />
                    <Suspense fallback={<div><Progress /></div>}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path='/dashboard'>
                                {
                                    !isSignedIn && <Redirect to='/' />
                                }
                                <DashboardLazy />
                            </Route>
                            <Route path='/'>
                                <MarketingLazy />
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    )
}