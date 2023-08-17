import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser, setActiveUser, showForm } from '../../redux/actions';
import './UserDetails.css'

export default function UserDetails() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.activeUser);
    const edit = useSelector(state => state.showForm);

    useEffect(() => {
        console.log('render');
    })

    function handleSubmit(e) {
        e.preventDefault();
        console.log(user);
        dispatch(updateUser(user));
    }
    function handlechange(e) {
        const { name, value } = e.target;
        dispatch(setActiveUser({ ...user, [name]: value }))
    }
    return (
        <div className='userdetails' >
            {edit &&
                <div>
                    <h3>User Details</h3>
                    <form onSubmit={handleSubmit}>
                        ID: <input type='text' name='id' readOnly value={user.id} /> <br />
                        Name: <input type='text' name='name' value={user.name} onChange={handlechange} /> <br />
                        Age: <input type='text' name='age' value={user.age} onChange={handlechange} /> <br />
                        <button onClick={() => { dispatch(showForm(false)) }}>Cancel</button>
                        <button type='submit'>Save</button>
                    </form>
                </div>

            }
        </div>
    )
}
