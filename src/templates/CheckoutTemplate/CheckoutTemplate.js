import { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config"

const CheckoutTemplate = (props) => { //props: path, exact, Component
    const { Component, ...restProps } = props;

    return <Route {...restProps} render={(propsRoute) => {
        //props.location.props
        //props.history.props
        //props.match.param

        if (!localStorage.getItem(USER_LOGIN)) {
            return <Redirect to='/login' />
        }

        return <Fragment>
            <Component {...propsRoute} />
        </Fragment>
    }} />
}

export default CheckoutTemplate;