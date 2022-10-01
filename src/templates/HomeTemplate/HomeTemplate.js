import { Fragment } from "react";
import { Route } from "react-router-dom";

export const HomeTemplate = (props) => { //props: path, exact, Component
    const { Component, ...restProps } = props;

    return <Route {...restProps} render={(propsRoute) => {
        //props.location.props
        //props.history.props

        return <Fragment>
            <h1 className="bg-black h-10 text-white"> This is header homepage</h1>

            <Component {...propsRoute} />

            <footer className="bg-black h-10 text-white">
                This is footer homepage
            </footer>
        </Fragment>
    }} />
}