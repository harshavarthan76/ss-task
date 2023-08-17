import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const user = useSelector(state => state.currentUser);
    return <>
        {
            user.isLoggedIn && user.user.name !== 'admin' &&
            <div className='navbar'>
                <Link to='/'>Overview</Link>
                <Link to='/products'>Products</Link>
                <Link to='/dashboard'>MCQ</Link>
            </div>
        }
        {
            user.isLoggedIn && user.user.name === 'admin' &&
            <div className='navbar'>
                <Link to='/'>Home</Link>
                <Link to='/products'>Products</Link>
                <Link to='/users'>Users</Link>
                <Link to='/dashboard'>Dashboard</Link>
            </div>
        }
    </>

}
