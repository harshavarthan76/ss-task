import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteUser, setActiveUser, showForm } from '../../redux/actions'
import './User.css'

export default function User({ data }) {
    const dispatch = useDispatch();

    const renderUserData = data => {
        console.log(data.name);
        dispatch(setActiveUser(data));
        dispatch(showForm(true));
    }

    const handleDelete = data => {
        console.log(data);
        dispatch(deleteUser(data));
    }
    return (
        <div className='user'>
            <div>{data.name}</div>
            <div className='user-buttons'>
                <button onClick={() => {
                    renderUserData(data)
                }}>Edit</button>
                <button onClick={() => {
                    handleDelete(data)
                }}>Delete</button>
            </div>
        </div>
    )
}
