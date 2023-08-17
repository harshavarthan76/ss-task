import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { login } from '../../redux/actions';
import './Login.css'
import axios from 'axios';

export default function Login() {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        await validateUser();
    }

    async function validateUser() {
        try {
            const response = await axios.post('/user/login', {
                email,
                password
            })
            console.log("🚀 ~ file: Login.js:25 ~ validateUser ~ data:", response)
            if (response.status === 200) {
                const user = {
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    age: response.data.age,
                }
                console.log("🚀 ~ file: Login.js:33 ~ validateUser ~ user:", user)
                dispatch(login({
                    user,
                    isLoggedIn: true,
                    error: null
                }));
                history.push('/');
            }
        } catch (err) {
            alert('Invalid email or password');
            console.log(err);
        }
    }

    return (
        <>
            {!currentUser.isLoggedIn && <div className='login'>Login:
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type='email' onChange={(e) => setemail(e.target.value)} />
                    <label>Password:</label>
                    <input type='password' onChange={(e) => setpassword(e.target.value)} />
                    <button type='submit'>Login</button>
                </form>
            </div>}
            {/* {
                    history.push('/')
                    currentUser.error !== null && <p>{currentUser.error}</p>
                } */}
        </>

    )
}


// e.preventDefault();
// const response = await finduser(e.target[0].value);
// console.log(response);
// switch (response.data.statusCode) {
//     case 400 || 404:
//         currentUser.error = 'Invalid email or password';
//         break;
//     case 200:
//         currentUser.isLoggedIn = true;
//         currentUser.user = response.data.user;
//         break;
//     default:
//         currentUser.error = 'Something went wrong';
// }
// async function finduser(email) {
//     return await axios.get('/user', {
//         params: {
//             email
//         }
//     });

// }

