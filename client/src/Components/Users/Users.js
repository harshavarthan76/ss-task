import React from 'react';
import UserList from '../UserList/UserList'
import UserDetails from '../UserDetails/UserDetails'
import './Users.css'

export default function Users() {
    return (
        <div className='users'>
            <UserList />
            <UserDetails />
        </div>
    )
}
