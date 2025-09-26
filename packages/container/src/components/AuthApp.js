import React from "react";
import { mount } from 'auth/AuthApp';
import { useRef } from "react";
import { useEffect } from "react";
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
    const ref = useRef(null);
    const history = useHistory();

    const onNavigate = ({ pathname: nextPathname }) => {
        const pathname = history.location;
        if (pathname != nextPathname) {
            history.push(nextPathname);
        }
    }

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onNavigate,
            initialPath: history.location.pathname,
            onSignIn
        });
        history.listen(onParentNavigate);
    }, [])

    return <div ref={ref} />
}