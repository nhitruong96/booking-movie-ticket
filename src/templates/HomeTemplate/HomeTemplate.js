import React from 'react';
import { Fragment } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => { //props: path, exact, Component
    const { Component, ...restProps } = props;

    return <Route {...restProps} render={(propsRoute) => {
        //props.location.props
        //props.history.props
        //props.match.param

        return <Fragment>
            <Header {...propsRoute} />
            
            <Component {...propsRoute} />
            
            <hr className="mt-2"/>
            <Footer {...propsRoute} />
        </Fragment>
    }} />
}