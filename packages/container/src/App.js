import React, { lazy, Suspense, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
})
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false)
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignedIn(!isSignedIn)} isSignedIn={isSignedIn} />
                    <Suspense fallback={<div><Progress /></div>}>
                        <Switch>
                            <Route path='/auth'>
                                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
                            </Route>
                            <Route path='/'>
                                <MarketingLazy />
                            </Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}