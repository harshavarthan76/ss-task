import axios from 'axios';

export const updateUser = (data) => {
    return async (dispatch) => {
        const response = await axios.put(`/users/${data.id}`, {
            name: data.name,
            email: data.email,
            age: data.age
        });
        console.log(response.data);
        dispatch({
            type: 'UPDATE_USER',
            payload: data
        })
    }
}

export const deleteUser = (data) => {
    return async (dispatch) => {
        const response = await axios.delete(`/users/${data.id}`);
        console.log(response.data);
        dispatch({
            type: 'DELETE_USER',
            payload: data
        })
    }
}

export const getAllUsers = () => {
    return async (dispatch) => {
        const response = await axios.get('/users');
        dispatch({
            type: 'GET_ALL_USERS',
            payload: response.data
        })
    }
}

export const getAllProducts = () => {
    return async (dispatch) => {
        const response = await axios.get('/products');
        dispatch({
            type: 'GET_ALL_PRODUCTS',
            payload: response.data
        })
    }
}

export const showForm = (data) => {
    return {
        type: 'SHOW_FORM',
        payload: data
    }
}

export const setActiveUser = (data) => {
    return {
        type: 'SET_ACTIVE_USER',
        payload: data
    }
}

export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}
export const logout = (data) => {
    return {
        type: 'LOGOUT',
        payload: data
    }
}

export const submit = (data) => {
    return async (dispatch) => {
        const response = await axios.post(`/users/${data.id}/answer`, { answer: data.answer });
        console.log(response.data);
        dispatch({
            type: 'EDIT_ANSWER',
            payload: data.answer
        })
    }
}
export const editAnswer = (data) => {
    return {
        type: 'EDIT_ANSWER',
        payload: data
    }
}

export const getSubmission = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`/user/${id}/answer`);
        console.log(response.data);
        dispatch({
            type: 'EDIT_ANSWER',
            payload: response.data.answer
        })
    }
}

export const getSubmissions = () => {
    return async (dispatch) => {
        const response = await axios.get('/submissions');
        console.log(response.data);
        dispatch({
            type: 'GET_SUBMISSIONS',
            payload: response.data
        })
    }
}
