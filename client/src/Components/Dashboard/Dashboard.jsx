import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';

import './Dashboard.css'
import { submit, editAnswer, getSubmission, getSubmissions } from '../../redux/actions';

export default function Dashboard() {

    const user = useSelector(state => state.currentUser);
    const submissions = useSelector(state => state.submissions);
    const answer = user.user?.answer || null;
    const dispatch = useDispatch();
    const isUser = user.isLoggedIn && user.user.name !== 'admin' ? true : false;
    const isAdmin = user.isLoggedIn && user.user.name === 'admin' ? true : false;

    useEffect(() => {
        isUser && dispatch(getSubmission(user.user.id))
        isAdmin && dispatch(getSubmissions())  
  
    },[user.user])

    function handleSubmit(e) {
        console.log(e.target.previousSibling.value);
        dispatch(submit({id: user.user.id, answer: e.target.previousSibling.value}));
    }
    function handleEdit() {
        dispatch(editAnswer(null));
    }
    function displaySubmissions() {
        return <> {submissions.submissions.map((submission, index) => {
            return <p key={index}>Team {submission.answer} : {submission.count}</p>
        })}</>
    }
    return <>
            {isUser &&
                <div className='dashboard'>
                <div className='question'>
                    <h4>Q: Who will win today? </h4>
                    {answer === null &&
                        <div className='options'>
                            <select>
                                <option value='A'>Team A</option>
                                <option value='B'>Team B</option>
                                <option value='C'>Team C</option>
                                {/* <option value='None'>None</option> */}
                            </select>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    }
                    {answer !== null &&
                        <div className='answer'>
                            <p>You Answered : Team {answer}</p>
                            <button onClick={handleEdit}>Edit Answer</button>
                        </div>
                    }
                </div>
            </div>
            }
            {isAdmin &&
            <div>
            <p>Total Count: {submissions?.count || null}</p>
            {submissions?.submissions && displaySubmissions()}
            </div>
        }
         </>
}
