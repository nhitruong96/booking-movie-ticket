import { Fragment } from "react";
import { Route } from "react-router-dom";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";

export const HomeTemplate = (props) => { //props: path, exact, Component
    const { Component, ...restProps } = props;

    return <Route {...restProps} render={(propsRoute) => {
        //props.location.props
        //props.history.props

        return <Fragment>
            <Header {...propsRoute} />
            <HomeCarousel {...propsRoute} />
            
            <Component {...propsRoute} />

            <footer className="bg-black h-10 text-white">
                This is footer homepage
            </footer>
        </Fragment>
    }} />
}