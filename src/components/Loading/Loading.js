import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'


export default function Loading(props) {

    const { isLoading } = useSelector(state => state.LoadingReducer)

    return (
        <Fragment>
            {isLoading ?
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99 }}>
                    <img src="https://cdn.dribbble.com/users/891352/screenshots/2692406/media/1b408606bfead34cb0576b7134e2b96f.gif" alt="Loading ..."></img>
                </div>
                : ''}

        </Fragment>
    )
}
