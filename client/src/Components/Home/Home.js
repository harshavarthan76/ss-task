import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout';

export default function Home() {
    const user = useSelector(state => state.currentUser);
    return (
        user.isLoggedIn ?
            <div className='overview'>
                <h1>Welcome {user.user.name}</h1>
                <div className='details'>
                    Age: {user.user.age}<br></br>
                    Email: {user.user.email}<br></br>
                </div>
                <button>Edit</button>

                <Logout />
            </div> :
            <>
                <Link to='/login'>Login</Link>
            </>
    )
}
