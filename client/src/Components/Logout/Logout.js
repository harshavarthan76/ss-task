import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { logout } from '../../redux/actions';

export default function Logout() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector(state => state.currentUser);

    function handleLogout() {
        dispatch(logout({ ...currentUser, isLoggedIn: false }));
        history.push('/');
    }

    return (
        <>
            {currentUser.isLoggedIn &&
                <button onClick={handleLogout}>
                    Logout
                </button>

            }
        </>
    )
}
