import React from 'react';
import { Fragment, Suspense } from "react";
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
            {/* <Suspense fallback={<div>Loading... </div>}>
                <Header {...propsRoute} />
            </Suspense> */}

            <Header {...propsRoute} />

            <Component {...propsRoute} />

            <hr className="mt-2" />

            <Footer {...propsRoute} />

            {/* <Suspense fallback={<div>Loading... </div>}>
                <Footer {...propsRoute} />
            </Suspense> */}

        </Fragment>
    }} />
}