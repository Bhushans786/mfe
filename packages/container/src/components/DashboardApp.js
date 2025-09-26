import React, { useEffect } from "react";
import { mount } from 'dashboard/DashboardApp';
import { useRef } from "react";

export default () => {
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current)
    }, [])

    return <div ref={ref} />
}