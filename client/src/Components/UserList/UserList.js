import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers } from '../../redux/actions'
import User from '../User/User'
import './UserList.css'

export default function UserList() {

    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    const renderUsers = () => {
        console.log(users);
        return users.map((user) => {
            return <li key={user.id}>
                <User data={user} />
            </li>
        })
    }
    return (
        <div className='userlist'>
            UserList:
            <ul>{renderUsers()}</ul>
        </div>
    )
}
